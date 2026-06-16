import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://renzogracieaclimacao.com.br'),
  title: {
    default: 'Renzo Gracie Aclimação | Jiu-Jitsu de Alto Nível em São Paulo',
    template: '%s | Renzo Gracie Aclimação',
  },
  description:
    'Academia Renzo Gracie no bairro Aclimação, São Paulo. Aulas de Jiu-Jitsu, defesa pessoal e alta performance para todos os níveis.',
  keywords: [
    'Jiu-Jitsu',
    'Renzo Gracie',
    'Aclimação',
    'São Paulo',
    'BJJ',
    'Defesa Pessoal',
    'Artes Marciais',
  ],
  authors: [{ name: 'Renzo Gracie Aclimação' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://renzogracieaclimacao.com.br',
    siteName: 'Renzo Gracie Aclimação',
    title: 'Renzo Gracie Aclimação',
    description:
      'Treine Jiu-Jitsu de alto nível na Aclimação com a metodologia Renzo Gracie.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Renzo Gracie Aclimação',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renzo Gracie Aclimação',
    description: 'Jiu-Jitsu de alto nível no bairro Aclimação, São Paulo.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self'; connect-src 'self' https://www.google-analytics.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen bg-neutral-950 text-neutral-50 antialiased">
        {children}
      </body>
    </html>
  );
}