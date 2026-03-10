'use client';

import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  onNavigate?: (page: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-navy-900 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            Voltar ao início
          </button>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-yellow-400" size={32} />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white uppercase">
              Termos e Condições
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Última atualização: 25 de fevereiro de 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

          {/* 1. Identificação */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              1. Identificação da Entidade
            </h2>
            <p>
              O presente website é propriedade e operado pela <strong>Associação Desportiva de São Romão (ADSR)</strong>, 
              associação sem fins lucrativos, com sede no Estádio Nossa Senhora da Conceição, 6270-273 São Romão, 
              Seia, distrito da Guarda, Portugal.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-4 text-sm space-y-1">
              <p><strong>Denominação:</strong> Associação Desportiva de São Romão</p>
              <p><strong>Sede:</strong> Estádio Nossa Senhora da Conceição, 6270-273 São Romão, Seia</p>
              <p><strong>E-mail:</strong> geral@adsaoromao.pt</p>
              <p><strong>Telefone:</strong> +351 925 228 934</p>
            </div>
          </section>

          {/* 2. Objeto */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              2. Objeto e Âmbito
            </h2>
            <p>
              Os presentes Termos e Condições regulam o acesso e utilização do website{' '}
              <strong>www.adsaoromao.pt</strong> (doravante &quot;Website&quot;), incluindo todos os seus conteúdos, 
              funcionalidades e serviços disponibilizados, designadamente:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Consulta de informação institucional, desportiva e notícias;</li>
              <li>Inscrição como sócio da ADSR;</li>
              <li>Inscrição de atletas nos escalões de formação e seniores;</li>
              <li>Compra de artigos na loja online;</li>
              <li>Contacto com a direção do clube.</li>
            </ul>
            <p className="mt-3">
              Ao aceder e utilizar este Website, o utilizador aceita, de forma plena e sem reservas, 
              os presentes Termos e Condições. Caso não concorde, deve cessar imediatamente a utilização do Website.
            </p>
          </section>

          {/* 3. Propriedade Intelectual */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              3. Propriedade Intelectual
            </h2>
            <p>
              Todos os conteúdos deste Website — incluindo, mas não se limitando a, textos, imagens, 
              fotografias, logótipos, emblemas, vídeos, gráficos, design e software — são propriedade 
              da ADSR ou dos respetivos titulares de direitos, sendo protegidos pelo Código do Direito 
              de Autor e dos Direitos Conexos (CDADC) e demais legislação aplicável.
            </p>
            <p className="mt-3">
              É expressamente proibida a reprodução, distribuição, comunicação pública ou transformação 
              dos conteúdos sem autorização prévia e escrita da ADSR, exceto nos casos legalmente permitidos, 
              nomeadamente para uso privado nos termos do artigo 75.º do CDADC.
            </p>
          </section>

          {/* 4. Sócios */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              4. Inscrição de Sócios
            </h2>
            <p>A inscrição como sócio da ADSR através do Website está sujeita às seguintes condições:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>O registo implica a aceitação dos Estatutos da ADSR e do regulamento interno;</li>
              <li>Os dados fornecidos devem ser verdadeiros, completos e atualizados;</li>
              <li>A qualidade de sócio fica condicionada ao pagamento da joia de inscrição e quotas, nos termos definidos;</li>
              <li>A ADSR reserva-se o direito de recusar inscrições que não cumpram os requisitos estatutários;</li>
              <li>O sócio pode exercer os direitos previstos nos Estatutos após regularização das quotas.</li>
            </ul>
          </section>

          {/* 5. Loja Online */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              5. Loja Online
            </h2>
            <p>
              A compra de artigos através da loja online do Website rege-se pelas seguintes condições, 
              em conformidade com o Decreto-Lei n.º 24/2014, de 14 de fevereiro (contratos celebrados à 
              distância e fora do estabelecimento comercial):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Os preços apresentados incluem IVA à taxa legal em vigor;</li>
              <li>A encomenda constitui uma proposta de compra, sujeita a confirmação por parte da ADSR;</li>
              <li>Os prazos de entrega são meramente indicativos;</li>
              <li>Os custos de envio, quando aplicáveis, são informados antes da confirmação da compra.</li>
            </ul>

            <h3 className="font-display text-lg font-bold text-navy-900 mt-6 mb-3">
              5.1. Direito de Livre Resolução
            </h3>
            <p>
              Nos termos do artigo 10.º do Decreto-Lei n.º 24/2014, o consumidor tem o direito de resolver 
              o contrato no prazo de <strong>14 dias</strong> a contar da receção do produto, sem necessidade 
              de indicar motivo e sem custos adicionais, exceto os custos de devolução.
            </p>
            <p className="mt-2">
              Para exercer este direito, deve contactar a ADSR através do e-mail{' '}
              <a href="mailto:geral@adsaoromao.pt" className="text-navy-900 font-semibold underline decoration-yellow-400 decoration-2">
                geral@adsaoromao.pt
              </a>, indicando a intenção de devolver o artigo.
            </p>

            <h3 className="font-display text-lg font-bold text-navy-900 mt-6 mb-3">
              5.2. Garantias
            </h3>
            <p>
              Os produtos vendidos pela ADSR beneficiam da garantia legal de conformidade prevista no 
              Decreto-Lei n.º 84/2021, de 18 de outubro, com prazo de <strong>3 anos</strong> para bens 
              novos, a contar da entrega do bem ao consumidor.
            </p>
          </section>

          {/* 6. Responsabilidade */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              6. Limitação de Responsabilidade
            </h2>
            <p>A ADSR não garante:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Que o Website esteja permanentemente disponível ou isento de erros;</li>
              <li>A exatidão, atualidade ou completude de toda a informação disponibilizada;</li>
              <li>A ausência de vírus ou outros elementos nocivos.</li>
            </ul>
            <p className="mt-3">
              A ADSR não é responsável por danos diretos ou indiretos resultantes da utilização ou 
              impossibilidade de utilização do Website, incluindo perda de dados, interrupção de 
              atividade ou danos em equipamento informático.
            </p>
          </section>

          {/* 7. Links Externos */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              7. Ligações a Websites Externos
            </h2>
            <p>
              O Website pode conter ligações para websites de terceiros. A ADSR não controla nem se 
              responsabiliza pelo conteúdo, políticas de privacidade ou práticas desses websites. 
              O acesso a websites externos é feito por conta e risco do utilizador.
            </p>
          </section>

          {/* 8. Lei Aplicável */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              8. Lei Aplicável e Resolução de Litígios
            </h2>
            <p>
              Os presentes Termos e Condições regem-se pela lei portuguesa. Para a resolução de 
              eventuais litígios decorrentes da utilização deste Website, as partes submetem-se 
              à jurisdição dos tribunais portugueses competentes.
            </p>
            <p className="mt-3">
              Em caso de litígio de consumo, o utilizador pode recorrer à plataforma europeia de 
              Resolução de Litígios em Linha (RLL), disponível em{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-navy-900 font-semibold underline decoration-yellow-400 decoration-2"
              >
                https://ec.europa.eu/consumers/odr
              </a>, 
              ou a um dos centros de arbitragem de conflitos de consumo autorizados, nos termos da 
              Lei n.º 144/2015, de 8 de setembro.
            </p>
          </section>

          {/* 9. Livro de Reclamações */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              9. Livro de Reclamações
            </h2>
            <p>
              A ADSR disponibiliza o acesso ao Livro de Reclamações Eletrónico, nos termos do 
              Decreto-Lei n.º 156/2005, de 15 de setembro, com as alterações introduzidas pelo 
              Decreto-Lei n.º 74/2017, de 21 de junho, acessível em{' '}
              <a 
                href="https://www.livroreclamacoes.pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-navy-900 font-semibold underline decoration-yellow-400 decoration-2"
              >
                www.livroreclamacoes.pt
              </a>.
            </p>
          </section>

          {/* 10. Alterações */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              10. Alterações aos Termos e Condições
            </h2>
            <p>
              A ADSR reserva-se o direito de modificar os presentes Termos e Condições a qualquer 
              momento. As alterações produzem efeitos a partir da sua publicação no Website. 
              A utilização continuada do Website após a publicação de alterações constitui 
              aceitação das mesmas.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
