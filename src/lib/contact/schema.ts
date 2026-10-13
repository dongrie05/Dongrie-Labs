import { z } from 'zod';

export const PROJECT_TYPES = ['mobile', 'ai', 'automation', 'mvp', 'other'] as const;
export const BUDGETS = ['under2k', '2k5k', '5k10k', 'over10k'] as const;
export const LOCALES = ['en', 'pt'] as const;

const SOURCE_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9/_-]{0,79}$/;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type Budget = (typeof BUDGETS)[number];
export type Locale = (typeof LOCALES)[number];

export type ContactFieldMessages = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

const defaultMessages: ContactFieldMessages = {
  name: 'Name must be at least 2 characters',
  email: 'Invalid email',
  projectType: 'Select a project type',
  message: 'Message must be at least 10 characters',
};

export function isProjectType(value: string): value is ProjectType {
  return (PROJECT_TYPES as readonly string[]).includes(value);
}

export function isBudget(value: string): value is Budget {
  return (BUDGETS as readonly string[]).includes(value);
}

export function sanitizeSource(value: unknown): string {
  if (typeof value !== 'string') return 'contact';
  const trimmed = value.trim();
  return SOURCE_PATTERN.test(trimmed) ? trimmed : 'contact';
}

export function createContactFormSchema(messages?: Partial<ContactFieldMessages>) {
  const m = { ...defaultMessages, ...messages };

  return z.object({
    name: z.string().trim().min(2, m.name).max(120, m.name),
    email: z.string().trim().min(1, m.email).max(254, m.email).email(m.email),
    projectType: z
      .string()
      .trim()
      .min(1, m.projectType)
      .refine(isProjectType, m.projectType),
    budget: z
      .string()
      .trim()
      .refine((value) => value === '' || isBudget(value)),
    message: z.string().trim().min(10, m.message).max(5000, m.message),
    source: z.string().trim().max(80).optional().default('contact'),
    company_url: z.string().max(500).optional().default(''),
    locale: z.string().optional(),
  });
}

export const contactFormSchema = createContactFormSchema();

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormParsed = z.output<typeof contactFormSchema>;
