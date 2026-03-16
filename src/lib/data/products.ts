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
    tagline: 'AI phone answering for your business (in development)',
    taglinePt: 'Atendimento telefónico por IA para o teu negócio (em desenvolvimento)',
    description:
      'Linea is our product in development: an AI that answers your business phone 24/7, in Portuguese or English. We\'re currently closing our first clients—if you\'re an SME, clinic, or local business and want to be among the first to try it, get in touch.',
    descriptionPt:
      'A Linea é o nosso produto em desenvolvimento: uma IA que atende o teu telefone 24/7, em português ou inglês. Estamos a fechar os primeiros clientes—se és uma PME, clínica ou negócio local e queres ser dos primeiros a experimentar, fala connosco.',
    url: process.env.NEXT_PUBLIC_LINEA_URL || 'https://uselinea.com',
    cta: 'Get in touch',
    ctaPt: 'Falar connosco',
  },
];
