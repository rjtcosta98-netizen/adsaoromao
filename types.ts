
export interface MatchResult {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  category: string; // e.g., "Seniores", "Sub-19"
  status: 'Finalizado' | 'Em Breve' | 'Ao Vivo';
  location: 'Casa' | 'Fora';
  logoHome?: string;
  logoAway?: string;
  date?: string;      // Novo campo
  time?: string;      // Novo campo
  competition?: string; // Novo campo (ex: Campeonato Distrital)
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  imageUrl: string;
}

export interface Photo {
  id: number;
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface Album {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  coverImage: string;
  photos: Photo[];
}

export interface Product {
  id: number;
  name: string;
  category: 'OFICIAL' | 'TREINO' | 'CASUAL' | 'ACESSÓRIOS';
  price: string;
  imageUrl: string;
  isNew?: boolean;
  sizes?: string[];
}

export interface CartItem extends Product {
  cartId: string;
  selectedSize: string;
  quantity: number;
}

export interface Sponsor {
  id: number;
  name: string;
  imageUrl?: string; // usually an image
  category: string;
}
