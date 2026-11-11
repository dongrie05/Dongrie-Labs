import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // a página inicial (/) é o site novo, estático (public/home.html): o next-intl só trata das páginas com idioma
  matcher: ['/(pt|en)/:path*'],
};
