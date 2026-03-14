# O que precisas de configurar para tudo funcionar

## 1. Calendly (Agendar chamada / Book a Call)

Os botões "Book a Call" e "Agendar Chamada" usam um link que defines **uma vez** numa variável de ambiente.

### Passo a passo

1. **Criar conta no Calendly**  
   - Vai a [calendly.com](https://calendly.com) e regista-te (há plano gratuito).

2. **Criar um “Event Type”**  
   - No dashboard: **Event Types** → **Create**.  
   - Escolhe o tipo (ex.: "Reunião de 30 min").  
   - Configura horários e duração e guarda.

3. **Copiar o link**  
   - No Calendly, abre o teu Event Type e copia o link de partilha (ex.: `https://calendly.com/teu-username/30min`).

4. **Definir no projeto**  
   - Na raiz do projeto cria o ficheiro `.env.local` (se ainda não existir).  
   - Adiciona uma linha com o link que copiaste:
     ```bash
     NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/teu-username/30min
     ```
   - Substitui pelo teu link real.  
   - Reinicia o servidor de desenvolvimento (`npm run dev`).

5. **Em produção (Vercel)**  
   - No projeto na Vercel: **Settings** → **Environment Variables**.  
   - Cria a variável `NEXT_PUBLIC_CALENDLY_URL` com o mesmo link.  
   - Faz um novo deploy.

Assim que esta variável estiver definida, **todos** os botões de agendar chamada (Hero, CTA e página Contacto) passam a usar este link automaticamente.

---

## 2. Formulário de contacto → WhatsApp

O formulário de contacto **não envia email**. Ao clicar em "Abrir no WhatsApp":

- Os dados (nome, email, tipo de projeto, orçamento, mensagem) são formatados num texto.
- Abre-se o WhatsApp (web ou app) com esse texto já preenchido para o teu número (**+351 927 699 882**).
- O visitante só tem de carregar em "Enviar" no WhatsApp.

Não precisas de configurar nada: não há API, nem email, nem variáveis de ambiente para o formulário.

---

## 3. Variável de ambiente em produção

Para produção (ex.: Vercel) convém ter:

| Variável | Uso | Exemplo |
|----------|-----|---------|
| `NEXT_PUBLIC_SITE_URL` | Sitemap, robots, meta tags | `https://dongrielabs.com` |
| `NEXT_PUBLIC_CALENDLY_URL` | Link "Agendar chamada" | O teu link do Calendly |

Cria `.env.local` em desenvolvimento e, na Vercel, **Settings** → **Environment Variables**.

---

## 4. Portfólio (apps)

Em `src/lib/data/projects.ts` há um projeto placeholder.

**Se me deres os links das apps (App Store / Google Play):**  
Consigo usar os links e a estrutura do projeto. Para cada app preciso também de:

- **Nome** da app (como queres que apareça no site).
- **Uma frase curta** (1–2 linhas) a descrever o que a app faz.

Não consigo ir à App Store buscar automaticamente nome, descrição ou imagens. Com link + nome + frase, preencho o portfólio (slug, tipo, tecnologias plausíveis, e o link na loja). As imagens (screenshots) podes adicionar depois em `public/images/portfolio/` e eu indico como ligar ao projeto.

**Formato ideal:**  
Para cada app, envia por exemplo:  
- Link: `https://apps.apple.com/...` (e/ou Google Play)  
- Nome: "Nome da App"  
- Frase: "Descrição em 1 linha."

---

## Resumo

| Item | O que fazer |
|------|-------------|
| **Calendly** | Conta no Calendly → criar Event Type → copiar link → colar em `NEXT_PUBLIC_CALENDLY_URL` no `.env.local` e na Vercel. |
| **Formulário** | Nada. Já abre o WhatsApp com a mensagem preenchida. |
| **URL do site** | Definir `NEXT_PUBLIC_SITE_URL` em produção. |
| **Apps no portfólio** | Enviar por app: link da loja + nome + uma frase; eu preencho o `projects.ts`. |

Quando tiveres o link do Calendly, cola em `NEXT_PUBLIC_CALENDLY_URL` e está feito. Para o portfólio, envia os links das apps com nome e frase para cada uma.
