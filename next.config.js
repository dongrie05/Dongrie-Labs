const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // página inicial = site novo da AI Layer (public/home.html); as antigas páginas iniciais por idioma levam lá
  async redirects() {
    return [
      { source: '/pt', destination: '/', permanent: true },
      { source: '/en', destination: '/', permanent: true },
      // páginas do estúdio antigo: o negócio agora é a AI Layer, por isso levam às páginas novas
      { source: '/:locale(pt|en)/:page(services|products|pricing|about|portfolio)', destination: '/', permanent: true },
      { source: '/:locale(pt|en)/portfolio/:slug', destination: '/', permanent: true },
      { source: '/:locale(pt|en)/recursos', destination: '/artigos', permanent: true },
      // cópias técnicas em .html apontam para o endereço limpo
      { source: '/:page(condominios|contabilidade|artigos).html', destination: '/:page', permanent: true },
      { source: '/artigos/:slug.html', destination: '/artigos/:slug', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/home.html' },
        { source: '/:page(condominios|contabilidade|artigos)', destination: '/:page.html' },
        { source: '/artigos/:slug', destination: '/artigos/:slug.html' },
      ],
    };
  },
};

module.exports = withNextIntl(nextConfig);
