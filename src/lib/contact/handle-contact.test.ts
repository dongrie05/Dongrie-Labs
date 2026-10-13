import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { missingContactEnv, readContactConfig, type ContactConfig } from './config';
import { handleContact } from './handle-contact';
import type { LeadRecord } from './leads';
import { createRateLimiter } from './rate-limit';

const config: ContactConfig = {
  supabaseUrl: 'https://example.supabase.co',
  supabaseServiceRoleKey: 'service-role',
  resendApiKey: 're_test',
  fromEmail: 'Dongrie Labs <onboarding@resend.dev>',
  toEmail: 'goncalo.dongrie05@gmail.com',
};

const validBody = {
  name: 'Ana Silva',
  email: 'Ana@Example.com',
  projectType: 'mvp',
  budget: '2k5k',
  message: 'Quero um MVP para o meu negócio local.',
  source: 'portfolio/linea',
  company_url: '',
  locale: 'pt',
};

function harness(overrides: Partial<Parameters<typeof handleContact>[1]> = {}) {
  const inserted: LeadRecord[] = [];
  const notified: LeadRecord[] = [];
  const deps = {
    config,
    clientIp: '203.0.113.8',
    rateLimit: createRateLimiter({ limit: 5, windowMs: 60_000 }),
    insertLead: async (lead: LeadRecord) => {
      inserted.push(lead);
    },
    notifyOwner: async (lead: LeadRecord) => {
      notified.push(lead);
    },
    ...overrides,
  };
  return { deps, inserted, notified };
}

describe('readContactConfig', () => {
  const complete = {
    SUPABASE_URL: 'https://abc.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'service-role',
    RESEND_API_KEY: 're_test',
    CONTACT_FROM_EMAIL: 'Dongrie Labs <onboarding@resend.dev>',
  };

  it('defaults the recipient when CONTACT_TO_EMAIL is unset', () => {
    assert.deepEqual(missingContactEnv(complete), []);
    assert.equal(readContactConfig(complete)?.toEmail, 'goncalo.dongrie05@gmail.com');
  });

  it('reports each missing required variable', () => {
    assert.deepEqual(missingContactEnv({}), [
      'SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY',
      'RESEND_API_KEY',
      'CONTACT_FROM_EMAIL',
    ]);
    assert.equal(readContactConfig({}), null);
  });
});

describe('handleContact', () => {
  it('persists a valid lead and notifies the owner', async () => {
    const { deps, inserted, notified } = harness();
    const response = await handleContact(validBody, deps);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    assert.equal(inserted.length, 1);
    assert.equal(inserted[0].email, 'ana@example.com');
    assert.equal(inserted[0].source, 'portfolio/linea');
    assert.equal(inserted[0].budget, '2k5k');
    assert.equal(inserted[0].locale, 'pt');
    assert.equal(notified.length, 1);
  });

  it('stores an empty budget as null and falls back to the contact source', async () => {
    const { deps, inserted } = harness();
    const response = await handleContact(
      { ...validBody, budget: '', source: '../etc/passwd', locale: 'fr' },
      deps
    );
    assert.equal(response.status, 200);
    assert.equal(inserted[0].budget, null);
    assert.equal(inserted[0].source, 'contact');
    assert.equal(inserted[0].locale, null);
  });

  it('returns 503 and writes nothing when env is missing', async () => {
    const { deps, inserted, notified } = harness({ config: null });
    const response = await handleContact(validBody, deps);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: 'not_configured' });
    assert.equal(inserted.length, 0);
    assert.equal(notified.length, 0);
  });

  it('rejects invalid payloads without saving them', async () => {
    const { deps, inserted } = harness();
    const response = await handleContact({ ...validBody, email: 'not-an-email' }, deps);
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: 'validation_error' });
    assert.equal(inserted.length, 0);
  });

  it('accepts a filled honeypot without saving', async () => {
    const { deps, inserted, notified } = harness({ config: null });
    const response = await handleContact({ ...validBody, company_url: 'https://spam.test' }, deps);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    assert.equal(inserted.length, 0);
    assert.equal(notified.length, 0);
  });

  it('rate limits repeated submissions', async () => {
    const { deps } = harness({
      rateLimit: createRateLimiter({ limit: 2, windowMs: 60_000 }),
    });
    assert.equal((await handleContact(validBody, deps)).status, 200);
    assert.equal((await handleContact(validBody, deps)).status, 200);
    const blocked = await handleContact(validBody, deps);
    assert.equal(blocked.status, 429);
    assert.equal(blocked.headers.get('Retry-After') !== null, true);
    assert.deepEqual(await blocked.json(), { error: 'rate_limited' });
  });

  it('returns 500 when persistence fails and does not send email', async () => {
    const { deps, notified } = harness({
      insertLead: async () => {
        throw new Error('db down');
      },
    });
    const response = await handleContact(validBody, deps);
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { error: 'persist_failed' });
    assert.equal(notified.length, 0);
  });

  it('returns 502 when the lead was saved but email failed', async () => {
    const { deps, inserted } = harness({
      notifyOwner: async () => {
        throw new Error('resend down');
      },
    });
    const response = await handleContact(validBody, deps);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: 'notify_failed' });
    assert.equal(inserted.length, 1);
  });
});
