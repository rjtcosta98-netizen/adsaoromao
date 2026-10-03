// Identificador estável de um escalão para usar em URLs (âncora de /equipas).
// As chaves do SQUAD_DATA têm acentos, parênteses e espaços — este slug
// normaliza-as sem depender de uma lista paralela que ficaria dessincronizada.
export function slugEscalao(nome: string): string {
  return nome
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
