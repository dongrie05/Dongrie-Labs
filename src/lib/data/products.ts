export interface Product {
  id: string;
  name: string;
  namePt: string;
  tagline: string;
  taglinePt: string;
  description: string;
  descriptionPt: string;
  url: string;
  cta: string;
  ctaPt: string;
}

export const products: Product[] = [
  {
    id: 'linea',
    name: 'Linea',
    namePt: 'Linea',
    tagline: 'AI phone answering for your business',
    taglinePt: 'Atendimento telefónico por IA para o teu negócio',
    description:
      'Never miss a call. Linea answers your business phone with AI—24/7, in Portuguese or English. Perfect for SMEs, clinics, and local businesses who can\'t afford to lose leads.',
    descriptionPt:
      'Nunca perdas uma chamada. A Linea atende o teu telefone com IA—24/7, em português ou inglês. Ideal para PMEs, clínicas e negócios locais que não podem perder oportunidades.',
    url: process.env.NEXT_PUBLIC_LINEA_URL || 'https://uselinea.com',
    cta: 'Try Linea',
    ctaPt: 'Experimentar Linea',
  },
];
