import { contactDepsFromEnv, handleContact } from '@/lib/contact/handle-contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  return handleContact(body, contactDepsFromEnv(request));
}
