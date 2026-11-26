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
      // a política antiga em Next.js deu lugar às páginas legais estáticas
      { source: '/:locale(pt|en)/privacy', destination: '/privacidade', permanent: true },
      // os 3 artigos antigos do estúdio eram sobre apps: levam à página de Apps
      { source: '/:locale(pt|en)/recursos/:slug', destination: '/apps', permanent: true },
      // o resto do site antigo em Next.js (contacto incluído) leva à página inicial, que tem o contacto.
      // Assim o Google deixa de encontrar páginas antigas cheias de links que redirecionam.
      { source: '/:locale(pt|en)/:path*', destination: '/', permanent: true },
      { source: '/contact', destination: '/', permanent: true },
      // a página /websites saiu a 15 nov; a oferta vive no Diagnóstico Express
      { source: '/websites', destination: 'https://diagnostico.dongrielabs.com/', permanent: true },
      // cópias técnicas em .html apontam para o endereço limpo
      { source: '/:page(condominios|contabilidade|apps|artigos|privacidade|termos|cookies|protecao-de-dados).html', destination: '/:page', permanent: true },
      { source: '/artigos/:slug.html', destination: '/artigos/:slug', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/home.html' },
        { source: '/:page(condominios|contabilidade|apps|artigos|privacidade|termos|cookies|protecao-de-dados)', destination: '/:page.html' },
        { source: '/artigos/:slug', destination: '/artigos/:slug.html' },
      ],
    };
  },
};

module.exports = withNextIntl(nextConfig);
