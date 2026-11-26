import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dongrielabs.com';

// Só páginas que respondem 200 e têm canonical para si próprias.
// O site antigo em Next.js (/pt, /en) redireciona todo para as páginas novas e não entra.
const HOME_UPDATED = '2026-11-25';
const CONTENT_UPDATED = '2026-11-17';
const LEGAL_UPDATED = '2026-11-25';

const CONTENT = ['/condominios', '/contabilidade', '/apps', '/artigos'];
const ARTICLES = ['/artigos/organizar-ocorrencias-condominio', '/artigos/ia-administracao-condominios', '/artigos/documentos-em-falta-contabilidade'];
const LEGAL = ['/privacidade', '/termos', '/cookies', '/protecao-de-dados'];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date(HOME_UPDATED), changeFrequency: 'weekly', priority: 1 },
    ...CONTENT.map((path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date(CONTENT_UPDATED), changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...ARTICLES.map((path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date('2026-11-13'), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...LEGAL.map((path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date(LEGAL_UPDATED), changeFrequency: 'yearly' as const, priority: 0.3 })),
  ];
}
