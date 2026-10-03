/**
 * Época desportiva corrente.
 *
 * As competições da AF Guarda arrancam no Verão e atravessam a viragem do ano,
 * por isso a época não coincide com o ano civil: de Julho a Dezembro conta o
 * ano corrente, de Janeiro a Junho conta o anterior. O formato é o mesmo que o
 * zerozero devolve e que fica gravado na coluna `epoca` ("2026/2027").
 *
 * Deixar isto derivado da data — e não fixo numa constante — é o que faz a
 * viragem de época acontecer sozinha: em Julho o site deixa de mostrar a época
 * anterior sem ninguém lhe tocar.
 */

/** Mês em que a nova época passa a ser a corrente (1 = Janeiro). */
const MES_DE_VIRAGEM = 7;

export function epocaDesportiva(data: Date = new Date()): string {
  const ano = data.getFullYear();
  const inicio = data.getMonth() + 1 >= MES_DE_VIRAGEM ? ano : ano - 1;
  return `${inicio}/${inicio + 1}`;
}

/** Forma curta para etiquetas: "2026/2027" -> "26/27". */
export function epocaCurta(epoca: string = epocaDesportiva()): string {
  const [a, b] = epoca.split('/');
  return a && b ? `${a.slice(2)}/${b.slice(2)}` : epoca;
}
