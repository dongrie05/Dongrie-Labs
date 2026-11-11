import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dongrielabs.com';

// Queremos aparecer em todo o lado: motores de pesquisa, pesquisa com IA (ChatGPT, Perplexity, Claude,
// Gemini, Copilot) e treino dos modelos, para que conheçam a Dongrie Labs pelo nome.
// Fica de fora só o que não é conteúdo: a API e a cópia técnica da página inicial.
const PRIVATE = ['/api/', '/home.html'];

const AI_AND_SEARCH_BOTS = [
  // pesquisa clássica
  'Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot', 'YandexBot',
  // OpenAI: pesquisa no ChatGPT, visitas pedidas por utilizadores, treino
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  // Perplexity
  'PerplexityBot', 'Perplexity-User',
  // Anthropic (Claude)
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  // Google Gemini / AI Overviews, Apple Intelligence
  'Google-Extended', 'Applebot-Extended',
  // outros assistentes e índices usados por modelos
  'meta-externalagent', 'Amazonbot', 'MistralAI-User', 'DuckAssistBot', 'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow: PRIVATE })),
      { userAgent: '*', allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
