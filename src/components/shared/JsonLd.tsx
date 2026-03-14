const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dongrielabs.com';

export function OrganizationJsonLd() {
  const org = {
    '@type': 'Organization',
    name: 'Dongrie Labs',
    url: BASE_URL,
    description:
      'AI-powered software studio. Mobile apps, AI integration, business automation. Fast delivery, founder-led.',
    founder: {
      '@type': 'Person',
      name: 'Gonçalo Dongrie',
      email: 'goncalo.dongrie05@gmail.com',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+351-927-699-882',
      contactType: 'customer service',
      areaServed: 'PT',
      availableLanguage: ['English', 'Portuguese'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
    />
  );
}

export function WebSiteJsonLd() {
  const webSite = {
    '@type': 'WebSite',
    name: 'Dongrie Labs',
    url: BASE_URL,
    description:
      'Build mobile apps, AI systems and automations in weeks. Solo studio by Gonçalo Dongrie.',
    inLanguage: ['en', 'pt'],
    publisher: {
      '@type': 'Organization',
      name: 'Dongrie Labs',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const localBusiness = {
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Dongrie Labs',
    description:
      'AI-powered software studio. Mobile apps, AI integration, business automation. Fast delivery, founder-led.',
    url: BASE_URL,
    telephone: '+351-927-699-882',
    email: 'goncalo.dongrie05@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PT',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '€2k – €10k',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
