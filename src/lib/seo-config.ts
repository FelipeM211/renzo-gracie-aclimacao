import type { Metadata } from 'next';

export const siteName = 'Renzo Gracie Aclimação';
export const siteUrl = 'https://renzogracieaclimacao.com.br';

export const defaultMetadata: Metadata = {
  title: {
    default: `${siteName} | Jiu-Jitsu em Aclimação, Cambuci e Liberdade`,
    template: `%s | ${siteName}`,
  },
  description:
    'Academia de Jiu-Jitsu, Grappling e Defesa Pessoal na Aclimação, Cambuci e Liberdade. Aulas para todos os níveis, kids e adultos. Venha treinar na Renzo Gracie Aclimação.',
  keywords: [
    'jiu-jitsu Aclimação',
    'jiu-jitsu Cambuci',
    'jiu-jitsu Liberdade',
    'Renzo Gracie Aclimação',
    'academia de jiu-jitsu São Paulo',
    'defesa pessoal',
    'grappling',
    'jiu-jitsu kids',
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName,
    title: `${siteName} | Jiu-Jitsu em Aclimação, Cambuci e Liberdade`,
    description:
      'Academia de Jiu-Jitsu, Grappling e Defesa Pessoal na Aclimação, Cambuci e Liberdade. Aulas para todos os níveis.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Jiu-Jitsu em Aclimação, Cambuci e Liberdade`,
    description:
      'Academia de Jiu-Jitsu, Grappling e Defesa Pessoal na Aclimação, Cambuci e Liberdade.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: siteName,
  description:
    'Academia de Jiu-Jitsu, Grappling e Defesa Pessoal na Aclimação, Cambuci e Liberdade, em São Paulo.',
  url: siteUrl,
  telephone: '+55-11-00000-0000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Exemplo, 123',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '01500-000',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-23.5669',
    longitude: '-46.6334',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Aclimação',
    },
    {
      '@type': 'City',
      name: 'Cambuci',
    },
    {
      '@type': 'City',
      name: 'Liberdade',
    },
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '14:00',
    },
  ],
};