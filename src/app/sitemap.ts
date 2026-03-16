import { MetadataRoute } from 'next';
import { projects } from '@/lib/data/projects';
import { recursosArticles } from '@/lib/data/recursos';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dongrielabs.com';

const locales = ['en', 'pt'] as const;
const staticPaths = ['', '/services', '/portfolio', '/products', '/about', '/pricing', '/recursos', '/privacy', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path || ''}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${BASE_URL}/${locale}/portfolio/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
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
