# Dongrie Labs — O que falta: Animações e Polish

Este ficheiro descreve o que ficou de fora da implementação atual e deve ser pedido ao Claude (ou feito manualmente): **animações** e **polish** de UX/UI.

---

## 1. Animações (Framer Motion)

Conforme o plano (secção 6 — UX e Design de Interação), implementar:

### Page transitions
- Fade + slide up subtil entre páginas com `AnimatePresence` (por exemplo no layout ou num wrapper de página).

### Scroll reveal
- Elementos a aparecer com **fade-up** ao entrar no viewport (`whileInView`).
- **Stagger** em grids: cards a aparecer em sequência com ~100ms de delay entre cada um.

### Hero
- Headline com animação **word-by-word** ou efeito **typewriter** subtil.

### Credibility bar / Stats
- **Count-up**: números a contar de 0 até ao valor final quando o bloco fica visível (o componente `StatsCounter` já existe; garantir que está ligado a `whileInView` e que a animação corre só quando visível).

### Navbar
- Backdrop blur que ganha intensidade ao scroll (`bg-navy-950/80 backdrop-blur-lg` ao passar um certo scroll offset).

### Micro-interactions (já parcialmente no CSS)
- Botões: `hover:scale-[1.02]` + transição de cor (~200ms).
- Cards: `hover:scale-[1.01]` + borda em gradient + sombra (confirmar que está aplicado nos cards de serviços, portfolio e “Why Dongrie Labs”).
- Links: sublinhado animado (width 0 → 100%).
- Toggle de idioma: transição suave entre estados.
- Inputs: borda em accent no focus, label flutuante se aplicável.

### Scroll effects
- **Parallax** subtil no background do hero (gradient mesh a mover a velocidade ligeiramente diferente).
- **Progress bar** no topo da página (linha fina na cor accent) — o componente `ScrollProgressBar` já existe; verificar se está visível e estilizado conforme o design.

---

## 2. Polish geral

- **Responsividade**: rever breakpoints (sm/md/lg/xl) em todas as secções; navbar mobile (hamburger + overlay) a funcionar bem; grids 3→2→1 colunas; toques com área mínima ~44px.
- **Acessibilidade**: contraste de cores, foco visível em links/botões, `aria-label` onde faltar, hierarquia de headings correta.
- **Performance**: imagens com `sizes` adequados (já parcialmente feitos); lazy loading onde fizer sentido.
- **Open Graph**: imagens OG por página (placeholder ou reais) e meta tags OG por rota.
- **`lang` dinâmico**: o root layout usa `lang="en"` fixo; idealmente o `<html lang={locale}>` deve vir do locale ativo (ex.: middleware a definir header e root layout a ler, ou solução equivalente com next-intl).

---

## 3. O que já está feito (referência)

- Estrutura de rotas `[locale]`, páginas Home, Services, Portfolio, Portfolio/[slug], About, Contact.
- Layout (Navbar, Footer, FloatingWhatsApp, ScrollProgressBar).
- Design system (cores, tipografia, cards, botões) em Tailwind e globals.css.
- i18n (en/pt) com next-intl e mensagens.
- Dados estáticos (projects, services), formulário de contacto com validação (React Hook Form + Zod) e API route `/api/contact`.
- SEO: metadata por página, sitemap, robots.txt, JSON-LD (Organization, WebSite, LocalBusiness).
- Breadcrumbs na página de projeto (portfolio/[slug]).
- Secção Gallery na página de projeto quando `project.gallery` existe.
- generateStaticParams com locale para portfolio/[slug].
- Homepage com generateMetadata por locale (metaTitle e description).

Quando pedires ao Claude para fazer “animações e polish”, podes referir este ficheiro e o plano `dongrie_labs_website_v1_38ce450c.plan.md` (secções 6 e 7) para alinhar o pedido.
