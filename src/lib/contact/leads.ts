import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import type { ContactConfig } from './config';
import type { Budget, Locale, ProjectType } from './schema';

export type LeadRecord = {
  name: string;
  email: string;
  projectType: ProjectType;
  budget: Budget | null;
  message: string;
  source: string;
  locale: Locale | null;
};

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  mobile: 'App móvel',
  ai: 'Integração de IA',
  automation: 'Automação empresarial',
  mvp: 'MVP',
  other: 'Outro',
};

const BUDGET_LABELS: Record<Budget, string> = {
  under2k: 'Abaixo de €2k',
  '2k5k': '€2k – €5k',
  '5k10k': '€5k – €10k',
  over10k: 'Acima de €10k',
};

function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').slice(0, 120);
}

export async function insertLead(config: ContactConfig, lead: LeadRecord): Promise<void> {
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from('contact_leads').insert({
    name: lead.name,
    email: lead.email,
    project_type: lead.projectType,
    budget: lead.budget,
    message: lead.message,
    source: lead.source,
    locale: lead.locale,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function notifyOwner(config: ContactConfig, lead: LeadRecord): Promise<void> {
  const resend = new Resend(config.resendApiKey);
  const budget = lead.budget ? BUDGET_LABELS[lead.budget] : '—';
  const { error } = await resend.emails.send({
    from: config.fromEmail,
    to: config.toEmail,
    replyTo: lead.email,
    subject: `Novo contacto: ${oneLine(lead.name)} (${lead.source})`,
    text: [
      'Novo contacto pelo site',
      '',
      `Nome: ${lead.name}`,
      `Email: ${lead.email}`,
      `Tipo de projeto: ${PROJECT_TYPE_LABELS[lead.projectType]}`,
      `Orçamento: ${budget}`,
      `Origem: ${lead.source}`,
      `Idioma: ${lead.locale ?? '—'}`,
      '',
      lead.message,
    ].join('\n'),
  });

  if (error) {
    throw new Error(error.message);
  }
}
