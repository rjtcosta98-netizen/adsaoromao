'use client';

import React from 'react';
import { Shield, Mail, MapPin, Phone, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate?: (page: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
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
            <Shield className="text-yellow-400" size={32} />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white uppercase">
              Política de Privacidade
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

          {/* 1. Responsável pelo Tratamento */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              1. Responsável pelo Tratamento de Dados
            </h2>
            <p>
              A <strong>Associação Desportiva de São Romão (ADSR)</strong>, com sede no Estádio Nossa Senhora da Conceição, 
              6270-273 São Romão, Seia, distrito da Guarda, é a entidade responsável pelo tratamento dos dados pessoais 
              recolhidos através deste website, nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD) — 
              Regulamento (UE) 2016/679 — e da Lei n.º 58/2019, de 8 de agosto, que assegura a execução do RGPD na 
              ordem jurídica portuguesa.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-yellow-500" />
                <span>Estádio Nossa Senhora da Conceição, 6270-273 São Romão, Seia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-yellow-500" />
                <span>geral@adsaoromao.pt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-yellow-500" />
                <span>+351 925 228 934</span>
              </div>
            </div>
          </section>

          {/* 2. Dados Pessoais Recolhidos */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              2. Dados Pessoais Recolhidos
            </h2>
            <p>No âmbito da utilização deste website, podemos recolher os seguintes dados pessoais:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Dados de identificação:</strong> nome completo, data de nascimento, número de identificação fiscal (NIF), número de documento de identificação;</li>
              <li><strong>Dados de contacto:</strong> endereço de e-mail, número de telefone, morada;</li>
              <li><strong>Dados de navegação:</strong> endereço IP, tipo de browser, páginas visitadas, tempo de permanência, cookies (ver Política de Cookies);</li>
              <li><strong>Dados de associado:</strong> número de sócio, categoria de sócio, dados de pagamento de quotas;</li>
              <li><strong>Dados de inscrição desportiva:</strong> escalão, posição, dados de saúde relevantes para a prática desportiva (mediante consentimento explícito);</li>
              <li><strong>Dados de compras:</strong> histórico de compras na loja online, dados de faturação.</li>
            </ul>
          </section>

          {/* 3. Finalidades */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              3. Finalidades do Tratamento
            </h2>
            <p>Os dados pessoais recolhidos são tratados para as seguintes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Gestão da relação de associado (inscrição, quotas, benefícios);</li>
              <li>Inscrição e gestão de atletas nos diversos escalões;</li>
              <li>Processamento de encomendas na loja online;</li>
              <li>Resposta a contactos e pedidos de informação;</li>
              <li>Envio de comunicações institucionais e desportivas (newsletter), mediante consentimento;</li>
              <li>Cumprimento de obrigações legais e regulamentares (fiscais, federativas);</li>
              <li>Melhoria da experiência de utilização do website;</li>
              <li>Análise estatística e anónima do tráfego do website.</li>
            </ul>
          </section>

          {/* 4. Base Legal */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              4. Base Legal do Tratamento
            </h2>
            <p>O tratamento dos dados pessoais tem como base legal, conforme aplicável:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Consentimento</strong> (art. 6.º, n.º 1, al. a) do RGPD) — para envio de comunicações de marketing e tratamento de dados de saúde;</li>
              <li><strong>Execução de contrato</strong> (art. 6.º, n.º 1, al. b) do RGPD) — para gestão da relação de sócio e processamento de compras;</li>
              <li><strong>Cumprimento de obrigação legal</strong> (art. 6.º, n.º 1, al. c) do RGPD) — para obrigações fiscais e regulamentares;</li>
              <li><strong>Interesse legítimo</strong> (art. 6.º, n.º 1, al. f) do RGPD) — para melhoria do website e análise estatística.</li>
            </ul>
          </section>

          {/* 5. Partilha de Dados */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              5. Partilha de Dados com Terceiros
            </h2>
            <p>Os dados pessoais poderão ser partilhados com:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Federação Portuguesa de Futebol (FPF)</strong> e associações distritais — para efeitos de inscrição de atletas;</li>
              <li><strong>Autoridade Tributária</strong> — para cumprimento de obrigações fiscais;</li>
              <li><strong>Prestadores de serviços</strong> — alojamento web (Vercel/Supabase), processamento de pagamentos, sob contratos de subcontratação com garantias adequadas de proteção de dados;</li>
              <li><strong>Autoridades públicas</strong> — quando exigido por lei.</li>
            </ul>
            <p className="mt-3">
              Não transferimos dados pessoais para países fora do Espaço Económico Europeu sem garantias adequadas, 
              nos termos dos artigos 44.º a 49.º do RGPD.
            </p>
          </section>

          {/* 6. Conservação */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              6. Prazo de Conservação
            </h2>
            <p>Os dados pessoais são conservados apenas pelo período necessário à finalidade para que foram recolhidos:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Dados de associados:</strong> durante a vigência da relação associativa e 5 anos após a cessação;</li>
              <li><strong>Dados fiscais e contabilísticos:</strong> 10 anos, nos termos da legislação fiscal portuguesa;</li>
              <li><strong>Dados de atletas:</strong> durante a inscrição e 3 anos após;</li>
              <li><strong>Dados de navegação:</strong> até 13 meses (cookies);</li>
              <li><strong>Dados de contacto (newsletter):</strong> até à revogação do consentimento.</li>
            </ul>
          </section>

          {/* 7. Direitos */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              7. Direitos do Titular dos Dados
            </h2>
            <p>Nos termos do RGPD e da Lei n.º 58/2019, o titular dos dados tem os seguintes direitos:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Direito de acesso</strong> (art. 15.º) — obter confirmação e acesso aos seus dados;</li>
              <li><strong>Direito de retificação</strong> (art. 16.º) — corrigir dados inexatos ou incompletos;</li>
              <li><strong>Direito ao apagamento</strong> (art. 17.º) — solicitar a eliminação dos dados, quando aplicável;</li>
              <li><strong>Direito à limitação do tratamento</strong> (art. 18.º) — restringir o tratamento em determinadas circunstâncias;</li>
              <li><strong>Direito à portabilidade</strong> (art. 20.º) — receber os dados num formato estruturado;</li>
              <li><strong>Direito de oposição</strong> (art. 21.º) — opor-se ao tratamento baseado em interesse legítimo;</li>
              <li><strong>Direito de retirar o consentimento</strong> — a qualquer momento, sem comprometer a licitude do tratamento anterior.</li>
            </ul>
            <p className="mt-4">
              Para exercer qualquer um destes direitos, contacte-nos através do e-mail{' '}
              <a href="mailto:geral@adsaoromao.pt" className="text-navy-900 font-semibold underline decoration-yellow-400 decoration-2">
                geral@adsaoromao.pt
              </a>.
            </p>
            <p className="mt-2">
              Tem igualmente o direito de apresentar reclamação junto da{' '}
              <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong> —{' '}
              <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-navy-900 font-semibold underline decoration-yellow-400 decoration-2">
                www.cnpd.pt
              </a>.
            </p>
          </section>

          {/* 8. Segurança */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              8. Medidas de Segurança
            </h2>
            <p>
              A ADSR adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra 
              destruição acidental ou ilícita, perda, alteração, divulgação ou acesso não autorizados, 
              incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Comunicações encriptadas via HTTPS/TLS;</li>
              <li>Acesso restrito aos dados pessoais apenas a pessoal autorizado;</li>
              <li>Alojamento em infraestruturas com certificações de segurança adequadas;</li>
              <li>Backups regulares e procedimentos de recuperação.</li>
            </ul>
          </section>

          {/* 9. Alterações */}
          <section>
            <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900 uppercase mb-4 border-l-4 border-yellow-400 pl-4">
              9. Alterações à Política de Privacidade
            </h2>
            <p>
              A ADSR reserva-se o direito de atualizar esta Política de Privacidade a qualquer momento. 
              As alterações serão publicadas nesta página com a respetiva data de atualização. 
              Recomendamos a consulta periódica desta página.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
