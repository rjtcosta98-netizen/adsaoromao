
import { MatchResult, NewsItem, Product, Sponsor } from './types';
import { Trophy, Users, MapPin, Shield } from 'lucide-react';

// Placeholder Logo URL (using a generic shield for demo purposes)
export const LOGO_URL = "https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png"; 
export const OPPONENT_LOGO_1 = "https://cdn-icons-png.flaticon.com/512/1273/1273736.png";
export const OPPONENT_LOGO_2 = "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";
export const OPPONENT_LOGO_3 = "https://cdn-icons-png.flaticon.com/512/1828/1828884.png";

export const NAV_LINKS = [
  { name: 'PÁGINA INICIAL', href: '#' },
  { name: 'CLUBE', href: '#clube' },
  { name: 'EQUIPAS', href: '#equipas' },
  { name: 'CLASSIFICAÇÕES', href: '#classificacoes' },
  { name: 'SÓCIOS', href: '#socios' },
  { name: 'PATROCINADORES', href: '#patrocinadores' },
  { name: 'GALERIA', href: '#galeria' },
  { name: 'CONTACTOS', href: '#contactos' },
];

export const TEAM_LOGOS: Record<string, string> = {
  'Guarda FC': 'https://cdn-img.zerozero.pt/img/logos/equipas/242110_imgbank_1733843844.png',
  'Ginásio Figueirense (C.Rodrigo)': 'https://cdn-img.zerozero.pt/img/logos/equipas/5668_imgbank_1744801569.png',
  'SC Sabugal': 'https://cdn-img.zerozero.pt/img/logos/equipas/6836_imgbank.png',
  'SC Celoricense': 'https://cdn-img.zerozero.pt/img/logos/equipas/11074_imgbank.png',
  'Fornos de Algodres': 'https://cdn-img.zerozero.pt/img/logos/equipas/3583_imgbank_1740563759.png',
  'Aguiar da Beira': 'https://cdn-img.zerozero.pt/img/logos/equipas/3546_imgbank.png',
  'Os Vilanovenses': 'https://cdn-img.zerozero.pt/img/logos/equipas/10485_imgbank.png',
  'Trancoso': 'https://cdn-img.zerozero.pt/img/logos/equipas/6839_imgbank.png',
  'AD São Romão': 'https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png',
  'Vila Cortez': 'https://cdn-img.zerozero.pt/img/logos/equipas/6845_imgbank_1744816765.png',
  'Sp. Mêda': 'https://cdn-img.zerozero.pt/img/logos/equipas/6841_imgbank.png',
  'Vilar Formoso': 'https://cdn-img.zerozero.pt/img/logos/equipas/6838_imgbank.png',
  'GD Foz Côa': 'https://cdn-img.zerozero.pt/img/logos/equipas/6846_imgbank.png',
  'VF Naves': 'https://cdn-img.zerozero.pt/img/logos/equipas/11083_imgbank.png',
  'CD Gouveia': 'https://cdn-img.zerozero.pt/img/logos/equipas/4344_imgbank.png',
  'NDS Guarda': 'https://cdn-img.zerozero.pt/img/logos/equipas/10044_imgbank.png',
  'Penaverdense': 'https://cdn-img.zerozero.pt/img/logos/equipas/11072_imgbank_1741687922.png',
  'Pinhelenses': 'https://cdn-img.zerozero.pt/img/logos/equipas/6843_imgbank.png',
  'ED Gouveia': 'https://cdn-img.zerozero.pt/img/logos/equipas/19007_imgbank.png',
  'ED Gouveia B': 'https://cdn-img.zerozero.pt/img/logos/equipas/19007_imgbank.png',
  'Seia FC': 'https://cdn-img.zerozero.pt/img/logos/equipas/16479_imgbank.png',
  'Seia FC B': 'https://cdn-img.zerozero.pt/img/logos/equipas/16479_imgbank.png',
  // Adiciona as restantes equipas da liga
};

export const LATEST_RESULTS: MatchResult[] = [
  {
    id: 1,
    category: 'SENIORES',
    homeTeam: 'AD São Romão',
    awayTeam: 'G. Figueirense',
    homeScore: 1,
    awayScore: 1,
    status: 'Finalizado',
    location: 'Casa',
    logoHome: LOGO_URL,
    logoAway: OPPONENT_LOGO_1
  },
  {
    id: 2,
    category: 'SUB 18 (JUNIORES)',
    homeTeam: 'Vilanovenses',
    awayTeam: 'AD São Romão',
    homeScore: 1,
    awayScore: 0,
    status: 'Finalizado',
    location: 'Fora',
    logoHome: OPPONENT_LOGO_2,
    logoAway: LOGO_URL
  },
  {
    id: 3,
    category: 'SUB 16 (JUVENIS)',
    homeTeam: 'AD São Romão',
    awayTeam: 'SC Sabugal',
    homeScore: 3,
    awayScore: 1,
    status: 'Finalizado',
    location: 'Casa',
    logoHome: LOGO_URL,
    logoAway: OPPONENT_LOGO_1
  },
  {
    id: 4,
    category: 'SUB 14 (INICIADOS)',
    homeTeam: 'Trancoso',
    awayTeam: 'AD São Romão',
    homeScore: 0,
    awayScore: 4,
    status: 'Finalizado',
    location: 'Fora',
    logoHome: OPPONENT_LOGO_2,
    logoAway: LOGO_URL
  },
  {
    id: 5,
    category: 'SUB 12 (INFANTIS)',
    homeTeam: 'AD São Romão',
    awayTeam: 'NDS Guarda',
    homeScore: 2,
    awayScore: 2,
    status: 'Finalizado',
    location: 'Casa',
    logoHome: LOGO_URL,
    logoAway: OPPONENT_LOGO_3
  },
  {
    id: 6,
    category: 'SUB 10 (BENJAMINS)',
    homeTeam: 'Seia FC',
    awayTeam: 'AD São Romão',
    homeScore: 1,
    awayScore: 5,
    status: 'Finalizado',
    location: 'Fora',
    logoHome: OPPONENT_LOGO_1,
    logoAway: LOGO_URL
  },
  {
    id: 7,
    category: 'SUB 8 (TRAQUINAS)',
    homeTeam: 'AD São Romão',
    awayTeam: 'Gouveia',
    homeScore: 8,
    awayScore: 8,
    status: 'Finalizado',
    location: 'Casa',
    logoHome: LOGO_URL,
    logoAway: OPPONENT_LOGO_2
  },
];

export const UPCOMING_MATCHES: MatchResult[] = [
  {
    id: 101,
    category: 'SENIORES',
    homeTeam: 'SC Sabugal',
    awayTeam: 'AD São Romão',
    homeScore: 0,
    awayScore: 0,
    status: 'Em Breve',
    location: 'Fora',
    date: 'DOM, 25 JAN',
    time: '15:15',
    competition: 'AF GUARDA 1ª DIVISÃO',
    logoHome: OPPONENT_LOGO_1,
    logoAway: LOGO_URL
  },
  {
    id: 102,
    category: 'SUB 18 (JUNIORES)',
    homeTeam: 'AD São Romão',
    awayTeam: 'Guarda FC',
    homeScore: 0,
    awayScore: 0,
    status: 'Em Breve',
    location: 'Casa',
    date: 'SÁB, 24 JAN',
    time: '17:00',
    competition: 'CAMPEONATO DISTRITAL',
    logoHome: LOGO_URL,
    logoAway: OPPONENT_LOGO_3
  },
  {
    id: 103,
    category: 'SUB 14 (INICIADOS)',
    homeTeam: 'AD São Romão',
    awayTeam: 'Vilar Formoso',
    homeScore: 0,
    awayScore: 0,
    status: 'Em Breve',
    location: 'Casa',
    date: 'SÁB, 24 JAN',
    time: '10:30',
    competition: 'CAMPEONATO DISTRITAL',
    logoHome: LOGO_URL,
    logoAway: OPPONENT_LOGO_2
  },
  {
    id: 104,
    category: 'SUB 10 (BENJAMINS)',
    homeTeam: 'Nogueirense',
    awayTeam: 'AD São Romão',
    homeScore: 0,
    awayScore: 0,
    status: 'Em Breve',
    location: 'Fora',
    date: 'DOM, 25 JAN',
    time: '11:00',
    competition: 'LIGA DE PRATA',
    logoHome: OPPONENT_LOGO_1,
    logoAway: LOGO_URL
  },
   {
    id: 105,
    category: 'SENIORES',
    homeTeam: 'AD São Romão',
    awayTeam: 'Trancoso',
    homeScore: 0,
    awayScore: 0,
    status: 'Em Breve',
    location: 'Casa',
    date: 'DOM, 01 FEV',
    time: '15:00',
    competition: 'AF GUARDA 1ª DIVISÃO',
    logoHome: LOGO_URL,
    logoAway: OPPONENT_LOGO_2
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    category: 'CLUBE',
    title: 'Associação Desportiva de São Romão conquista Galardão de Entidade Formadora 3 estrelas, atribuído pela FPF',
    date: 'Maio, 2025',
    excerpt: 'A Associação Desportiva de São Romão (ADSR) foi reconhecida como Entidade Formadora 3 Estrelas pela Federação Portuguesa de Futebol (FPF)',
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20CERTIFICADO'
  },
  {
    id: 2,
    category: 'EVENTO',
    title: 'ADSR CUP 2026',
    date: '18 Jan, 2026',
    excerpt: 'A ADSR CUP 2026, na sua IV edição, promete voltar a reunir jovens talentos, clubes e famílias num ambiente de competição saudável, paixão pelo futebol e fair-play. O torneio decorrerá nos dias 13 e 14 de junho e 20 e 21 de junho de 2026, no Estádio N. S. Conceição, em São Romão.',
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20CUP%202026'
  },
  {
    id: 3,
    category: 'RENOVAÇÃO',
    title: 'Grandes Mudanças na ADSR',
    date: '12 Jan, 2026',
    excerpt: 'As grandes mudanças só são possíveis c/ a colaboração dos nossos associados quando estes põem à disposição materiais, tempo e conhecimento para engrandecer a Associação Desportiva de São Romão. A estes associados um agradecimento especial pelo empenho e dedicação na conclusão de mais este projeto de melhoria estrutural da nossa ADSR. Um grande Bem Hajam! 💙💛💪 ',
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20RENOVACAO'
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'CACHECOL OFICIAL 25/26',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Cachecol%20ADSR',
    isNew: true,
    sizes: ['ÚNICO']
  },
  {
    id: 2,
    name: 'SWEATSHIRT ADSR 25/26',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Sweet%20ADSR',
    isNew: true,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'SWEATSHIRT ADSR C/SIMBOLO',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Sweet%20ADSR%20Logo',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'SWEATSHIRT ADSR 25/26 - PRETA',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Sweet%20ADSR%20(Preta)',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 5,
    name: 'T-SHIRT ADSR 25/26 - Preta',
    category: 'CASUAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/gemini-2.5-flash-image_Make_a_person_using_this_shirt_without_change_anything_on_it_It_must_be_white_ba-1.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6,
    name: 'T-SHIRT ADSR 25/26 - Rosa',
    category: 'CASUAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Tshirt%20S%20Romao%20(F)',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 7,
    name: 'BONÉ ADSR AZUL',
    category: 'ACESSÓRIOS',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Chapeu%20Azul.png',
    isNew: true,
    sizes: ['ÚNICO']
  },
  {
    id: 8,
    name: 'BONÉ ADSR PRETO',
    category: 'ACESSÓRIOS',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Chapeu%20preto.png',
    isNew: true,
    sizes: ['ÚNICO']
  },
  {
    id: 10,
    name: 'CHAPÉU ADSR AZUL',
    category: 'ACESSÓRIOS',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Bone%20Rosa.png',
    isNew: true,
    sizes: ['ÚNICO']
  },
  {
    id: 11,
    name: 'CHAPÉU ADSR PRETO',
    category: 'ACESSÓRIOS',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Bone%20Preto.png',
    isNew: true,
    sizes: ['ÚNICO']
  },
  {
    id: 12,
    name: 'EQUIPAMENTO OFICIAL ADSR 25/26 - MAGUIR',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/equipamento%20maguir.png',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 13,
    name: 'SWEATSHIRT OFICIAL ADSR 25/26 - AZUL',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Sweet%20ADSR',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
    {
    id: 14,
    name: 'SWEATSHIRT OFICIAL ADSR 25/26 - Amarela',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/gemini-2.5-flash-image_Make_a_person_using_this_sweet_without_change_anything_on_it_It_must_be_white_ba-1.jpg',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
    {
    id: 15,
    name: 'FATO DE TREINO OFICIAL ADSR 25/26 - AZUL ESCURO',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/gemini-2.5-flash-image_Make_a_person_using_this_panths_and_jacket_without_change_anything_on_it_It_must-0.jpg',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
    {
    id: 16,
    name: 'CASACO OFICIAL ADSR 25/26 - AZUL ESCURO',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/gemini-2.5-flash-image_Make_a_person_using_this_jacket_without_change_anything_on_it_It_must_be_white_b-0.jpg',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
    {
    id: 17,
    name: 'POLO OFICIAL ADSR 25/26 - AMARELO',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/gemini-2.5-flash-image_Make_a_person_using_this_polo_without_change_anything_on_it_It_must_be_white_bac-1.jpg',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
    {
    id: 18,
    name: 'EQUIPAMENTO OFICIAL ADSR 25/26 - SARAIVA PLASTICOS',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/gemini-2.5-flash-image_Make_a_person_using_that_equipement_withou_change_anything_on_it_It_must_be_whit-1%20(1).jpg',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
    {
    id: 19,
    name: 'EQUIPAMENTO OFICIAL ADSR 25/26',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/gemini-2.5-flash-image_Make_a_person_using_that_equipement_withou_change_anything_on_it_It_must_be_whit-1.jpg',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
    {
    id: 20,
    name: 'EQUIPAMENTO GR OFICIAL ADSR 25/26',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/gemini-2.5-flash-image_Make_this_photo_in_correct_dimensions_without_changing_anything_Must_be_100_perc-0.jpg',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
    {
    id: 21,
    name: 'EQUIPAMENTO GR OFICIAL ADSR 25/26 - AZUL',
    category: 'OFICIAL',
    price: "Sob Consulta",
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/gemini-2.5-flash-image_Make_this_photo_in_correct_dimensions_without_changing_anything_Must_be_100_perc-0%20(1).jpg',
    isNew: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
];

export const SPONSORS: Sponsor[] = [
  { id: 1, 
    name: 'Element Group', 
    category: 'Soluções Digitais' , 
    imageUrl:'https://ik.imagekit.io/elementgroup/ADSR/Element%20Group%20Solucoes%20Digitais'   
   },
];

export const HISTORY_STATS = [
  { id: 1, value: '1962', label: 'ANO DE FUNDAÇÃO', icon: Trophy },
  { id: 2, value: '+180', label: 'ATLETAS ACTIVOS', icon: Users },
  { id: 3, value: '01', label: 'PAIXÃO ÚNICA', icon: Shield },
  { id: 4, value: '64', label: 'ANOS DE HISTÓRIA', icon: MapPin }, // Using MapPin as a placeholder for medal
];

export const TIMELINE_EVENTS = [
  { year: '1962', title: 'A Fundação', description: 'A 10 de Outubro nasce a Associação Desportiva de São Romão.' },
  { year: '1975', title: 'Primeiro Título', description: 'Conquista do Campeonato Distrital da 2ª Divisão.' },
  { year: '1988', title: 'Inauguração do Campo', description: 'Abertura oficial do Campo de Jogos da Mata.' },
  { year: '1995', title: 'Campeões Distritais', description: 'Vitória histórica no campeonato principal da AF Guarda.' },
  { year: '2008', title: 'Certificação', description: 'Início do processo de certificação da formação.' },
  { year: '2024', title: 'Modernização', description: 'Renovação das infraestruturas e relvado sintético.' },
];

export const MANAGEMENT_TEAM = [
  { name: 'Carlos Santos', role: 'Presidente', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Maria Fernandes', role: 'Vice-Presidente Financeira', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'João Silva', role: 'Vice-Presidente Desportivo', image: 'https://randomuser.me/api/portraits/men/85.jpg' },
  { name: 'Pedro Marques', role: 'Secretário Geral', image: 'https://randomuser.me/api/portraits/men/12.jpg' },
];

export const SQUAD_DATA = {
  SENIORES: [
    {
      title: 'Equipa Técnica',
      members: [
        { id: 1, name: 'Rui Fernandes', role: 'Treinador', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/Rui%20Fernandes%20ADSR?updatedAt=1773052752856' },
        { id: 2, name: 'Tiago Jesus', role: 'Treinador Adjunto', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/Tiago%20Jesus%20ADSR?updatedAt=1773052869173' },
        { id: 3, name: 'Nelson Rebelo', role: 'Analista & Tr. GR', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/NELSON%20REBELO%20ADSR?updatedAt=1773052834136' }, // Placeholder logic
      ]
    },
    {
      title: 'Guarda-Redes',
      members: [
        { id: 10, name: 'Rafael Santos', role: 'Guarda-Redes', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.23%20(2).jpeg' },
        { id: 11, name: 'Duarte Cabral', role: 'Guarda-Redes', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25%20(3).jpeg' },
      ]
    },
    {
      title: 'Defesas',
      members: [
        { id: 20, name: 'FRIIKIQUE', role: 'Defesa Central', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(1).jpeg' },
        { id: 21, name: 'AFONSO CLARA', role: 'Defesa Lateral', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.28%20(1).jpeg' },
        { id: 22, name: 'JOÃO FREIRE', role: 'Defesa Central', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(4).jpeg' },
        { id: 23, name: 'MIGUEL BRITO', role: 'Defesa Lateral', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(4).jpeg' },
        { id: 24, name: 'ALBANO FERRÃO', role: 'Defesa Lateral', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(5).jpeg' },
        { id: 25, name: 'JOÃO COSTA', role: 'Defesa Lateral', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.28%20(3).jpeg' },
        { id: 27, name: 'BERNARDO', role: 'Defesa Central', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.28%20(2).jpeg' },
      ]
    },
     {
      title: 'Médios',
      members: [
        { id: 28, name: 'LUIS NUNES', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25%20(5).jpeg' },
        { id: 29, name: 'GABRIEL CRUZ', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26.jpeg' },
        { id: 30, name: 'JOÃO MARQUES', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25%20(2).jpeg' },
        { id: 31, name: 'MARIO NUNES', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(2).jpeg' },
        { id: 32, name: 'TIAGO LEMOS', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(3).jpeg' },
        { id: 33, name: 'RUI COSME', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27.jpeg' },
        { id: 34, name: 'LUIS MARTINS', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(4).jpeg' },
        { id: 35, name: 'PAULO JORGE', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(2).jpeg' },
        { id: 36, name: 'KEVIN', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(5).jpeg' },
        { id: 37, name: 'PEDRO SOUSA', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(1).jpeg' },
        { id: 38, name: 'ALIDIO MENDES', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.28.jpeg' },

      ]
    },
     {
      title: 'Avançados',
      members: [
        { id: 40, name: 'ADERITO PERES', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25.jpeg' },
        { id: 41, name: 'SANDRO GOMES', role: '', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(3).jpeg' },
      ]
    }
  ],
  'JUNIORES (U19)': [
    {
      title: 'Plantel Completo',
      members: [
        { 
          id: 101, 
          name: 'João Coimbra', 
          role: 'Treinador', 
          image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-23%20at%2014.45.34.jpeg',
          isTeamPhoto: true
        }
      ]
    }
  ],
  'JUVENIS (U16)': [
    {
      title: 'Plantel Completo',
      members: [
        { 
          id: 201, 
          name: 'Gonçalo Tavares', 
          role: 'Treinador', 
          image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-23%20at%2014.38.47.jpeg',
          isTeamPhoto: true
        }
      ]
    }
  ],
    'INICIADOS (U14)': [
    {
      title: 'Plantel Completo',
      members: [
        { 
          id: 202, 
          name: 'Prof. Davide Oliveira', 
          role: 'Treinador', 
          image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/2da4292a-348b-4892-acc4-0f50cc163cab.jpeg',
          isTeamPhoto: true
        }
      ]
    }
  ],
    'INFANTIS (U12)': [
    {
      title: 'Plantel Completo',
      members: [
        { 
          id: 203, 
          name: 'Eduardo Marques', 
          role: 'Treinador', 
          image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-23%20at%2014.34.59.jpeg',
          isTeamPhoto: true
        }
      ]
    }
  ],
 'BENJAMINS (U10)': [
    {
      title: 'Plantel Completo',
      members: [
        { 
          id: 203, 
          name: 'Válter Santos e Cláudio Silva', 
          role: 'Treinadores', 
          image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/4444.png',
          isTeamPhoto: true
        }
      ]
    }
  ],
 'TRAQUINAS (U8)': [
    {
      title: 'Plantel Completo',
      members: [
        { 
          id: 203, 
          name: 'FRIKIQUE', 
          role: 'Treinador', 
          image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.09.14.jpeg',
          isTeamPhoto: true
        }
      ]
    }
  ],};

// GALLERY ALBUMS - Adicione aqui os seus álbuns de fotos
export const GALLERY_ALBUMS = [
   {
    id: 1,
    title: 'SENIORES: ADSR VS OS VILANOVENSES',
    subtitle: 'Campeonato Distrital 2025/26',
    date: '8 Março 2026',
    coverImage: 'https://ik.imagekit.io/elementgroup/ADSR/649607114_1520282620098047_8821892702949244881_n.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/1.jpg' },
      { id: 2, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/02.jpg' },
      { id: 3, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/03.jpg' },
      { id: 4, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/04.jpg' },
      { id: 5, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/05.jpg' },
      { id: 6, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/06.jpg' },
      { id: 7, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/07.jpg' },
      { id: 8, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/08.jpg' },
      { id: 9, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/09.jpg' },
      { id: 10, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/10.jpg' },
      { id: 11, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/11.jpg' },
      { id: 12, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/12.jpg' },
      { id: 13, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/13.jpg' },
      { id: 14, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/14.jpg' },
      { id: 15, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/15.jpg' },
      { id: 16, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/16.jpg' },
      { id: 17, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/17.jpg' },
      { id: 18, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/18.jpg' },
      { id: 19, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/19.jpg' },
      { id: 20, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/20.jpg' },
      { id: 21, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/21.jpg' },
      { id: 22, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/22.jpg' },
      { id: 23, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/23.jpg' },
      { id: 24, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/24.jpg' },
      { id: 25, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/25.jpg' },
      { id: 26, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20OS%20VILANOVENSSES/26.jpg' },

      // Adicione mais fotos aqui...
    ]
  },
  {
    id: 2,
    title: 'SENIORES: ADSR VS GD Foz Coa',
    subtitle: 'Campeonato Distrital 2025/26',
    date: '1 Março 2026',
    coverImage: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/4.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/1.jpg' },
      { id: 2, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/2.jpg' },
      { id: 3, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/3.jpg' },
      { id: 4, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/4.jpg' },
      { id: 5, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/5.jpg' },
      { id: 6, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/6.jpg' },
      { id: 7, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/7.jpg' },
      { id: 8, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/8.jpg' },
      { id: 9, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/9.jpg' },
      { id: 10, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/10.jpg' },
      { id: 11, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/11.jpg' },
      { id: 12, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/12.jpg' },
      { id: 13, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/13.jpg' },
      { id: 14, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/14.jpg' },
      { id: 15, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/15.jpg' },
      { id: 16, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/16.jpg' },
      { id: 17, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/17.jpg' },
      { id: 18, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/18.jpg' },
      { id: 19, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/19.jpg' },
      { id: 20, url: 'https://ik.imagekit.io/elementgroup/ADSR/GALERIA%20ADSR/JOGO%20-%20GD%20Foz%20Coa/20.jpg' },
      // Adicione mais fotos aqui...
    ]
  },
];