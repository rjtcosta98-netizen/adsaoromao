// Netlify Edge Function — serves proper Open Graph meta tags to social media crawlers
// for news detail pages (/noticias/:id)

const NEWS_ITEMS = [
  {
    id: 6,
    category: 'CLUBE',
    title: 'ADSR distinguida novamente como Entidade Formadora Certificada ⭐⭐⭐ pela FPF',
    date: 'Maio, 2026',
    excerpt: 'A Associação Desportiva de São Romão volta a fazer história ao ser distinguida novamente como entidade formadora de 3 estrelas pela Federação Portuguesa de Futebol.',
    imageUrl: 'https://www.adsaoromao.pt/images/NEWS/entidade-formadora-2526.jpg',
  },
  {
    id: 1,
    category: 'CLUBE',
    title: 'Associação Desportiva de São Romão conquista Galardão de Entidade Formadora 3 estrelas, atribuído pela FPF',
    date: 'Maio, 2025',
    excerpt: 'A Associação Desportiva de São Romão (ADSR) foi reconhecida como Entidade Formadora 3 Estrelas pela Federação Portuguesa de Futebol (FPF)',
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20CERTIFICADO',
  },
  {
    id: 2,
    category: 'EVENTO',
    title: 'ADSR CUP 2026',
    date: '18 Jan, 2026',
    excerpt: 'A ADSR CUP 2026, na sua IV edição, promete voltar a reunir jovens talentos, clubes e famílias num ambiente de competição saudável, paixão pelo futebol e fair-play. O torneio decorrerá nos dias 13 e 14 de junho e 20 e 21 de junho de 2026, no Estádio N. S. Conceição, em São Romão.',
    imageUrl: 'https://www.adsaoromao.pt/images/NEWS/adsr-cup-2026.jpg',
  },
  {
    id: 3,
    category: 'RENOVAÇÃO',
    title: 'Grandes Mudanças na ADSR',
    date: '12 Jan, 2026',
    excerpt: 'As grandes mudanças só são possíveis c/ a colaboração dos nossos associados quando estes põem à disposição materiais, tempo e conhecimento para engrandecer a Associação Desportiva de São Romão.',
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20RENOVACAO',
  },
];

const SOCIAL_CRAWLERS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Slackbot',
  'TelegramBot',
  'Discordbot',
  'Googlebot',
];

function isCrawler(userAgent: string): boolean {
  return SOCIAL_CRAWLERS.some((bot) => userAgent.includes(bot));
}

export default async (request: Request) => {
  const userAgent = request.headers.get('user-agent') || '';

  // Only intercept for social media crawlers
  if (!isCrawler(userAgent)) {
    return;
  }

  const url = new URL(request.url);
  const match = url.pathname.match(/^\/noticias\/(\d+)$/);

  if (!match) {
    return;
  }

  const newsId = parseInt(match[1], 10);
  const news = NEWS_ITEMS.find((item) => item.id === newsId);

  if (!news) {
    return;
  }

  const pageUrl = `https://www.adsaoromao.pt/noticias/${news.id}`;
  const description = news.excerpt.substring(0, 200);

  const html = `<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8" />
  <title>${news.title} | AD São Romão</title>
  <meta name="description" content="${description}" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${news.title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${news.imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="AD São Romão" />
  <meta property="og:locale" content="pt_PT" />
  <meta property="article:published_time" content="${news.date}" />
  <meta property="article:section" content="${news.category}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${news.title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${news.imageUrl}" />

  <!-- Redirect browsers to the SPA -->
  <meta http-equiv="refresh" content="0;url=${pageUrl}" />
</head>
<body>
  <h1>${news.title}</h1>
  <p>${news.excerpt}</p>
  <img src="${news.imageUrl}" alt="${news.title}" />
  <a href="${pageUrl}">Ler notícia completa</a>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=UTF-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};

export const config = {
  path: '/noticias/*',
};
