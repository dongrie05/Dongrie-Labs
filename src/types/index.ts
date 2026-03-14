export type Locale = 'en' | 'pt';

export type ProjectCategory = 'mobile' | 'ai' | 'automation' | 'mvp';

export interface Project {
  slug: string;
  name: string;
  namePt?: string;
  type: string;
  typePt?: string;
  category?: ProjectCategory;
  platform: ('ios' | 'android' | 'web')[];
  techStack: string[];
  description: string;
  descriptionPt?: string;
  overview?: string;
  overviewPt?: string;
  features?: string[];
  featuresPt?: string[];
  image?: string;
  gallery?: string[];
  launchDate?: string;
  metrics?: {
    downloads?: string;
    rating?: string;
    developmentTime?: string;
  };
  appStoreUrl?: string;
  playStoreUrl?: string;
  highlighted?: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  titlePt?: string;
  description: string;
  descriptionPt?: string;
  features?: string[];
  featuresPt?: string[];
  tech?: string[];
  priceFrom?: string;
}
