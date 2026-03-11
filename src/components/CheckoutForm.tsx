

import React, { useState } from 'react';
import { X, Mail, MessageCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
}

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  morada: string;
  codPostal: string;
  cidade: string;
  moradaEnvio: string;
  codPostalEnvio: string;
  cidadeEnvio: string;
  observacoes: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ isOpen, onClose, items, total }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    morada: '',
    codPostal: '',
    cidade: '',
    moradaEnvio: '',
    codPostalEnvio: '',
    cidadeEnvio: '',
    observacoes: ''
  });

  const [moradaEnvioIgual, setMoradaEnvioIgual] = useState(true);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendByEmail = async () => {
    if (!formData.nome || !formData.email || !formData.morada) {
      setStatus('error');
      setErrorMsg('Por favor, preencha os campos obrigatórios: Nome, Email e Morada');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      // Lista de produtos com links das imagens para o email
      const itemsWithLinks = items.map((item, index) => 
        `${index + 1}. ${item.name}\n   Tamanho: ${item.selectedSize} | Quantidade: ${item.quantity}\n   Imagem: ${item.imageUrl}`
      ).join('\n\n');

      const moradaEnvioFinal = moradaEnvioIgual 
        ? 'Igual à morada de faturação' 
        : `${formData.moradaEnvio}, ${formData.codPostalEnvio} ${formData.cidadeEnvio}`;

      const res = await fetch('https://formsubmit.co/ajax/geral@adsaoromao.pt', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[ADSR Loja] Nova Encomenda - ${formData.nome}`,
          _cc: formData.email,
          _template: 'table',
          Nome: formData.nome,
          Email: formData.email,
          Telefone: formData.telefone || 'Não indicado',
          'Morada Faturacao': `${formData.morada}, ${formData.codPostal} ${formData.cidade}`,
          'Morada Envio': moradaEnvioFinal,
          Produtos: itemsWithLinks,
          Observacoes: formData.observacoes || 'Sem observações',
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao enviar encomenda.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado. Tenta novamente.');
    }
  };

  const sendByWhatsApp = () => {
    if (!formData.nome || !formData.morada) {
      setStatus('error');
      setErrorMsg('Por favor, preencha os campos obrigatórios: Nome e Morada');
      return;
    }

    const itemsList = items.map(item => 
      `• ${item.name}\n  Tamanho: ${item.selectedSize} | Qtd: ${item.quantity}\n  Imagem: ${item.imageUrl}`
    ).join('\n\n');

    const whatsappMessage = `🛒 *NOVA ENCOMENDA - AD SÃO ROMÃO*\n\n📋 *DADOS DO CLIENTE*\nNome: ${formData.nome}\nEmail: ${formData.email}\nTelefone: ${formData.telefone || 'Não indicado'}\n\n📍 *MORADA DE FATURAÇÃO*\n${formData.morada}, ${formData.codPostal} ${formData.cidade}\n\n📦 *MORADA DE ENVIO*\n${moradaEnvioIgual ? 'Igual à morada de faturação' : `${formData.moradaEnvio}, ${formData.codPostalEnvio} ${formData.cidadeEnvio}`}\n\n🛍️ *PRODUTOS*\n\n${itemsList}\n\n📝 *Observações:* ${formData.observacoes || 'Nenhuma'}`;

    const whatsappLink = `https://wa.me/351968966375?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 overflow-y-auto">
        <div className="bg-white rounded-none sm:rounded-3xl w-full sm:max-w-2xl shadow-2xl my-0 sm:my-8 h-screen sm:h-auto sm:max-h-[95vh] flex flex-col">
          
          {/* Header - Premium */}
          <div className="p-4 sm:p-8 bg-gradient-to-r from-navy-900 to-navy-800 text-white flex-shrink-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.2em] mb-2">São Romão</p>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">Finalizar<br/>Encomenda</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-navy-700 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Secção 1: Informações Pessoais */}
              <div className="sm:col-span-2">
                <div className="mb-4">
                  <span className="text-yellow-500 text-xs font-black uppercase tracking-[0.15em]">Passo 1</span>
                  <h3 className="text-lg sm:text-xl font-black text-navy-900 uppercase">Informações Pessoais</h3>
                </div>
                <div className="h-1 w-12 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
              </div>

              <div>
                <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Nome Completo *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder="João Silva"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder="joao@exemplo.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder="+351 910 123 456"
                />
              </div>

              {/* Secção 2: Morada de Faturação */}
              <div className="sm:col-span-2 pt-4 border-t-2 border-gray-100">
                <div className="mb-4">
                  <span className="text-yellow-500 text-xs font-black uppercase tracking-[0.15em]">Passo 2</span>
                  <h3 className="text-lg sm:text-xl font-black text-navy-900 uppercase">Morada de Faturação</h3>
                </div>
                <div className="h-1 w-12 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Morada *</label>
                <input
                  type="text"
                  name="morada"
                  value={formData.morada}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder="Rua Principal, nº 123"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Código Postal</label>
                <input
                  type="text"
                  name="codPostal"
                  value={formData.codPostal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder="1234-567"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder="Lisboa"
                />
              </div>

              {/* Secção 3: Opções de Envio */}
              <div className="sm:col-span-2 pt-4 border-t-2 border-gray-100">
                <div className="mb-4">
                  <span className="text-yellow-500 text-xs font-black uppercase tracking-[0.15em]">Passo 3</span>
                  <h3 className="text-lg sm:text-xl font-black text-navy-900 uppercase">Morada de Envio</h3>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-center gap-3 bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
                <input
                  type="checkbox"
                  checked={moradaEnvioIgual}
                  onChange={(e) => setMoradaEnvioIgual(e.target.checked)}
                  className="w-5 h-5 accent-yellow-400 rounded-lg border-2 border-yellow-400"
                />
                <span className="text-sm font-black text-navy-900 uppercase">Usar a mesma morada de faturação</span>
              </div>

              {!moradaEnvioIgual && (
                <>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Morada</label>
                    <input
                      type="text"
                      name="moradaEnvio"
                      value={formData.moradaEnvio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      placeholder="Rua Principal, nº 123"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Código Postal</label>
                    <input
                      type="text"
                      name="codPostalEnvio"
                      value={formData.codPostalEnvio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      placeholder="1234-567"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Cidade</label>
                    <input
                      type="text"
                      name="cidadeEnvio"
                      value={formData.cidadeEnvio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      placeholder="Lisboa"
                    />
                  </div>
                </>
              )}

              {/* Secção 4: Observações */}
              <div className="sm:col-span-2 pt-4 border-t-2 border-gray-100">
                <label className="block text-xs font-black text-navy-900 uppercase tracking-wide mb-2">Observações (opcional)</label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm sm:text-base text-navy-900 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                  placeholder="Mensagens especiais ou instruções..."
                ></textarea>
              </div>

              {/* Resumo Minimalista */}
              <div className="sm:col-span-2 bg-gradient-to-br from-navy-900/5 to-navy-900/10 p-4 sm:p-6 rounded-2xl border-2 border-navy-900/10">
                <h4 className="font-black text-navy-900 uppercase text-sm mb-4 tracking-wider">Resumo da Encomenda</h4>
                <div className="space-y-2.5 mb-4 max-h-[120px] overflow-y-auto">
                  {items.map(item => (
                    <div key={item.cartId} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div>
                        <p className="text-sm font-bold text-navy-900">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.selectedSize} • Qtd: {item.quantity}</p>
                      </div>
                      <span className="font-black text-yellow-500">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-navy-900/20">
                  <span className="font-black text-navy-900 uppercase text-sm">Pedido de Cotação:</span>
                  <span className="font-display font-black text-xl sm:text-2xl text-yellow-500">{isNaN(total) ? 'Sob consulta' : `${total.toFixed(2)}€`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Premium */}
          <div className="p-4 sm:p-8 bg-gradient-to-r from-navy-900 to-navy-800 flex flex-col gap-3 flex-shrink-0 border-t-2 border-yellow-400">
            
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <CheckCircle className="w-12 h-12 text-green-400" />
                <h3 className="text-white font-bold text-lg uppercase">Encomenda Enviada!</h3>
                <p className="text-gray-300 text-sm text-center">
                  Receberás uma confirmação por email. Serás contactado para confirmação do pagamento.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-3 px-8 rounded-xl uppercase tracking-widest text-xs transition-all"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-1">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-red-300 text-xs">{errorMsg || 'Erro ao enviar. Contacte-nos: geral@adsaoromao.pt'}</p>
                  </div>
                )}
                <button
                  onClick={sendByEmail}
                  disabled={status === 'sending'}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-3 sm:py-4 rounded-xl uppercase tracking-widest text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin sm:w-5 sm:h-5" />
                      A enviar...
                    </>
                  ) : (
                    <>
                      <Mail size={16} className="sm:w-5 sm:h-5" />
                      Enviar por Email
                    </>
                  )}
                </button>
                <button
                  onClick={sendByWhatsApp}
                  disabled={status === 'sending'}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-3 sm:py-4 rounded-xl uppercase tracking-widest text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                  Falar no WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
