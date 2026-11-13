import { MetadataRoute } from 'next';
import { recursosArticles } from '@/lib/data/recursos';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dongrielabs.com';

const locales = ['en', 'pt'] as const;
// a página inicial é a mesma para os dois idiomas (/), por isso não entra por idioma
// as páginas do estúdio antigo redirecionam para as novas e já não entram
const staticPaths = ['/privacy', '/contact'];
const CONTENT = ['/condominios', '/contabilidade', '/artigos', '/artigos/organizar-ocorrencias-condominio', '/artigos/ia-administracao-condominios', '/artigos/documentos-em-falta-contabilidade'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/llms.txt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];
  for (const path of CONTENT) {
    entries.push({ url: `${BASE_URL}${path}`, lastModified: new Date('2026-11-13'), changeFrequency: 'monthly', priority: path.startsWith('/artigos/') ? 0.7 : 0.9 });
  }

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
    for (const article of recursosArticles) {
      entries.push({
        url: `${BASE_URL}/${locale}/recursos/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
