export type ContactConfig = {
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
  resendApiKey: string;
  fromEmail: string;
  toEmail: string;
};

const DEFAULT_TO_EMAIL = 'goncalo.dongrie05@gmail.com';

function hasEmailAddress(value: string): boolean {
  return /@[^\s@]+\.[^\s@]+/.test(value);
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function missingContactEnv(env: Record<string, string | undefined> = process.env): string[] {
  const missing: string[] = [];
  const supabaseUrl = env.SUPABASE_URL?.trim() ?? '';
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? '';
  const resendApiKey = env.RESEND_API_KEY?.trim() ?? '';
  const fromEmail = env.CONTACT_FROM_EMAIL?.trim() ?? '';

  if (!isHttpUrl(supabaseUrl)) missing.push('SUPABASE_URL');
  if (!serviceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!resendApiKey) missing.push('RESEND_API_KEY');
  if (!hasEmailAddress(fromEmail)) missing.push('CONTACT_FROM_EMAIL');

  const toEmail = env.CONTACT_TO_EMAIL?.trim() ?? '';
  if (toEmail && !hasEmailAddress(toEmail)) missing.push('CONTACT_TO_EMAIL');

  return missing;
}

export function readContactConfig(env: Record<string, string | undefined> = process.env): ContactConfig | null {
  if (missingContactEnv(env).length > 0) return null;

  const toEmail = env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO_EMAIL;
  if (!hasEmailAddress(toEmail)) return null;

  return {
    supabaseUrl: env.SUPABASE_URL!.trim(),
    supabaseServiceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
    resendApiKey: env.RESEND_API_KEY!.trim(),
    fromEmail: env.CONTACT_FROM_EMAIL!.trim(),
    toEmail,
  };
}
