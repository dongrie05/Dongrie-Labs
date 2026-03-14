export interface RecursosSource {
  labelEn: string;
  labelPt: string;
  url: string;
}

export interface RecursosArticle {
  slug: string;
  date: string;
  titleEn: string;
  titlePt: string;
  excerptEn: string;
  excerptPt: string;
  contentEn: string[];
  contentPt: string[];
  sources?: RecursosSource[];
}

export const recursosArticles: RecursosArticle[] = [
  {
    slug: 'custo-app-portugal',
    date: '2025-02-15',
    titleEn: 'How much does an app cost in Portugal?',
    titlePt: 'Quanto custa fazer uma app em Portugal?',
    excerptEn: 'Realistic price ranges for mobile and web apps in Portugal, and what to expect from a solo developer or small studio.',
    excerptPt: 'Faixas de preço realistas para apps móveis e web em Portugal, e o que esperar de um desenvolvedor solo ou estúdio pequeno.',
    contentEn: [
      'Building an app in Portugal can cost anywhere from a few thousand euros to tens of thousands, depending on scope, platform, and who you hire. Solo developers and small studios typically charge €2k–€10k for a well-scoped MVP or first version.',
      'Mobile apps (iOS and Android) usually sit in the €3k–€8k range when built with a single codebase (e.g. React Native or Flutter). That includes core features, one round of revisions, and delivery in a few weeks. Adding complex integrations, real-time features, or custom design can push the upper end higher.',
      'Web apps and dashboards often start lower (€2k–€5k) because they don’t require store submissions or device-specific testing. AI integrations and automation projects are similarly in the €2k–€6k range for a first version.',
      'The best way to get a number you can trust is to describe your idea clearly and ask for a fixed quote after a short discovery call. That way you avoid surprises and can plan your budget.',
    ],
    contentPt: [
      'Fazer uma app em Portugal pode custar desde alguns milhares de euros até dezenas de milhares, consoante o âmbito, a plataforma e com quem trabalhas. Desenvolvedores solos e estúdios pequenos costumam cobrar €2k–€10k por um MVP ou primeira versão bem definidos.',
      'Apps móveis (iOS e Android) ficam normalmente na faixa dos €3k–€8k quando feitas com um único código (ex.: React Native ou Flutter). Isso inclui funcionalidades principais, uma ronda de revisões e entrega em algumas semanas. Integrações complexas, funcionalidades em tempo real ou design à medida podem subir o valor.',
      'Apps web e dashboards costumam começar mais baixo (€2k–€5k) porque não exigem submissão às lojas nem testes em tantos dispositivos. Integrações de IA e automação ficam na mesma ordem (€2k–€6k) para uma primeira versão.',
      'A melhor forma de ter um número em que podes confiar é descrever a ideia com clareza e pedir um orçamento fixo após uma breve chamada de descoberta. Assim evitas surpresas e podes planear o orçamento.',
    ],
    sources: [
      { labelEn: 'React Native – cross-platform apps', labelPt: 'React Native – apps multiplataforma', url: 'https://reactnative.dev/' },
      { labelEn: 'Flutter – Google’s UI toolkit', labelPt: 'Flutter – toolkit de UI da Google', url: 'https://flutter.dev/' },
    ],
  },
  {
    slug: 'quando-usar-ia-no-produto',
    date: '2025-02-01',
    titleEn: 'When does it make sense to use AI in your product?',
    titlePt: 'Quando faz sentido usar IA no teu produto?',
    excerptEn: 'A practical guide to choosing where AI adds value—and where it doesn’t—in your app or workflow.',
    excerptPt: 'Um guia prático para decidir onde a IA acrescenta valor—e onde não acrescenta—no teu app ou fluxo de trabalho.',
    contentEn: [
      'AI is powerful, but it’s not the answer to every product question. It makes the most sense when you have a clear problem that benefits from language understanding, pattern recognition, or automation—and when you’re ready to iterate based on real usage.',
      'Good candidates: chatbots and support flows, document or text classification, personalised recommendations, and repetitive tasks that can be guided by rules plus a model (e.g. drafting replies, summarising content). These can often be delivered in 2–4 weeks with APIs like OpenAI or Claude.',
      'Weaker candidates: replacing simple forms or buttons with “AI” for the sake of it, or building mission-critical logic that must be 100% deterministic. In those cases, classic logic and good UX usually win.',
      'Start by defining the outcome you want (e.g. “users get an answer in under 30 seconds”) and then see if AI is the most reliable and maintainable way to get there. If yes, scope a small integration and test it with real users.',
    ],
    contentPt: [
      'A IA é poderosa, mas não é a resposta para todas as perguntas de produto. Faz mais sentido quando tens um problema claro que beneficia de compreensão de linguagem, reconhecimento de padrões ou automação—e quando estás pronto para iterar com base no uso real.',
      'Bons candidatos: chatbots e fluxos de suporte, classificação de documentos ou texto, recomendações personalizadas e tarefas repetitivas que possam ser guiadas por regras e um modelo (ex.: esboçar respostas, resumir conteúdo). Muitas vezes podem ser entregues em 2–4 semanas com APIs como OpenAI ou Claude.',
      'Candidatos mais fracos: substituir formulários ou botões simples por “IA” por si só, ou construir lógica crítica que precise de ser 100% determinística. Nesses casos, lógica clássica e bom UX costumam ganhar.',
      'Começa por definir o resultado que queres (ex.: “os utilizadores obtêm uma resposta em menos de 30 segundos”) e depois vê se a IA é a forma mais fiável e fácil de manter de lá chegar. Se sim, define uma integração pequena e testa com utilizadores reais.',
    ],
    sources: [
      { labelEn: 'OpenAI API documentation', labelPt: 'Documentação da API OpenAI', url: 'https://platform.openai.com/docs' },
      { labelEn: 'Anthropic Claude – model overview', labelPt: 'Anthropic Claude – visão geral do modelo', url: 'https://www.anthropic.com/claude' },
    ],
  },
  {
    slug: 'mvp-em-semanas',
    date: '2025-01-20',
    titleEn: 'From idea to MVP in weeks, not months',
    titlePt: 'Da ideia ao MVP em semanas, não meses',
    excerptEn: 'How to scope and deliver a first version of your product quickly, without blowing the budget.',
    excerptPt: 'Como definir âmbito e entregar uma primeira versão do teu produto rapidamente, sem estourar o orçamento.',
    contentEn: [
      'An MVP doesn’t mean “half-built”. It means the smallest set of features that let real users do the one thing that matters most—and that give you feedback to decide what to build next.',
      'To get there in weeks: (1) Pick one primary user and one primary action (e.g. “A restaurant owner adds today’s menu in under 2 minutes”). (2) Cut everything that doesn’t directly support that. (3) Use proven tech (React Native, standard backends, existing APIs) so you’re not experimenting and building at the same time. (4) Agree on a fixed scope and a short timeline (e.g. 3–4 weeks) with your developer.',
      'Solo developers and small studios are often faster than agencies for MVPs because there’s no handover chain and decisions are made in one place. You get a working build, you put it in front of users, and you iterate.',
      'If your budget is tight, say so upfront. Many projects can be split into a “phase 1” that fits your budget and a “phase 2” once you have traction.',
    ],
    contentPt: [
      'Um MVP não significa “meio construído”. Significa o conjunto mínimo de funcionalidades que permite a utilizadores reais fazer aquela coisa que mais importa—e que te dá feedback para decidir o que construir a seguir.',
      'Para lá chegar em semanas: (1) Escolhe um utilizador principal e uma ação principal (ex.: “Um dono de restaurante adiciona o menu do dia em menos de 2 minutos”). (2) Corta tudo o que não suporta isso diretamente. (3) Usa tecnologia comprovada (React Native, backends standard, APIs existentes) para não estares a experimentar e a construir ao mesmo tempo. (4) Acorda um âmbito fixo e um prazo curto (ex.: 3–4 semanas) com o teu desenvolvedor.',
      'Desenvolvedores solos e estúdios pequenos costumam ser mais rápidos que agências em MVPs porque não há cadeia de passagem de projeto e as decisões são tomadas num só sítio. Ficas com uma build a funcionar, mostras a utilizadores e iteras.',
      'Se o orçamento for apertado, diz isso à partida. Muitos projetos podem ser divididos numa “fase 1” que se encaixa no orçamento e numa “fase 2” quando tiveres tração.',
    ],
    sources: [
      { labelEn: 'Eric Ries – The Lean Startup (MVP concept)', labelPt: 'Eric Ries – The Lean Startup (conceito de MVP)', url: 'https://www.theleanstartup.com/' },
      { labelEn: 'React Native – get started', labelPt: 'React Native – começar', url: 'https://reactnative.dev/docs/getting-started' },
    ],
  },
];

export function getArticleBySlug(slug: string): RecursosArticle | undefined {
  return recursosArticles.find((a) => a.slug === slug);
}
