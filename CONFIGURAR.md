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

## 2. Formulário de contacto

O botão principal **grava o lead** (`POST /api/contact`) e envia-te um email. O WhatsApp fica como botão secundário: se a base de dados ou o email não estiverem configurados, o formulário mostra um erro e a pessoa pode abrir o WhatsApp com a mensagem já preenchida.

Variáveis (em `.env.local` e na Vercel):

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `SUPABASE_URL` | sim | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | sim | Chave `service_role` (só no servidor; nunca `NEXT_PUBLIC_`) |
| `RESEND_API_KEY` | sim | API key do Resend |
| `CONTACT_FROM_EMAIL` | sim | Remetente aceite pelo Resend |
| `CONTACT_TO_EMAIL` | não | Destino do aviso. Por omissão: `goncalo.dongrie05@gmail.com` |

### Base de dados

No SQL editor do Supabase, corre uma vez o ficheiro `supabase/contact_leads.sql`.

### Email (Resend)

1. Cria uma API key em [resend.com](https://resend.com) e cola em `RESEND_API_KEY`.
2. Enquanto o domínio não estiver verificado, usa `CONTACT_FROM_EMAIL="Dongrie Labs <onboarding@resend.dev>"`. Esse remetente só entrega no email da conta Resend — põe esse email em `CONTACT_TO_EMAIL` para testar.
3. Em produção: Resend → Domains → adiciona o domínio, publica os registos DNS (SPF e DKIM) e espera pelo estado verificado. Depois usa um endereço desse domínio, por exemplo `CONTACT_FROM_EMAIL="Dongrie Labs <hello@dongrielabs.com>"`.

---

## 3. Variável de ambiente em produção

Para produção (ex.: Vercel) convém ter:

| Variável | Uso | Exemplo |
|----------|-----|---------|
| `NEXT_PUBLIC_SITE_URL` | Sitemap, robots, meta tags | `https://dongrielabs.com` |
| `NEXT_PUBLIC_CALENDLY_URL` | Link "Agendar chamada" | O teu link do Calendly |
| `SUPABASE_URL` | Gravar leads do formulário | URL do projeto |
| `SUPABASE_SERVICE_ROLE_KEY` | Gravar leads do formulário | Chave `service_role` |
| `RESEND_API_KEY` | Email de aviso | API key do Resend |
| `CONTACT_FROM_EMAIL` | Remetente do aviso | `Dongrie Labs <hello@dongrielabs.com>` |
| `CONTACT_TO_EMAIL` | Destino do aviso (opcional) | `goncalo.dongrie05@gmail.com` |

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
| **Formulário** | Correr o SQL no Supabase, criar a API key no Resend, verificar o domínio e definir as variáveis da secção 2. |
| **URL do site** | Definir `NEXT_PUBLIC_SITE_URL` em produção. |
| **Apps no portfólio** | Enviar por app: link da loja + nome + uma frase; eu preencho o `projects.ts`. |

Quando tiveres o link do Calendly, cola em `NEXT_PUBLIC_CALENDLY_URL` e está feito. Para o portfólio, envia os links das apps com nome e frase para cada uma.
