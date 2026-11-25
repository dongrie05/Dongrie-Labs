import { missingContactEnv, readContactConfig, type ContactConfig } from './config';
import { insertLead, notifyOwner, type LeadRecord } from './leads';
import { limitContactAttempts } from './rate-limit';
import {
  contactFormSchema,
  isBudget,
  isProjectType,
  sanitizeSource,
  type Locale,
} from './schema';

export type ContactHandlerDeps = {
  config: ContactConfig | null;
  clientIp: string;
  rateLimit?: (key: string) => { ok: boolean; retryAfterSeconds: number };
  insertLead?: (lead: LeadRecord) => Promise<void>;
  notifyOwner?: (lead: LeadRecord) => Promise<void>;
};

function json(body: unknown, status = 200, headers?: Record<string, string>): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}

export function isHoneypotTripped(body: unknown): boolean {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false;
  const value = (body as Record<string, unknown>).company_url;
  if (typeof value === 'string') return value.trim().length > 0;
  return value != null;
}

function toLead(data: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  source: string;
  locale?: string;
}): LeadRecord | null {
  if (!isProjectType(data.projectType)) return null;
  if (data.budget !== '' && !isBudget(data.budget)) return null;

  const locale: Locale | null = data.locale === 'en' || data.locale === 'pt' ? data.locale : null;

  return {
    name: data.name,
    email: data.email.toLowerCase(),
    projectType: data.projectType,
    budget: data.budget === '' ? null : data.budget,
    message: data.message,
    source: sanitizeSource(data.source),
    locale,
  };
}

export function clientIpFromRequest(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const ip = forwarded.split(',')[0]?.trim();
    if (ip) return ip;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  const nextIp = (request as Request & { ip?: string }).ip;
  if (nextIp) return nextIp;
  return 'unknown';
}

export async function handleContact(body: unknown, deps: ContactHandlerDeps): Promise<Response> {
  const rateLimit = deps.rateLimit ?? limitContactAttempts;
  const limit = rateLimit(deps.clientIp || 'unknown');
  if (!limit.ok) {
    return json(
      { error: 'rate_limited' },
      429,
      { 'Retry-After': String(limit.retryAfterSeconds) }
    );
  }

  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'validation_error' }, 400);
  }

  if (isHoneypotTripped(body)) {
    return json({ success: true });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: 'validation_error' }, 400);
  }

  const lead = toLead(parsed.data);
  if (!lead) {
    return json({ error: 'validation_error' }, 400);
  }

  if (!deps.config) {
    console.error('[contact] Not configured. Missing or invalid:', missingContactEnv().join(', '));
    return json({ error: 'not_configured' }, 503);
  }

  const save = deps.insertLead ?? insertLead.bind(null, deps.config);
  const notify = deps.notifyOwner ?? notifyOwner.bind(null, deps.config);

  try {
    await save(lead);
  } catch (error) {
    console.error('[contact] Failed to persist lead', error instanceof Error ? error.message : 'unknown');
    return json({ error: 'persist_failed' }, 500);
  }

  try {
    await notify(lead);
  } catch (error) {
    console.error(
      '[contact] Lead was saved but the email notification failed',
      error instanceof Error ? error.message : 'unknown'
    );
    return json({ error: 'notify_failed' }, 502);
  }

  return json({ success: true });
}

export function contactDepsFromEnv(request: Request): ContactHandlerDeps {
  return {
    config: readContactConfig(),
    clientIp: clientIpFromRequest(request),
  };
}
