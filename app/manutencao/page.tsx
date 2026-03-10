import type { Metadata } from 'next';
import { MaintenanceWrapper } from './MaintenanceWrapper';

export const metadata: Metadata = {
  title: 'AD São Romão | Abrimos Brevemente',
  description:
    'O novo site oficial da Associação Desportiva São Romão está quase pronto. Algo incrível está a caminho — abrimos brevemente!',
  keywords:
    'AD São Romão, manutenção, em breve, coming soon, futebol, Guarda, Portugal',
  openGraph: {
    title: 'AD São Romão — Abrimos Brevemente',
    description:
      'Estamos a preparar uma experiência única! O novo espaço digital da AD São Romão está quase pronto.',
    images: [
      {
        url: 'https://res.cloudinary.com/dc7zy0p4q/image/upload/v1770728605/WhatsApp_Image_2026-02-08_at_15.15.02_t9y9bc.jpg',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'AD São Romão',
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AD São Romão — Abrimos Brevemente',
    description:
      'Algo incrível está a caminho. AD São Romão — Juntos e Fortes desde 1962.',
    images: [
      'https://res.cloudinary.com/dc7zy0p4q/image/upload/v1770728605/WhatsApp_Image_2026-02-08_at_15.15.02_t9y9bc.jpg',
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenanceRoute() {
  return <MaintenanceWrapper />;
}
