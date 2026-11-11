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
    ];
  },
  async rewrites() {
    return { beforeFiles: [{ source: '/', destination: '/home.html' }] };
  },
};

module.exports = withNextIntl(nextConfig);
