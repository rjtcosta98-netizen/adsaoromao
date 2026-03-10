'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Users, Newspaper, ShoppingBag, HelpCircle, Loader2 } from 'lucide-react';

const SUBJECTS = [
  { value: 'geral', label: 'Informações Gerais', icon: HelpCircle },
  { value: 'inscricao', label: 'Inscrição de Atleta', icon: Users },
  { value: 'socios', label: 'Sócios / Quotas', icon: Users },
  { value: 'loja', label: 'Loja / Encomendas', icon: ShoppingBag },
  { value: 'media', label: 'Comunicação / Media', icon: Newspaper },
  { value: 'outro', label: 'Outro Assunto', icon: HelpCircle },
];

export const ContactsContent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'geral',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Por favor preenche todos os campos obrigatórios.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao enviar mensagem.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: 'geral', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erro ao enviar. Tenta novamente.');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Form & Info Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">

          {/* Left: Contact Form */}
          <div className="lg:w-3/5 order-2 lg:order-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-navy-900 px-6 sm:px-8 md:px-10 py-6 sm:py-8">
                <span className="text-yellow-400 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block mb-2">
                  Formulário de Contacto
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white uppercase">
                  Envie a sua Mensagem
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">
                  Responderemos no prazo máximo de 48 horas úteis.
                </p>
              </div>

              {/* Form Body */}
              <div className="px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10">
                {status === 'success' ? (
                  <div className="text-center py-10 sm:py-16">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h4 className="font-display font-bold text-xl sm:text-2xl text-navy-900 uppercase mb-3">
                      Mensagem Enviada!
                    </h4>
                    <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-8">
                      Obrigado pelo teu contacto. A direção da ADSR irá responder brevemente para o email indicado.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 px-8 rounded-xl text-sm uppercase tracking-wider transition-all"
                    >
                      Enviar Nova Mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                          Nome Completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="O teu nome"
                          required
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="teu.email@exemplo.com"
                          required
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                          Telefone <span className="text-gray-400 font-normal normal-case">(opcional)</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+351 912 345 678"
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                          Assunto <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-gray-800 focus:border-yellow-400 focus:bg-white focus:outline-none transition-all appearance-none"
                        >
                          {SUBJECTS.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                        Mensagem <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        placeholder="Descreve o motivo do teu contacto..."
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                        <AlertCircle size={18} className="shrink-0" />
                        <p>{errorMessage}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-navy-900 hover:bg-navy-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 sm:py-4.5 rounded-xl uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 group"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          A enviar...
                        </>
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-gray-400">
                      Ao enviar, aceitas a nossa{' '}
                      <a href="/privacidade" className="underline hover:text-navy-900 transition-colors">Política de Privacidade</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right: Info Sidebar */}
          <div className="lg:w-2/5 order-1 lg:order-2 space-y-5 sm:space-y-6">

            {/* Sede Social */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h3 className="font-display font-bold text-base sm:text-lg text-navy-900 uppercase mb-5 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <MapPin size={16} className="text-navy-900" />
                </div>
                Sede Social
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Estádio Nossa Senhora da Conceição</p>
                    <p className="text-xs text-gray-500 mt-0.5">Av. do Estádio, 6270-273 São Romão, Seia</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-yellow-500 shrink-0" />
                  <div>
                    <a href="tel:+351925228934" className="text-sm font-semibold text-gray-800 hover:text-navy-900 transition-colors">
                      +351 925 228 934
                    </a>
                    <p className="text-[10px] text-gray-400">Chamada para rede móvel nacional</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-yellow-500 shrink-0" />
                  <a href="mailto:geral@adsaoromao.pt" className="text-sm font-semibold text-gray-800 hover:text-navy-900 transition-colors">
                    geral@adsaoromao.pt
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Horário da Secretaria</p>
                    <p className="text-xs text-gray-500 mt-0.5">Seg – Sex: 18:00 – 20:00</p>
                    <p className="text-xs text-gray-500">Sáb: 10:00 – 12:30</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Departamentos */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h3 className="font-display font-bold text-base sm:text-lg text-navy-900 uppercase mb-5 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <Users size={16} className="text-navy-900" />
                </div>
                Departamentos
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-yellow-50 transition-colors group">
                  <p className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Futebol & Formação</p>
                  <a href="mailto:formacao.adsr@gmail.com" className="text-sm text-gray-500 group-hover:text-navy-900 transition-colors break-all">
                    formacao.adsr@gmail.com
                  </a>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-yellow-50 transition-colors group">
                  <p className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Comunicação & Media</p>
                  <a href="mailto:media.adsr@gmail.com" className="text-sm text-gray-500 group-hover:text-navy-900 transition-colors break-all">
                    media.adsr@gmail.com
                  </a>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 hover:bg-yellow-50 transition-colors group">
                  <p className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">Direção / Geral</p>
                  <a href="mailto:geral@adsaoromao.pt" className="text-sm text-gray-500 group-hover:text-navy-900 transition-colors break-all">
                    geral@adsaoromao.pt
                  </a>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="bg-navy-900 rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full blur-[80px] opacity-15" />
              <h3 className="font-display font-bold text-base sm:text-lg uppercase mb-4 relative z-10">
                Segue-nos nas Redes
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-5 relative z-10">
                Acompanha todas as novidades, resultados e bastidores da ADSR.
              </p>
              <div className="flex gap-3 relative z-10">
                <a href="https://www.facebook.com/adsaoromao" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 hover:bg-blue-600 border border-white/10 hover:border-blue-600 rounded-xl py-3 text-center text-xs font-bold uppercase tracking-wider transition-all">
                  Facebook
                </a>
                <a href="https://www.instagram.com/adsaoromao" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 hover:bg-pink-600 border border-white/10 hover:border-pink-600 rounded-xl py-3 text-center text-xs font-bold uppercase tracking-wider transition-all">
                  Instagram
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-10 sm:py-14 max-w-6xl">
          <div className="text-center mb-8">
            <span className="text-yellow-500 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase block mb-2">
              Como chegar
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-navy-900 uppercase">
              A Nossa Localização
            </h3>
          </div>
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-[300px] sm:h-[400px] md:h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6076.451629063816!2d-7.728179097175617!3d40.40384802718619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3cd5c76ac1575d%3A0xd1eb4b72faab685!2sCampo%20de%20futebol%20de%20S%C3%A3o%20Rom%C3%A3o!5e0!3m2!1spt-PT!2spt!4v1772031988248!5m2!1spt-PT!2spt"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização AD São Romão"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
