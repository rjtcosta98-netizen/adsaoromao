import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'AD São Romão | Associação Desportiva Oficial desde 1962',
  description: 'Associação Desportiva São Romão - Clube de futebol desde 1962. Sócios, resultados, notícias, loja oficial e muito mais. Juntos e Fortes!',
  keywords: 'AD São Romão, futebol, Guarda, Portugal, resultados, fixtures, notícias, sócios, loja, clube desportivo, ADSR',
  authors: [{ name: 'AD São Romão' }],
  metadataBase: new URL('https://www.adsaoromao.pt'),
  openGraph: {
    type: 'website',
    url: 'https://www.adsaoromao.pt',
    title: 'AD São Romão - Juntos e Fortes',
    description: 'Associação Desportiva São Romão. 60+ anos de história, paixão e dedicação ao futebol português.',
    images: [
      {
        url: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20.jpeg',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'AD São Romão',
    locale: 'pt_PT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AD São Romão - Juntos e Fortes',
    description: 'Associação Desportiva São Romão. Acompanha resultados, notícias e sé sócio!',
    images: ['https://ik.imagekit.io/elementgroup/ADSR/ADSR%20.jpeg'],
  },
  icons: {
    icon: 'https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png',
    apple: 'https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png',
  },
  other: {
    'theme-color': '#032d61',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <head>
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://cdn-img.zerozero.pt" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://www.adsaoromao.pt" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AD São Romão",
              "url": "https://www.adsaoromao.pt",
              "logo": "https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png",
              "description": "Associação Desportiva São Romão - Clube de futebol desde 1962",
              "founded": "1962",
              "foundingLocation": "São Romão, Guarda, Portugal",
              "sameAs": [
                "https://www.facebook.com/adsaoromao",
                "https://www.instagram.com/adsaoromao"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PT",
                "addressLocality": "Seia",
                "addressRegion": "Guarda",
                "postalCode": "6270-259",
                "streetAddress": "Estádio N. Sra. Conceição"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+351 968 966 375",
                "contactType": "Customer Service",
                "email": "info@adsaoromao.pt",
                "areaServed": "PT",
                "availableLanguage": ["pt"]
              }
            }),
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
