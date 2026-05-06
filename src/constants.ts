
import { MatchResult, NewsItem, Product, Sponsor } from './types';
import { Trophy, Users, MapPin, Shield } from 'lucide-react';

// Placeholder Logo URL (using a generic shield for demo purposes)
export const LOGO_URL = "https://cdn-img.zerozero.pt/img/logos/equipas/8062_imgbank.png"; 

export const LATEST_RESULTS: MatchResult[] = [];
export const UPCOMING_MATCHES: MatchResult[] = [];
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
  'VF Naves': '/images/VFNAVES.png',
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

// ─── Livestream Configuration ────────────────────────────────────────────────
// Set `enabled: true` before the match and `false` after to show/hide the section.
// Replace `youtubeId` with the actual YouTube video/stream ID when available.
export const LIVESTREAM_CONFIG = {
  enabled: false,
  youtubeId: 'r2OmZqQ9FNo', // ID extraído de https://www.youtube.com/watch?v=r2OmZqQ9FNo
  homeTeam: 'SC Celoricense', // substitui pelo nome real da equipa adversária
  awayTeam: 'AD São Romão',   // substitui pelo nome real da equipa adversária
  competition: 'Liga Futebol Sub-14 Allianza - Mário Sequeira',
  matchDate: '2026-05-02',       // formato YYYY-MM-DD
  matchTime: '14:15',
};
// ─────────────────────────────────────────────────────────────────────────────

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 6,
    category: 'CLUBE',
    title: 'ADSR distinguida novamente como Entidade Formadora Certificada ⭐⭐⭐ pela FPF',
    date: 'Maio, 2026',
    excerpt: 'A Associação Desportiva de São Romão volta a fazer história ao ser distinguida novamente como entidade formadora de 3 estrelas pela Federação Portuguesa de Futebol.',
    imageUrl: '/images/NEWS/entidade-formadora-2526.jpg',
    content: 'A Associação Desportiva de São Romão volta a fazer história ao ser distinguida novamente como entidade formadora de ⭐️⭐️⭐️ pela Federação Portuguesa de Futebol.\n\nUm reconhecimento que reflete muito mais do que resultados, celebra o trabalho diário a dedicação incansável dos seus treinadores, atletas, diretores, direção e a paixão que move toda uma comunidade em redor do nosso clube.\n\nEste selo de qualidade é a prova de que com compromisso, união e amor ao clube, continua a construir-se um futuro sólido para o futebol, dentro e fora das quatro linhas.\n\nMuitos parabéns a todos os intervenientes!\n\nJuntos fazemos história! ADSR SEMPRE!',
    contentImageUrl: '/images/NEWS/entidade-formadora-2526.jpg'
  },
    {
    id: 1,
    category: 'SÓCIOS',
    title: ' Eleições para os Órgãos Sociais da ADSR 26/28 ',
    date: 'Maio, 2026',
    excerpt: 'Os orgãos sociais da Associação Desportiva de São Romão vem por este meio informar,',
    imageUrl: '/images/INFO.png',
    content: 'A Associação Desportiva de São Romão (ADSR), em harmonia com o disposto nos estatutos e no exercício da competência consignada, vem por este meio informar, que as eleições para os Órgãos Sociais da ADSR para o biénio 26/28, irão decorrer no dia 29 de maio de 2026, na sede da instituição situada na Praça de São Pedro, Nº1ª, aquando da realização da Assembleia Geral ordinária de sócios, estando no último ponto da ordem de trabalhos.',
    contentImageUrl: '/images/infosocios.png'
  },
  {
    id: 2,
    category: 'CLUBE',
    title: 'Atribuição da Bandeira da Ética à Associação Desportiva de São Romão',
    date: 'Março, 2026',
    excerpt: 'Atribuição da Bandeira da Ética à Associação Desportiva de São Romão reconhecida pelo IPDJ - Instituto Português do Desporto e Juventude, I.P. PNED',
    imageUrl: '/images/NEWS/ADSR1.jpg',
    content: 'Atribuição da Bandeira da Ética à Associação Desportiva de São Romão reconhecida pelo IPDJ - Instituto Português do Desporto e Juventude, I.P. PNED representa um importante marco no compromisso do clube com os valores do desporto responsável.\n\nEste reconhecimento destaca o trabalho desenvolvido na promoção do respeito, do fair play, da inclusão e da formação cívica dos seus atletas, reforçando o papel do clube como espaço educativo e de desenvolvimento.\n\nMuitos parabéns, bem hajam a todos! 💙💛'
  },
  {
    id: 3,
    category: 'CLUBE',
    title: 'Associação Desportiva de São Romão conquista Galardão de Entidade Formadora 3 estrelas, atribuído pela FPF',
    date: 'Maio, 2025',
    excerpt: 'A Associação Desportiva de São Romão (ADSR) foi reconhecida como Entidade Formadora 3 Estrelas pela Federação Portuguesa de Futebol (FPF)',
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20CERTIFICADO'
  },
  {
    id: 4,
    category: 'EVENTO',
    title: 'ADSR CUP 2026',
    date: '18 Jan, 2026',
    excerpt: 'A ADSR CUP 2026, na sua IV edição, promete voltar a reunir jovens talentos, clubes e famílias num ambiente de competição saudável, paixão pelo futebol e fair-play. O torneio decorrerá nos dias 13 e 14 de junho e 20 e 21 de junho de 2026, no Estádio N. S. Conceição, em São Romão.',
    imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20CUP%202026'
  },
  {
    id: 5,
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
    name: 'SWEATSHIRT ADSR COM SIMBOLO',
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
  // Principal
  { id: 1, name: 'Element Group - Solutions', category: 'Sponsor Principal', imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Element%20Group%20Solucoes%20Digitais' },
  // Gold
  { id: 2, name: 'FDM CARTERET, NJ', category: 'Parceiro Gold', imageUrl: 'https://ik.imagekit.io/xqd9lrvbt/gemini-2.5-flash-image_faz-me_este_logo_tal_e_qual_com_a_maxima_qualidade_sem_mudares_nada-1.jpg' },
  // Silver
  { id: 3, name: 'Alves Bandeira', category: 'Parceiro Silver', imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/aa805ee2-6fb1-4c1d-9c18-706f9556bada.jpeg' },
  // Local
  { id: 4, name: 'Junta de Freguesia de S. Romão', category: 'Apoio Local', imageUrl: 'https://ik.imagekit.io/xqd9lrvbt/gemini-2.5-flash-image_melhora-me_este_logo_sem_mudar_nada_e_remove_o_fundo-2.jpg' },
  { id: 5, name: 'Município de Seia', category: 'Apoio Local', imageUrl: 'https://ik.imagekit.io/xqd9lrvbt/logo_cm-seia.png' },
  { id: 6, name: 'Solar do Mimo', category: 'Apoio Local', imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/logo-solardomimo-b.png' },
  { id: 7, name: 'Escola Evaristo Nogueira', category: 'Apoio Local', imageUrl: 'https://ik.imagekit.io/hpkvbu9sn/416085974_893147459487726_7890513589601136074_n.jpg' },
  { id: 8, name: 'Bombeiros Voluntários São Romão', category: 'Apoio Local', imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/d1df0815-7d16-4855-b150-bc73bb6bc4be.jpeg' },
  { id: 9, name: 'Agrupamento Escolas de Seia', category: 'Apoio Local', imageUrl: 'https://ik.imagekit.io/elementgroup/ADSR/Patrocinadores/logotipo1.jpg' },
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
        { id: 23, name: 'MIGUEL BRITO', role: 'Defesa Lateral', image: 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25%20(1).jpeg?updatedAt=1773052555510' },
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
    title: '1/4 TAÇA DE HONRA - Guarda FC vs AD São Romão',
    subtitle: '1/4 FINAL TAÇA DE HONRA COMUNILOG 25/26',
    date: '3 Maio 2026',
    coverImage: '/images/JOGOSSENIORES/TACAQUARTOS/09.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/JOGOSSENIORES/TACAQUARTOS/01.jpg' },
      { id: 2, url: '/images/JOGOSSENIORES/TACAQUARTOS/02.jpg' },
      { id: 3, url: '/images/JOGOSSENIORES/TACAQUARTOS/03.jpg' },
      { id: 4, url: '/images/JOGOSSENIORES/TACAQUARTOS/04.jpg' },
      { id: 5, url: '/images/JOGOSSENIORES/TACAQUARTOS/05.jpg' },
      { id: 6, url: '/images/JOGOSSENIORES/TACAQUARTOS/06.jpg' },
      { id: 7, url: '/images/JOGOSSENIORES/TACAQUARTOS/07.jpg' },
      { id: 8, url: '/images/JOGOSSENIORES/TACAQUARTOS/08.jpg' },
      { id: 9, url: '/images/JOGOSSENIORES/TACAQUARTOS/09.jpg' },
      { id: 10, url: '/images/JOGOSSENIORES/TACAQUARTOS/010.jpg' },
      { id: 11, url: '/images/JOGOSSENIORES/TACAQUARTOS/011.jpg' },
      { id: 12, url: '/images/JOGOSSENIORES/TACAQUARTOS/012.jpg' },
      { id: 13, url: '/images/JOGOSSENIORES/TACAQUARTOS/013.jpg' },
      { id: 14, url: '/images/JOGOSSENIORES/TACAQUARTOS/014.jpg' },
      { id: 15, url: '/images/JOGOSSENIORES/TACAQUARTOS/015.jpg' },
      { id: 16, url: '/images/JOGOSSENIORES/TACAQUARTOS/016.jpg' },
      { id: 17, url: '/images/JOGOSSENIORES/TACAQUARTOS/017.jpg' },
      { id: 18, url: '/images/JOGOSSENIORES/TACAQUARTOS/018.jpg' },
      { id: 19, url: '/images/JOGOSSENIORES/TACAQUARTOS/019.jpg' },
      { id: 20, url: '/images/JOGOSSENIORES/TACAQUARTOS/020.jpg' },
    ]
  },
  {
    id: 2,
    title: 'SUB14 - SC Celoricense vs AD São Romão',
    subtitle: '1ª Divisão AFG 25/26',
    date: '2 Maio 2026',
    coverImage: '/images/SUB14CELO/03.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/SUB14CELO/01.jpg' },
      { id: 2, url: '/images/SUB14CELO/02.jpg' },
      { id: 3, url: '/images/SUB14CELO/03.jpg' },
      { id: 4, url: '/images/SUB14CELO/04.jpg' },
      { id: 5, url: '/images/SUB14CELO/05.jpg' },
      { id: 6, url: '/images/SUB14CELO/06.jpg' },
      { id: 7, url: '/images/SUB14CELO/07.jpg' },
      { id: 8, url: '/images/SUB14CELO/08.jpg' },
      { id: 9, url: '/images/SUB14CELO/09.jpg' },
      { id: 10, url: '/images/SUB14CELO/010.jpg' },
      { id: 11, url: '/images/SUB14CELO/011.jpg' },
      { id: 12, url: '/images/SUB14CELO/012.jpg' },
      { id: 13, url: '/images/SUB14CELO/013.jpg' },
      { id: 14, url: '/images/SUB14CELO/014.jpg' },
      { id: 15, url: '/images/SUB14CELO/015.jpg' },
      { id: 16, url: '/images/SUB14CELO/016.jpg' },
      { id: 17, url: '/images/SUB14CELO/017.jpg' },
      { id: 18, url: '/images/SUB14CELO/018.jpg' },
      { id: 19, url: '/images/SUB14CELO/019.jpg' },
      { id: 20, url: '/images/SUB14CELO/020.jpg' },
      { id: 21, url: '/images/SUB14CELO/021.jpg' },
    ]
  },
  {
    id: 3,
    title: 'SENIORES: ADSR VS SC CELORICENSE',
    subtitle: 'Campeonato Distrital 2025/26',
    date: '25 Abril 2026',
    coverImage: '/images/JOGOSSENIORES/CELORICENSE/08.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/JOGOSSENIORES/CELORICENSE/01.jpg' },
      { id: 2, url: '/images/JOGOSSENIORES/CELORICENSE/02.jpg' },
      { id: 3, url: '/images/JOGOSSENIORES/CELORICENSE/03.jpg' },
      { id: 4, url: '/images/JOGOSSENIORES/CELORICENSE/04.jpg' },
      { id: 5, url: '/images/JOGOSSENIORES/CELORICENSE/05.jpg' },
      { id: 6, url: '/images/JOGOSSENIORES/CELORICENSE/06.jpg' },
      { id: 7, url: '/images/JOGOSSENIORES/CELORICENSE/07.jpg' },
      { id: 8, url: '/images/JOGOSSENIORES/CELORICENSE/08.jpg' },
      { id: 9, url: '/images/JOGOSSENIORES/CELORICENSE/09.jpg' },
      { id: 10, url: '/images/JOGOSSENIORES/CELORICENSE/010.jpg' },
      { id: 11, url: '/images/JOGOSSENIORES/CELORICENSE/011.jpg' },
      { id: 12, url: '/images/JOGOSSENIORES/CELORICENSE/012.jpg' },
      { id: 13, url: '/images/JOGOSSENIORES/CELORICENSE/013.jpg' },
      { id: 14, url: '/images/JOGOSSENIORES/CELORICENSE/014.jpg' },
      { id: 15, url: '/images/JOGOSSENIORES/CELORICENSE/015.jpg' },
      { id: 16, url: '/images/JOGOSSENIORES/CELORICENSE/016.jpg' },
      { id: 17, url: '/images/JOGOSSENIORES/CELORICENSE/017.jpg' },
      { id: 18, url: '/images/JOGOSSENIORES/CELORICENSE/018.jpg' },
      { id: 19, url: '/images/JOGOSSENIORES/CELORICENSE/019.jpg' },
    ]
  },
  {
    id: 4,
    title: 'SUB19: ADSR VS VILA CORTEZ',
    subtitle: 'TORNEIO FUTBEOL SUB-19 FDM',
    date: '25 Abril 2026',
    coverImage: '/images/SUB19/010.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/SUB19/01.jpg' },
      { id: 2, url: '/images/SUB19/02.jpg' },
      { id: 3, url: '/images/SUB19/03.jpg' },
      { id: 4, url: '/images/SUB19/04.jpg' },
      { id: 5, url: '/images/SUB19/05.jpg' },
      { id: 6, url: '/images/SUB19/06.jpg' },
      { id: 7, url: '/images/SUB19/07.jpg' },
      { id: 8, url: '/images/SUB19/08.jpg' },
      { id: 9, url: '/images/SUB19/09.jpg' },
      { id: 10, url: '/images/SUB19/010.jpg' },
      { id: 11, url: '/images/SUB19/011.jpg' },
      { id: 12, url: '/images/SUB19/012.jpg' },
      { id: 13, url: '/images/SUB19/013.jpg' },
      { id: 14, url: '/images/SUB19/014.jpg' },
      { id: 15, url: '/images/SUB19/015.jpg' },
      { id: 16, url: '/images/SUB19/016.jpg' },
      { id: 17, url: '/images/SUB19/017.jpg' },
      { id: 18, url: '/images/SUB19/018.jpg' },
      { id: 19, url: '/images/SUB19/019.jpg' },
      { id: 20, url: '/images/SUB19/020.jpg' },
    ]
  },
  {
    id: 5,
    title: 'FUT&FUN KIDS: SUB10',
    subtitle: 'FUT&FUN KIDS - AFG 2025/26',
    date: '26 Abril 2026',
    coverImage: '/images/SUB10/FUTFUN/012.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/SUB10/FUTFUN/01.jpg' },
      { id: 2, url: '/images/SUB10/FUTFUN/02.jpg' },
      { id: 3, url: '/images/SUB10/FUTFUN/03.jpg' },
      { id: 4, url: '/images/SUB10/FUTFUN/04.jpg' },
      { id: 5, url: '/images/SUB10/FUTFUN/05.jpg' },
      { id: 6, url: '/images/SUB10/FUTFUN/06.jpg' },
      { id: 7, url: '/images/SUB10/FUTFUN/07.jpg' },
      { id: 8, url: '/images/SUB10/FUTFUN/08.jpg' },
      { id: 9, url: '/images/SUB10/FUTFUN/09.jpg' },
      { id: 10, url: '/images/SUB10/FUTFUN/010.jpg' },
      { id: 11, url: '/images/SUB10/FUTFUN/011.jpg' },
      { id: 12, url: '/images/SUB10/FUTFUN/012.jpg' },
      { id: 13, url: '/images/SUB10/FUTFUN/013.jpg' },
      { id: 14, url: '/images/SUB10/FUTFUN/014.jpg' },
      { id: 15, url: '/images/SUB10/FUTFUN/015.jpg' },
      { id: 16, url: '/images/SUB10/FUTFUN/016.jpg' },
      { id: 17, url: '/images/SUB10/FUTFUN/017.jpg' },
      { id: 18, url: '/images/SUB10/FUTFUN/018.jpg' },
      { id: 19, url: '/images/SUB10/FUTFUN/019.jpg' },
      { id: 20, url: '/images/SUB10/FUTFUN/020.jpg' },
    ]
  },
  {
    id: 6,
    title: 'Sub10: ADSR VS FORNOS DE ALGODRES',
    subtitle: 'Liga Futebol Sub-10 Condente',
    date: '26 Abril 2026',
    coverImage: '/images/SUB10/FORNOS/07.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/SUB10/FORNOS/01.jpg' },
      { id: 2, url: '/images/SUB10/FORNOS/02.jpg' },
      { id: 3, url: '/images/SUB10/FORNOS/03.jpg' },
      { id: 4, url: '/images/SUB10/FORNOS/04.jpg' },
      { id: 5, url: '/images/SUB10/FORNOS/05.jpg' },
      { id: 6, url: '/images/SUB10/FORNOS/06.jpg' },
      { id: 7, url: '/images/SUB10/FORNOS/07.jpg' },
      { id: 8, url: '/images/SUB10/FORNOS/08.jpg' },
      { id: 9, url: '/images/SUB10/FORNOS/09.jpg' },
      { id: 10, url: '/images/SUB10/FORNOS/010.jpg' },
      { id: 11, url: '/images/SUB10/FORNOS/011.jpg' },
      { id: 12, url: '/images/SUB10/FORNOS/012.jpg' },
      { id: 13, url: '/images/SUB10/FORNOS/013.jpg' },
      { id: 14, url: '/images/SUB10/FORNOS/014.jpg' },
      { id: 15, url: '/images/SUB10/FORNOS/015.jpg' },
      { id: 16, url: '/images/SUB10/FORNOS/016.jpg' },
      { id: 17, url: '/images/SUB10/FORNOS/017.jpg' },
      { id: 18, url: '/images/SUB10/FORNOS/018.jpg' },
      { id: 19, url: '/images/SUB10/FORNOS/019.jpg' },
      { id: 20, url: '/images/SUB10/FORNOS/020.jpg' },
    ]
  },
  {
    id: 7,
    title: 'SENIORES: ADSR VS FORNOS DE ALGODRES',
    subtitle: 'AF Guarda 1ª Divisão 2025/26',
    date: '19 Abril 2026',
    coverImage: '/images/JOGOSSENIORES/FORNOS/CAPA.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/JOGOSSENIORES/FORNOS/01.jpg' },
      { id: 2, url: '/images/JOGOSSENIORES/FORNOS/02.jpg' },
      { id: 3, url: '/images/JOGOSSENIORES/FORNOS/03.jpg' },
      { id: 4, url: '/images/JOGOSSENIORES/FORNOS/04.jpg' },
      { id: 5, url: '/images/JOGOSSENIORES/FORNOS/05.jpg' },
      { id: 6, url: '/images/JOGOSSENIORES/FORNOS/06.jpg' },
      { id: 7, url: '/images/JOGOSSENIORES/FORNOS/CAPA.jpg' },
      { id: 8, url: '/images/JOGOSSENIORES/FORNOS/08.jpg' },
      { id: 9, url: '/images/JOGOSSENIORES/FORNOS/09.jpg' },
      { id: 10, url: '/images/JOGOSSENIORES/FORNOS/010.jpg' },
      { id: 11, url: '/images/JOGOSSENIORES/FORNOS/011.jpg' },
      { id: 12, url: '/images/JOGOSSENIORES/FORNOS/012.jpg' },
      { id: 13, url: '/images/JOGOSSENIORES/FORNOS/013.jpg' },
      { id: 14, url: '/images/JOGOSSENIORES/FORNOS/014.jpg' },
      { id: 15, url: '/images/JOGOSSENIORES/FORNOS/015.jpg' },
      { id: 16, url: '/images/JOGOSSENIORES/FORNOS/016.jpg' },
      { id: 17, url: '/images/JOGOSSENIORES/FORNOS/017.jpg' },
      { id: 18, url: '/images/JOGOSSENIORES/FORNOS/018.jpg' },
      { id: 19, url: '/images/JOGOSSENIORES/FORNOS/019.jpg' },
      { id: 20, url: '/images/JOGOSSENIORES/FORNOS/020.jpg' },
    ]
  },
  {
    id: 8,
    title: 'FUT&FUN KIDS: TRAQUINAS SUB8',
    subtitle: 'ERA GUARDA TRAQUINAS SUB8 - AFG 2025/26',
    date: '18 Abril 2026',
    coverImage: '/images/SUB8/04.jpeg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/SUB8/01.jpeg' },
      { id: 2, url: '/images/SUB8/02.jpeg' },
      { id: 3, url: '/images/SUB8/03.jpeg' },
      { id: 4, url: '/images/SUB8/04.jpeg' },
      { id: 5, url: '/images/SUB8/05.jpeg' },
      { id: 6, url: '/images/SUB8/06.jpeg' },
      { id: 7, url: '/images/SUB8/07.jpeg' },
      { id: 8, url: '/images/SUB8/08.jpeg' },
      { id: 9, url: '/images/SUB8/09.jpeg' },
      { id: 10, url: '/images/SUB8/010.jpeg' },
      { id: 11, url: '/images/SUB8/011.jpeg' },
      { id: 12, url: '/images/SUB8/012.jpeg' },
      { id: 13, url: '/images/SUB8/013.jpeg' },
      { id: 14, url: '/images/SUB8/014.jpeg' },
      { id: 15, url: '/images/SUB8/015.jpeg' },
      { id: 16, url: '/images/SUB8/016.jpeg' },
      { id: 17, url: '/images/SUB8/017.jpeg' },
      { id: 18, url: '/images/SUB8/018.jpeg' },
      { id: 19, url: '/images/SUB8/019.jpeg' },
      { id: 20, url: '/images/SUB8/020.jpeg' },
      { id: 21, url: '/images/SUB8/021.jpeg' },
      { id: 22, url: '/images/SUB8/022.jpeg' },
      { id: 23, url: '/images/SUB8/023.jpeg' },
      { id: 24, url: '/images/SUB8/024.jpeg' },
      { id: 25, url: '/images/SUB8/025.jpeg' },
      { id: 26, url: '/images/SUB8/026.jpeg' },
      { id: 27, url: '/images/SUB8/027.jpeg' },
      { id: 28, url: '/images/SUB8/028.jpeg' },
      { id: 29, url: '/images/SUB8/029.jpeg' },
      { id: 30, url: '/images/SUB8/030.jpeg' },
      { id: 31, url: '/images/SUB8/031.jpeg' },
      { id: 32, url: '/images/SUB8/032.jpeg' },
      { id: 33, url: '/images/SUB8/033.jpeg' },
      { id: 34, url: '/images/SUB8/034.jpeg' },
      { id: 35, url: '/images/SUB8/035.jpeg' },
      { id: 36, url: '/images/SUB8/036.jpeg' },
      { id: 37, url: '/images/SUB8/037.jpeg' },
      { id: 38, url: '/images/SUB8/038.jpeg' },
      { id: 39, url: '/images/SUB8/039.jpeg' },
      { id: 40, url: '/images/SUB8/040.jpeg' },
      { id: 41, url: '/images/SUB8/041.jpeg' },
      { id: 42, url: '/images/SUB8/042.jpeg' },
      { id: 43, url: '/images/SUB8/043.jpeg' },
      { id: 44, url: '/images/SUB8/044.jpeg' },
      { id: 45, url: '/images/SUB8/045.jpeg' },
      { id: 46, url: '/images/SUB8/046.jpeg' },
      { id: 47, url: '/images/SUB8/047.jpeg' },
      { id: 48, url: '/images/SUB8/048.jpeg' },
      { id: 49, url: '/images/SUB8/049.jpeg' },
      { id: 50, url: '/images/SUB8/050.jpeg' },
      { id: 51, url: '/images/SUB8/051.jpeg' },
      // Adicione mais fotos aqui...
    ]
  },
  {
    id: 9,
    title: 'SUB14: AD SÃO ROMÃO VS NDS GUARDA',
    subtitle: 'SUB14 ALLIANZA 1º DIVISÃO',
    date: '19 Abril 2026',
    coverImage: '/images/SUB14/06.jpeg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/SUB14/01.jpeg' },
      { id: 2, url: '/images/SUB14/02.jpeg' },
      { id: 3, url: '/images/SUB14/03.jpeg' },
      { id: 4, url: '/images/SUB14/04.jpeg' },
      { id: 5, url: '/images/SUB14/05.jpeg' },
      { id: 6, url: '/images/SUB14/06.jpeg' },
      { id: 7, url: '/images/SUB14/07.jpeg' },
      { id: 8, url: '/images/SUB14/08.jpeg' },
      { id: 9, url: '/images/SUB14/09.jpeg' },
      { id: 10, url: '/images/SUB14/010.jpeg' },
      { id: 11, url: '/images/SUB14/011.jpeg' },
      { id: 12, url: '/images/SUB14/012.jpeg' },
      { id: 13, url: '/images/SUB14/013.jpeg' },
      { id: 14, url: '/images/SUB14/014.jpeg' },
      { id: 15, url: '/images/SUB14/015.jpeg' },
      { id: 16, url: '/images/SUB14/016.jpeg' },
      { id: 17, url: '/images/SUB14/017.jpeg' },
      { id: 18, url: '/images/SUB14/019.jpeg' },
      { id: 19, url: '/images/SUB14/020.jpeg' },
      { id: 20, url: '/images/SUB14/021.jpeg' },
      // Adicione mais fotos aqui...
    ]
  },
  {
    id: 10,
    title: 'SENIORES: SP MEDA VS AD SÃO ROMÃO',
    subtitle: 'Campeonato Distrital 2025/26',
    date: '13 Abril 2026',
    coverImage: '/images/JOGOSSENIORES/018.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/JOGOSSENIORES/01.jpg' },
      { id: 2, url: '/images/JOGOSSENIORES/02.jpg' },
      { id: 3, url: '/images/JOGOSSENIORES/03.jpg' },
      { id: 4, url: '/images/JOGOSSENIORES/04.jpg' },
      { id: 5, url: '/images/JOGOSSENIORES/05.jpg' },
      { id: 6, url: '/images/JOGOSSENIORES/06.jpg' },
      { id: 7, url: '/images/JOGOSSENIORES/07.jpg' },
      { id: 8, url: '/images/JOGOSSENIORES/08.jpg' },
      { id: 9, url: '/images/JOGOSSENIORES/09.jpg' },
      { id: 10, url: '/images/JOGOSSENIORES/010.jpg' },
      { id: 11, url: '/images/JOGOSSENIORES/011.jpg' },
      { id: 12, url: '/images/JOGOSSENIORES/012.jpg' },
      { id: 13, url: '/images/JOGOSSENIORES/013.jpg' },
      { id: 14, url: '/images/JOGOSSENIORES/014.jpg' },
      { id: 15, url: '/images/JOGOSSENIORES/015.jpg' },
      { id: 16, url: '/images/JOGOSSENIORES/016.jpg' },
      { id: 17, url: '/images/JOGOSSENIORES/017.jpg' },
      { id: 18, url: '/images/JOGOSSENIORES/018.jpg' },
      { id: 19, url: '/images/JOGOSSENIORES/019.jpg' },
      { id: 20, url: '/images/JOGOSSENIORES/020.jpg' },
      // Adicione mais fotos aqui...
    ]
  },
  {
    id: 11,
    title: 'SUB16: ADSR VS NDS GUARDA',
    subtitle: 'AF Guarda Juniores B Sub-16 2ª Fase Apuramento de Campeão 2025/2026',
    date: '11 Abril 2026',
    coverImage: '/images/JOGOSSUB16/09.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/JOGOSSUB16/01.jpg' },
      { id: 2, url: '/images/JOGOSSUB16/02.jpg' },
      { id: 3, url: '/images/JOGOSSUB16/03.jpg' },
      { id: 4, url: '/images/JOGOSSUB16/04.jpg' },
      { id: 5, url: '/images/JOGOSSUB16/05.jpg' },
      { id: 6, url: '/images/JOGOSSUB16/06.jpg' },
      { id: 7, url: '/images/JOGOSSUB16/07.jpg' },
      { id: 8, url: '/images/JOGOSSUB16/08.jpg' },
      { id: 9, url: '/images/JOGOSSUB16/09.jpg' },
      { id: 10, url: '/images/JOGOSSUB16/010.jpg' },
      { id: 11, url: '/images/JOGOSSUB16/011.jpg' },
      { id: 12, url: '/images/JOGOSSUB16/012.jpg' },
      { id: 13, url: '/images/JOGOSSUB16/013.jpg' },
      { id: 14, url: '/images/JOGOSSUB16/014.jpg' },
      { id: 15, url: '/images/JOGOSSUB16/015.jpg' },
      { id: 16, url: '/images/JOGOSSUB16/016.jpg' },
      { id: 17, url: '/images/JOGOSSUB16/017.jpg' },
      { id: 18, url: '/images/JOGOSSUB16/018.jpg' },
      { id: 19, url: '/images/JOGOSSUB16/019.jpg' },
      { id: 20, url: '/images/JOGOSSUB16/020.jpg' },
      // Adicione mais fotos aqui...
    ]
  },
   {
    id: 12,
    title: 'SUB10: ADSR VS SC CELORICENSE',
    subtitle: 'LIGA FUTEBOL SUB-10 CONDENTE (13ª JORNADA)',
    date: '11 Abril 2026',
    coverImage: '/images/SUB10/012.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/SUB10/01.jpg' },
      { id: 2, url: '/images/SUB10/02.jpg' },
      { id: 3, url: '/images/SUB10/03.jpg' },
      { id: 4, url: '/images/SUB10/04.jpg' },
      { id: 5, url: '/images/SUB10/05.jpg' },
      { id: 6, url: '/images/SUB10/06.jpg' },
      { id: 7, url: '/images/SUB10/07.jpg' },
      { id: 8, url: '/images/SUB10/08.jpg' },
      { id: 9, url: '/images/SUB10/09.jpg' },
      { id: 10, url: '/images/SUB10/010.jpg' },
      { id: 11, url: '/images/SUB10/011.jpg' },
      { id: 12, url: '/images/SUB10/012.jpg' },
      { id: 13, url: '/images/SUB10/013.jpg' },
      { id: 14, url: '/images/SUB10/014.jpg' },
      { id: 15, url: '/images/SUB10/015.jpg' },
      // Adicione mais fotos aqui...
    ]
  },
    {
    id: 13,
    title: 'SUB14: ADSR VS SC SABUGAL',
    subtitle: 'SUB-14 ALLIANZ 1ª DIVISÃO (2ª JORNADA)',
    date: '3 Abril 2026',
    coverImage: '/images/SUB14SABUGAL/00.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/SUB14SABUGAL/00.jpg' },
      { id: 2, url: '/images/SUB14SABUGAL/01.jpg' },
      { id: 3, url: '/images/SUB14SABUGAL/02.jpg' },
      { id: 4, url: '/images/SUB14SABUGAL/03.jpg' },
      { id: 5, url: '/images/SUB14SABUGAL/04.jpg' },
      { id: 6, url: '/images/SUB14SABUGAL/05.jpg' },
      { id: 7, url: '/images/SUB14SABUGAL/06.jpg' },
      { id: 8, url: '/images/SUB14SABUGAL/07.jpg' },
      { id: 9, url: '/images/SUB14SABUGAL/08.jpg' },
      { id: 10, url: '/images/SUB14SABUGAL/09.jpg' },
      { id: 11, url: '/images/SUB14SABUGAL/010.jpg' },
      { id: 12, url: '/images/SUB14SABUGAL/011.jpg' },
      { id: 13, url: '/images/SUB14SABUGAL/012.jpg' },
      { id: 14, url: '/images/SUB14SABUGAL/013.jpg' },
      { id: 15, url: '/images/SUB14SABUGAL/014.jpg' },
      { id: 16, url: '/images/SUB14SABUGAL/015.jpg' },
      { id: 17, url: '/images/SUB14SABUGAL/016.jpg' },
      { id: 18, url: '/images/SUB14SABUGAL/017.jpg' },
      { id: 19, url: '/images/SUB14SABUGAL/018.jpg' },
      // Adicione mais fotos aqui...
    ]
  },
   {
    id: 14,
    title: 'SENIORES: ADSR VS VF NAVES',
    subtitle: 'TACA DE HONRA COMUNILOG 2025/26',
    date: '3 Abril 2026',
    coverImage: '/images/VFNAVESTACA/17.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/VFNAVESTACA/1.jpg' },
      { id: 2, url: '/images/VFNAVESTACA/2.jpg' },
      { id: 3, url: '/images/VFNAVESTACA/3.jpg' },
      { id: 4, url: '/images/VFNAVESTACA/4.jpg' },
      { id: 5, url: '/images/VFNAVESTACA/5.jpg' },
      { id: 6, url: '/images/VFNAVESTACA/6.jpg' },
      { id: 7, url: '/images/VFNAVESTACA/7.jpg' },
      { id: 8, url: '/images/VFNAVESTACA/8.jpg' },
      { id: 9, url: '/images/VFNAVESTACA/9.jpg' },
      { id: 10, url: '/images/VFNAVESTACA/10.jpg' },
      { id: 11, url: '/images/VFNAVESTACA/11.jpg' },
      { id: 12, url: '/images/VFNAVESTACA/12.jpg' },
      { id: 13, url: '/images/VFNAVESTACA/13.jpg' },
      { id: 14, url: '/images/VFNAVESTACA/14.jpg' },
      { id: 15, url: '/images/VFNAVESTACA/15.jpg' },
      { id: 16, url: '/images/VFNAVESTACA/16.jpg' },
      { id: 17, url: '/images/VFNAVESTACA/17.jpg' },
      { id: 18, url: '/images/VFNAVESTACA/18.jpg' },
      { id: 19, url: '/images/VFNAVESTACA/19.jpg' },
      // Adicione mais fotos aqui...
    ]
  },
    {
    id: 15,
    title: 'SENIORES: ADSR VS VF NAVES',
    subtitle: 'Campeonato Distrital 2025/26',
    date: '29 Março 2026',
    coverImage: '/images/VFNAVES/1.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/VFNAVES/1.jpg' },
      { id: 2, url: '/images/VFNAVES/2.jpg' },
      { id: 3, url: '/images/VFNAVES/3.jpg' },
      { id: 4, url: '/images/VFNAVES/4.jpg' },
      { id: 5, url: '/images/VFNAVES/5.jpg' },
      { id: 6, url: '/images/VFNAVES/6.jpg' },
      { id: 7, url: '/images/VFNAVES/7.jpg' },
      { id: 8, url: '/images/VFNAVES/8.jpg' },
      { id: 9, url: '/images/VFNAVES/9.jpg' },
      { id: 10, url: '/images/VFNAVES/10.jpg' },
      { id: 11, url: '/images/VFNAVES/11.jpg' },
      { id: 12, url: '/images/VFNAVES/12.jpg' },
      { id: 13, url: '/images/VFNAVES/13.jpg' },
      { id: 14, url: '/images/VFNAVES/14.jpg' },
      { id: 15, url: '/images/VFNAVES/15.jpg' },
      { id: 16, url: '/images/VFNAVES/16.jpg' },
      { id: 17, url: '/images/VFNAVES/17.jpg' },
      { id: 18, url: '/images/VFNAVES/18.jpg' },
      { id: 19, url: '/images/VFNAVES/19.jpg' },
      { id: 20, url: '/images/VFNAVES/20.jpg' },
      // Adicione mais fotos aqui...
    ]
  },
  {
    id: 16,
    title: 'SUB14: ADSR VS ED GOUVEIA',
    subtitle: 'SUB-14 ALLIANZ 1ªDIVISÃO',
    date: '29 Março 2026',
    coverImage: '/images/SUB14GOUVEIA/1.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: '/images/SUB14GOUVEIA/1.jpg' },
      { id: 2, url: '/images/SUB14GOUVEIA/2.jpg' },
      { id: 3, url: '/images/SUB14GOUVEIA/3.jpg' },
      { id: 4, url: '/images/SUB14GOUVEIA/4.jpg' },
      { id: 5, url: '/images/SUB14GOUVEIA/5.jpg' },
      { id: 6, url: '/images/SUB14GOUVEIA/6.jpg' },
      { id: 7, url: '/images/SUB14GOUVEIA/7.jpg' },
      { id: 8, url: '/images/SUB14GOUVEIA/8.jpg' },
      { id: 9, url: '/images/SUB14GOUVEIA/9.jpg' },
      { id: 10, url: '/images/SUB14GOUVEIA/10.jpg' },
      { id: 11, url: '/images/SUB14GOUVEIA/11.jpg' },
      { id: 12, url: '/images/SUB14GOUVEIA/12.jpg' },
      { id: 13, url: '/images/SUB14GOUVEIA/13.jpg' },
      { id: 14, url: '/images/SUB14GOUVEIA/14.jpg' },
      { id: 15, url: '/images/SUB14GOUVEIA/15.jpg' },
      { id: 16, url: '/images/SUB14GOUVEIA/16.jpg' },
      { id: 17, url: '/images/SUB14GOUVEIA/17.jpg' },
      { id: 18, url: '/images/SUB14GOUVEIA/18.jpg' },
      { id: 19, url: '/images/SUB14GOUVEIA/19.jpg' },
      { id: 20, url: '/images/SUB14GOUVEIA/20.jpg' },
      // Adicione mais fotos aqui...
    ]
  },
   {
    id: 17,
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
    id: 18,
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
  {
    id: 19,
    title: 'SENIORES: ADSR VS TRANCOSO',
    subtitle: 'Campeonato Distrital 2025/26',
    date: '15 Março 2026',
    coverImage: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/653370668_1535281551931487_5847939112126442793_n.jpg',
    photos: [
      // Adicione apenas o URL da foto, sem necessidade de thumbnail
      { id: 1, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/651231826_1535281081931534_7604635708807627390_n.jpg' },
      { id: 2, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/654129363_1535281078598201_8469047388396412015_n.jpg' },
      { id: 3, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/653710692_1535282991931343_2172734458447474330_n.jpg' },
      { id: 4, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/653387317_1535281575264818_6615301992811896769_n.jpg' },
      { id: 5, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/653043207_1535281545264821_3021540793149656379_n.jpg' },
      { id: 6, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/651161200_1535281568598152_3241965146491060242_n.jpg' },
      { id: 7, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/651765722_1535283015264674_5556667749168433091_n.jpg' },
      { id: 8, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/650797099_1535283065264669_4141141357266645883_n.jpg' },
      { id: 9, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/650797099_1535283065264669_4141141357266645883_n.jpg' },
      { id: 10, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/650797099_1535283065264669_4141141357266645883_n.jpg' },
      { id: 11, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/653698448_1535282685264707_2938139612342533587_n.jpg' },
      { id: 12, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/651236246_1535282731931369_2867098979692778043_n.jpg' },
      { id: 13, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/653399646_1535282778598031_2569577475205599086_n.jpg' },
      { id: 14, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/651763556_1535281661931476_7399327415813773473_n.jpg' },
      { id: 15, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/653370668_1535281551931487_5847939112126442793_n.jpg' },
      { id: 16, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/652227331_1535282908598018_4695423720803672575_n.jpg' },
      { id: 17, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/652227331_1535282908598018_4695423720803672575_n.jpg' },
      { id: 18, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/652384763_1535282745264701_3484532611506314959_n.jpg' },
      { id: 19, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/652909333_1535282885264687_3041691874604131503_n.jpg' },
      { id: 20, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/652329717_1535282725264703_2108209086121545789_n.jpg' },
      { id: 21, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/652897243_1535282931931349_4849728715225646532_n.jpg' },
      { id: 22, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/653440820_1535281548598154_8861647900528153290_n.jpg' },
      { id: 23, url: 'https://ik.imagekit.io/hpkvbu9sn/ADSR%20NEW%20VS/650979999_1535282728598036_899068552873647137_n.jpg' },
      // Adicione mais fotos aqui...
    ]
  },
];