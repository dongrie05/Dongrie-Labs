import type { Project } from '@/types';

const LINEA_URL = process.env.NEXT_PUBLIC_LINEA_URL || 'https://uselinea.com';

export const projects: Project[] = [
  {
    slug: 'linea',
    name: 'Linea',
    namePt: 'Linea',
    type: 'SaaS',
    typePt: 'SaaS',
    category: 'ai',
    platform: ['web'],
    techStack: ['AI', 'Voice', 'Twilio'],
    description:
      'AI phone answering SaaS we\'re building at Dongrie Labs. Currently in development—we\'re closing our first clients in Portugal. Never miss a call, 24/7, in Portuguese or English.',
    descriptionPt:
      'SaaS de atendimento telefónico por IA que estamos a construir na Dongrie Labs. Em desenvolvimento—estamos a fechar os primeiros clientes em Portugal. Nunca perdas uma chamada, 24/7, em português ou inglês.',
    overview:
      'Linea is our own product in development: an AI that answers your business phone, qualifies leads, and books appointments. We\'re currently onboarding our first clients—SMEs, clinics, and local businesses who want to stop losing calls. If that\'s you, get in touch.',
    overviewPt:
      'A Linea é o nosso próprio produto em desenvolvimento: uma IA que atende o teu telefone profissional, qualifica leads e marca consultas. Estamos a integrar os primeiros clientes—PMEs, clínicas e negócios locais que querem deixar de perder chamadas. Se és um deles, fala connosco.',
    features: [
      'AI answers calls 24/7 in Portuguese or English',
      'Lead qualification and appointment booking',
      'Product in development—closing first clients now',
      'Setup in minutes, no code',
    ],
    featuresPt: [
      'IA atende chamadas 24/7 em português ou inglês',
      'Qualificação de leads e marcação de consultas',
      'Produto em desenvolvimento—a fechar os primeiros clientes',
      'Configuração em minutos, sem código',
    ],
    launchDate: '2025',
    highlighted: true,
    productUrl: LINEA_URL,
  },
  {
    slug: 'smartmeal',
    name: 'SmartMeal',
    namePt: 'SmartMeal',
    type: 'Food & Drink',
    typePt: 'Comida e Bebida',
    category: 'mobile',
    platform: ['ios'],
    techStack: ['Swift', 'iOS'],
    description:
      'Meal planning assistant: weekly menus, automatic shopping lists from recipes, custom recipes with step-by-step instructions, and premium subscription with personalised plans and calorie stats.',
    descriptionPt:
      'Assistente de planeamento de refeições: menus semanais, lista de compras automática a partir das receitas, receitas personalizadas e subscrição premium com planos personalizados.',
    overview:
      'SmartMeal helps users plan their week, generate shopping lists from selected recipes, and cook with clear instructions. Premium adds allergy filters, calorie statistics, and early access to new recipes.',
    overviewPt:
      'SmartMeal ajuda a planear a semana, gerar listas de compras a partir das receitas e cozinhar com instruções claras. A subscrição premium inclui filtros de alergias, estatísticas calóricas e acesso antecipado a novas receitas.',
    features: [
      'Weekly meal planning & food calendar',
      'Automatic shopping list from recipes',
      'Custom recipes with step-by-step instructions',
      'Premium subscription with personalised plans',
      'Widget & Siri support (iOS 26)',
    ],
    featuresPt: [
      'Planeamento semanal e calendário alimentar',
      'Lista de compras automática',
      'Receitas personalizadas passo a passo',
      'Subscrição premium com planos personalizados',
      'Widget e Siri (iOS 26)',
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/smartmeal/id6744840322',
    launchDate: '2025',
    highlighted: true,
    image: '/images/portfolio/smartmeal.png',
  },
  {
    slug: 'medclarityai',
    name: 'MedClarityAI',
    namePt: 'MedClarityAI',
    type: 'Medical',
    typePt: 'Medicina',
    category: 'mobile',
    platform: ['ios'],
    techStack: ['Flutter', 'iOS', 'AI'],
    description:
      'Understand medication information quickly: take a photo of the leaflet or type the drug name and get a clear summary with indications, how to take it, common side effects, and important precautions.',
    descriptionPt:
      'Compreender informações de medicamentos de forma rápida: fotografia da bula ou nome do medicamento e recebe um resumo com indicações, como tomar, efeitos secundários e cuidados.',
    overview:
      'MedClarity AI uses AI to extract and summarise leaflet text from a photo or search. It includes reminders, calendar integration, and a free tier (2 analyses) plus premium for unlimited use.',
    overviewPt:
      'MedClarity AI usa IA para extrair e resumir o texto da bula por foto ou pesquisa. Inclui lembretes, calendário e plano gratuito (2 análises) mais premium para uso ilimitado.',
    features: [
      'Photo analysis of medication leaflets',
      'Search by drug name',
      'Clear summaries: indications, dosage, side effects',
      'Reminders & calendar integration',
      'Free and premium plans',
    ],
    featuresPt: [
      'Análise por foto da bula',
      'Busca por nome do medicamento',
      'Resumos claros: indicações, dose, efeitos secundários',
      'Lembretes e calendário',
      'Planos gratuito e premium',
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/medclarityai/id6754197255',
    launchDate: '2025',
    highlighted: true,
    image: '/images/portfolio/medclarityai.png',
  },
  {
    slug: 'verbalis',
    name: 'Verbalis',
    namePt: 'Verbalis',
    type: 'Word Games',
    typePt: 'Jogos de Palavras',
    category: 'mobile',
    platform: ['ios'],
    techStack: ['Flutter', 'iOS'],
    description:
      'Word games in Portuguese and English: 300 levels of word search (5×5 to 10×10) and 500 levels of word connections. Progressive difficulty, daily challenges, hints system, and custom themes.',
    descriptionPt:
      'Jogos de palavras em português e inglês: 300 níveis de sopa de letras e 500 níveis de conexões. Dificuldade progressiva, desafio diário, sistema de dicas e temas personalizáveis.',
    overview:
      'Verbalis offers two main games—word search and word connections—with hundreds of levels, bilingual support (PT/EN/ES), a daily challenge, and an intelligent hint system. Works offline.',
    overviewPt:
      'Verbalis inclui sopa de letras e conexões de palavras com centenas de níveis, suporte bilingue (PT/EN/ES), desafio diário e sistema de dicas. Funciona offline.',
    features: [
      'Word search: 300 levels, multiple grid sizes',
      'Word connections: 500 levels, 4–7 lines',
      'Fully bilingual (Portuguese & English)',
      'Daily challenge & progress calendar',
      'Offline play',
    ],
    featuresPt: [
      'Sopa de letras: 300 níveis, várias grelhas',
      'Conexões de palavras: 500 níveis',
      'Bilingue (português e inglês)',
      'Desafio diário e calendário de progresso',
      'Jogo offline',
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/verbalis/id6752515624',
    launchDate: '2025',
    highlighted: false,
    image: '/images/portfolio/verbalis.png',
  },
  {
    slug: 'crypto-adoption',
    name: 'Crypto Adoption',
    namePt: 'Crypto Adoption',
    type: 'Strategy Game',
    typePt: 'Jogo de Estratégia',
    category: 'mobile',
    platform: ['ios'],
    techStack: ['Flutter', 'iOS'],
    description:
      'Spread cryptocurrency adoption across the world. Choose your crypto (Bitcoin, Ethereum, Solana, etc.), develop your strategy, and reach 100% global adoption before regulators or market events stop you.',
    descriptionPt:
      'Espalha a adoção de criptomoedas pelo mundo. Escolhe a tua cripto, desenvolve a estratégia e alcança 100% de adoção global antes de reguladores ou eventos de mercado te travarem.',
    overview:
      'Inspired by Plague Inc., Crypto Adoption is a strategy game where you spread crypto adoption instead of a virus. Six crypto types, interactive map, marketing campaigns, and random events (Elon tweets, bans, etc.).',
    overviewPt:
      'Inspirado no Plague Inc., Crypto Adoption é um jogo de estratégia onde espalhas a adoção de cripto. Seis tipos de cripto, mapa interativo, campanhas de marketing e eventos aleatórios.',
    features: [
      '6 cryptocurrency types with unique traits',
      'Interactive world map with adoption view',
      'Campaigns: marketing, listings, lobbying',
      'Dynamic events: Elon tweets, crashes, bans',
      'ZHOA Era secret mode at 90% adoption',
    ],
    featuresPt: [
      '6 tipos de criptomoedas com características únicas',
      'Mapa mundial interativo',
      'Campanhas: marketing, listings, lobbying',
      'Eventos dinâmicos: tweets, crashes, proibições',
      'Modo secreto ZHOA aos 90% de adoção',
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/crypto-adoption/id6753661731',
    launchDate: '2025',
    highlighted: false,
    image: '/images/portfolio/crypto-adoption.png',
  },
  {
    slug: 'kairo-decide-better',
    name: 'Kairo: Decide Better',
    namePt: 'Kairo: Decide Better',
    type: 'Productivity',
    typePt: 'Produtividade',
    category: 'mobile',
    platform: ['ios'],
    techStack: ['Swift', 'iOS', 'AI'],
    description:
      'Productivity and decision-making system: one clear focus per day, conversational input, journaling, tasks, habits, and financial awareness. AI coach with memory that adapts to your goals.',
    descriptionPt:
      'Sistema de produtividade e decisão: um foco claro por dia, entrada conversacional, journaling, tarefas, hábitos e consciência financeira. Coach de IA com memória.',
    overview:
      'Kairo delivers a daily "Kairo Moment"—one personalised priority—based on emotional check-in, brain dump, gratitude, and 3–5 essential tasks. Includes five journals, habit tracking, expense awareness, and an AI coach with memory.',
    overviewPt:
      'Kairo entrega um «Kairo Moment» diário—uma prioridade personalizada—com base em check-in emocional, brain dump, gratidão e 3–5 tarefas essenciais. Inclui cinco diários, hábitos, despesas e coach de IA com memória.',
    features: [
      'Daily ritual: emotional check-in, brain dump, gratitude',
      'One personalised "Kairo Moment" per day',
      'Five journals: gratitude, brain dump, wisdom, life book, reflection',
      'Smart tasks (3–5 essential per day) & habit tracking',
      'AI Coach with memory & financial awareness',
    ],
    featuresPt: [
      'Ritual diário: check-in emocional, brain dump, gratidão',
      'Um «Kairo Moment» personalizado por dia',
      'Cinco diários: gratidão, brain dump, sabedoria, life book, reflexão',
      'Tarefas essenciais e hábitos',
      'Coach de IA com memória e consciência financeira',
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/kairo-decide-better/id6757859161',
    launchDate: '2026',
    highlighted: true,
    image: '/images/portfolio/kairo-decide-better.png',
  },
];
