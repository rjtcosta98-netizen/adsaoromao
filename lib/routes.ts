// Map of old page IDs to new URL paths
export const ROUTE_MAP: Record<string, string> = {
  home: '/',
  clube: '/clube',
  equipas: '/equipas',
  inscricoes: '/inscricoes',
  socios: '/socios',
  patrocinadores: '/patrocinadores',
  galeria: '/galeria',
  noticias: '/noticias',
  contactos: '/contactos',
  loja: '/loja',
  admin: '/admin',
  privacidade: '/privacidade',
  termos: '/termos',
  cookies: '/cookies',
};

// Reverse map: URL path to page ID
export const PATH_TO_PAGE: Record<string, string> = {};
for (const [key, value] of Object.entries(ROUTE_MAP)) {
  PATH_TO_PAGE[value] = key;
}

export function getPageRoute(page: string, id?: number): string {
  if (page === 'noticia-detalhe' && id) {
    return `/noticias/${id}`;
  }
  if (page === 'album-detalhe' && id) {
    return `/galeria/${id}`;
  }
  return ROUTE_MAP[page] || '/';
}

export function getPageIdFromPath(pathname: string): string {
  return PATH_TO_PAGE[pathname] || 'home';
}
