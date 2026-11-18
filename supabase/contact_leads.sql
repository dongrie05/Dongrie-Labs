-- Contact leads captured by POST /api/contact.
-- Run once in the Supabase SQL editor (Dashboard → SQL → New query).
-- The Next.js server writes with the service_role key, which bypasses RLS.
-- The anon and authenticated keys cannot read or write this table.

create table public.contact_leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  project_type text not null,
  budget text,
  message text not null,
  source text not null default 'contact',
  locale text,
  constraint contact_leads_name_len check (char_length(name) between 2 and 120),
  constraint contact_leads_email_len check (char_length(email) between 3 and 254),
  constraint contact_leads_email_shape check (position('@' in email) > 1),
  constraint contact_leads_project_type_check check (
    project_type in ('mobile', 'ai', 'automation', 'mvp', 'other')
  ),
  constraint contact_leads_budget_check check (
    budget is null or budget in ('under2k', '2k5k', '5k10k', 'over10k')
  ),
  constraint contact_leads_message_len check (char_length(message) between 10 and 5000),
  constraint contact_leads_source_len check (char_length(source) between 1 and 80),
  constraint contact_leads_locale_check check (locale is null or locale in ('en', 'pt'))
);

create index contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

create index contact_leads_source_created_at_idx
  on public.contact_leads (source, created_at desc);

alter table public.contact_leads enable row level security;

revoke all on table public.contact_leads from public;
revoke all on table public.contact_leads from anon, authenticated;

-- service_role bypasses RLS. Re-assert the grants used by the server client.
grant select, insert on table public.contact_leads to service_role;
revoke all on sequence public.contact_leads_id_seq from public, anon, authenticated;
grant usage, select on sequence public.contact_leads_id_seq to service_role;
