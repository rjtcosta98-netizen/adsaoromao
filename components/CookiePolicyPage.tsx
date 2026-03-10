'use client';

import React from 'react';
import { Cookie, ArrowLeft } from 'lucide-react';

interface CookiePolicyPageProps {
  onNavigate?: (page: string) => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onNavigate }) => {
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
            <Cookie className="text-yellow-400" size={32} />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white uppercase">
              Política de Cookies
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

          {/* 1. O que são Cookies */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              1. O que são Cookies?
            </h2>
            <p>
              Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo (computador, 
              tablet ou telemóvel) quando visita um website. São amplamente utilizados para fazer com que 
              os websites funcionem de forma mais eficiente, bem como para fornecer informações aos 
              proprietários do website.
            </p>
            <p className="mt-3">
              A utilização de cookies é regulada em Portugal pela{' '}
              <strong>Lei n.º 41/2004, de 18 de agosto</strong> (Lei da Privacidade nas Comunicações Eletrónicas), 
              alterada pela Lei n.º 46/2012, de 29 de agosto, que transpõe a Diretiva 2002/58/CE (Diretiva ePrivacy), 
              e complementada pelo <strong>RGPD (Regulamento (UE) 2016/679)</strong>.
            </p>
          </section>

          {/* 2. Tipos de Cookies */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              2. Tipos de Cookies Utilizados
            </h2>

            {/* Tabela de Cookies */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="p-3 text-left font-display uppercase text-xs">Cookie</th>
                    <th className="p-3 text-left font-display uppercase text-xs">Tipo</th>
                    <th className="p-3 text-left font-display uppercase text-xs">Finalidade</th>
                    <th className="p-3 text-left font-display uppercase text-xs">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-mono text-xs">cookieConsent</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Essencial</span>
                    </td>
                    <td className="p-3">Regista a aceitação de cookies pelo utilizador</td>
                    <td className="p-3">1 ano</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-3 font-mono text-xs">memberSession</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Essencial</span>
                    </td>
                    <td className="p-3">Mantém a sessão de login do sócio</td>
                    <td className="p-3">Sessão</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-mono text-xs">cartItems</td>
                    <td className="p-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Funcional</span>
                    </td>
                    <td className="p-3">Armazena temporariamente os artigos no carrinho de compras</td>
                    <td className="p-3">Sessão</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-3 font-mono text-xs">sb-*</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Essencial</span>
                    </td>
                    <td className="p-3">Cookies do Supabase para autenticação e gestão de sessão</td>
                    <td className="p-3">Sessão</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Cookies Essenciais */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              3. Cookies Estritamente Necessários
            </h2>
            <p>
              Estes cookies são indispensáveis para o funcionamento do Website e não podem ser desativados. 
              São geralmente configurados em resposta a ações do utilizador, como definir preferências de 
              privacidade, iniciar sessão ou preencher formulários.
            </p>
            <p className="mt-3">
              Nos termos do artigo 5.º, n.º 3, da Lei n.º 41/2004 (alterada pela Lei n.º 46/2012), 
              <strong> os cookies estritamente necessários estão isentos do requisito de consentimento</strong>, 
              por serem essenciais para a prestação do serviço expressamente solicitado pelo utilizador.
            </p>
          </section>

          {/* 4. Cookies Funcionais */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              4. Cookies Funcionais
            </h2>
            <p>
              Estes cookies permitem que o Website forneça funcionalidades melhoradas e personalização, 
              como guardar o conteúdo do carrinho de compras. Podem ser configurados por nós ou por 
              terceiros cujos serviços adicionámos às nossas páginas.
            </p>
            <p className="mt-3">
              A utilização destes cookies requer o consentimento prévio do utilizador, nos termos da 
              Lei n.º 46/2012 e do artigo 7.º do RGPD.
            </p>
          </section>

          {/* 5. Cookies de Terceiros */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              5. Cookies de Terceiros
            </h2>
            <p>
              O Website pode utilizar serviços de terceiros que definem os seus próprios cookies. 
              Não temos controlo sobre esses cookies. Recomendamos a consulta das políticas de 
              privacidade dos respetivos terceiros:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Supabase</strong> — base de dados e autenticação —{' '}
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-navy-900 underline decoration-yellow-400 decoration-2">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <strong>Cloudinary</strong> — alojamento de imagens —{' '}
                <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer" className="text-navy-900 underline decoration-yellow-400 decoration-2">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <strong>Google Fonts</strong> — tipografias —{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-navy-900 underline decoration-yellow-400 decoration-2">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </section>

          {/* 6. Gestão de Cookies */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              6. Como Gerir os Cookies
            </h2>
            <p>
              O utilizador pode a qualquer momento gerir as suas preferências de cookies, aceitando 
              ou recusando cookies não essenciais. Pode ainda configurar o seu browser para:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Bloquear todos ou alguns cookies;</li>
              <li>Receber avisos antes de um cookie ser armazenado;</li>
              <li>Eliminar cookies já armazenados.</li>
            </ul>
            <p className="mt-4">Instruções por browser:</p>
            <div className="bg-gray-50 rounded-xl p-6 mt-2 space-y-3 text-sm">
              <p>
                <strong>Google Chrome:</strong>{' '}
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-navy-900 underline decoration-yellow-400">
                  Gerir cookies no Chrome
                </a>
              </p>
              <p>
                <strong>Mozilla Firefox:</strong>{' '}
                <a href="https://support.mozilla.org/pt/kb/cookies-informacao-que-websites-guardam-no-seu-computador" target="_blank" rel="noopener noreferrer" className="text-navy-900 underline decoration-yellow-400">
                  Gerir cookies no Firefox
                </a>
              </p>
              <p>
                <strong>Safari:</strong>{' '}
                <a href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-navy-900 underline decoration-yellow-400">
                  Gerir cookies no Safari
                </a>
              </p>
              <p>
                <strong>Microsoft Edge:</strong>{' '}
                <a href="https://support.microsoft.com/pt-pt/microsoft-edge/eliminar-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-navy-900 underline decoration-yellow-400">
                  Gerir cookies no Edge
                </a>
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Nota:</strong> A desativação de cookies essenciais pode afetar o correto funcionamento 
              do Website, impedindo o acesso a determinadas funcionalidades.
            </p>
          </section>

          {/* 7. Consentimento */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              7. Consentimento
            </h2>
            <p>
              Na primeira visita ao Website, é apresentado um aviso sobre a utilização de cookies. 
              Ao clicar em &quot;Aceitar&quot;, o utilizador consente a utilização dos cookies descritos 
              nesta política. O consentimento pode ser retirado a qualquer momento através da gestão 
              de cookies do browser.
            </p>
            <p className="mt-3">
              O consentimento é livre, específico, informado e inequívoco, nos termos do artigo 4.º, 
              n.º 11, e do artigo 7.º do RGPD.
            </p>
          </section>

          {/* 8. Mais Informações */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              8. Mais Informações
            </h2>
            <p>
              Para mais informações sobre a forma como tratamos os seus dados pessoais, consulte a nossa{' '}
              <a
                href="/privacidade"
                className="text-navy-900 font-semibold underline decoration-yellow-400 decoration-2"
              >
                Política de Privacidade
              </a>.
            </p>
            <p className="mt-3">
              Para questões sobre cookies, contacte-nos através de{' '}
              <a href="mailto:geral@adsaoromao.pt" className="text-navy-900 font-semibold underline decoration-yellow-400 decoration-2">
                geral@adsaoromao.pt
              </a>.
            </p>
            <p className="mt-3">
              Pode igualmente obter mais informações junto da{' '}
              <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong> —{' '}
              <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-navy-900 font-semibold underline decoration-yellow-400 decoration-2">
                www.cnpd.pt
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
