

import React, { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import { Settings, Newspaper, ShoppingBag, Trophy, Save, Trash2, Plus, LogOut, Vote, RefreshCw, AlertTriangle } from 'lucide-react';
import { MatchResult, NewsItem, Product } from '../types';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { matches, news, products, updateMatch, updateNews, addNews, deleteNews, updateProduct, addProduct, deleteProduct } = useData();
  const [activeTab, setActiveTab] = useState<'matches' | 'news' | 'store' | 'voting'>('matches');

  // Voting state
  const [voteResults, setVoteResults] = useState<{ name: string; votes: number }[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [votesLoading, setVotesLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const SEASON = '25/26';
  const VOTE_STORAGE_KEY = 'adsr_voted_melhor_jogador_2526';

  const fetchVoteResults = useCallback(async () => {
    setVotesLoading(true);
    const [votesRes, candidatesRes] = await Promise.all([
      supabase.from('votacoes_melhor_jogador').select('player_id').eq('season', SEASON),
      supabase.from('candidatos_melhor_jogador').select('id, name').eq('season', SEASON),
    ]);
    const votes = votesRes.data ?? [];
    const nameMap: Record<number, string> = {};
    for (const c of candidatesRes.data ?? []) nameMap[c.id] = c.name;

    const counts: Record<number, { name: string; votes: number }> = {};
    for (const row of votes) {
      const id = row.player_id;
      if (!counts[id]) counts[id] = { name: nameMap[id] ?? `Jogador #${id}`, votes: 0 };
      counts[id].votes++;
    }
    const sorted = Object.values(counts).sort((a, b) => b.votes - a.votes);
    setVoteResults(sorted);
    setTotalVotes(votes.length);
    setVotesLoading(false);
  }, []);

  useEffect(() => {
    if (activeTab === 'voting') fetchVoteResults();
  }, [activeTab, fetchVoteResults]);

  const [resetSecret, setResetSecret] = useState('');
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);

  const handleResetVotes = async () => {
    if (!showSecretInput) { setShowSecretInput(true); return; }
    if (!resetSecret) { alert('Introduz o código de segurança.'); return; }
    if (!window.confirm(`Tens a certeza? Esta ação apaga TODOS os ${totalVotes} votos da época ${SEASON} e não pode ser desfeita.`)) return;
    setResetting(true);
    try {
      const res = await fetch('/api/admin-reset-votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ season: SEASON, secret: resetSecret }),
      });
      const data = await res.json();
      if (data.ok) {
        setDeletedCount(data.deleted ?? 0);
        setVoteResults([]);
        setTotalVotes(0);
        setResetDone(true);
        setShowSecretInput(false);
        setResetSecret('');
        setTimeout(() => setResetDone(false), 8000);
      } else if (data.reason === 'unauthorized') {
        alert('Código de segurança incorreto.');
      } else if (data.reason === 'service_key_not_configured') {
        alert('Falta configurar a variável SUPABASE_SERVICE_ROLE_KEY no Netlify. Ver instruções abaixo.');
      } else {
        alert('Erro ao apagar votos: ' + (data.detail ?? data.reason));
      }
    } catch (e) {
      alert('Erro de ligação: ' + e);
    }
    setResetting(false);
  };
  
  // Login State (Simple simulation)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') { // Simple hardcoded password for demo
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta (Dica: admin)');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-2xl">
           <div className="text-center mb-8">
              <div className="w-16 h-16 bg-navy-900 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Settings size={32} />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 uppercase">Administração ADSR</h2>
              <p className="text-gray-500 text-sm mt-2">Área reservada à gestão de conteúdos</p>
           </div>
           <form onSubmit={handleLogin} className="space-y-4">
              <div>
                 <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-700">Palavra-passe</label>
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-gray-100 border border-gray-200 p-3 rounded focus:outline-none focus:border-gold-400 transition-colors"
                   placeholder="Introduza a senha..."
                 />
              </div>
              <button type="submit" className="w-full bg-gold-400 hover:bg-gold-500 text-navy-900 font-bold py-3 rounded uppercase tracking-widest text-sm transition-colors">
                 Entrar
              </button>
           </form>
           <button onClick={onLogout} className="w-full mt-4 text-gray-400 text-xs hover:text-navy-900 underline">Voltar ao Site</button>
        </div>
      </div>
    );
  }

  const tabLabel = activeTab === 'matches' ? 'Resultados' : activeTab === 'news' ? 'Notícias' : activeTab === 'store' ? 'Loja' : 'Votação';

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-navy-900 text-white fixed h-full hidden md:flex flex-col z-20">
        <div className="p-6 border-b border-navy-800">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wider">ADSR <span className="text-gold-400">Admin</span></h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {([['matches', Trophy, 'Resultados'], ['news', Newspaper, 'Notícias'], ['store', ShoppingBag, 'Loja'], ['voting', Vote, 'Votação']] as const).map(([tab, Icon, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'bg-gold-400 text-navy-900' : 'hover:bg-navy-800 text-gray-300'}`}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-navy-800">
          <button onClick={onLogout} className="w-full flex items-center gap-2 text-red-400 hover:text-white transition-colors text-sm font-bold uppercase">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 flex-1 pb-20 md:pb-0 overflow-y-auto">

        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-10 bg-navy-900 text-white flex items-center justify-between px-4 py-3 shadow-lg">
          <span className="font-display font-bold text-lg uppercase tracking-wider">ADSR <span className="text-gold-400">Admin</span></span>
          <button onClick={onLogout} className="flex items-center gap-1.5 text-red-400 text-xs font-bold uppercase">
            <LogOut size={14} /> Sair
          </button>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-6 mb-2">
          <h1 className="text-2xl font-bold text-navy-900 uppercase">Gestão de {tabLabel}</h1>
        </header>

        {/* Mobile tab title */}
        <div className="md:hidden px-4 pt-4 pb-1">
          <h1 className="text-lg font-bold text-navy-900 uppercase">{tabLabel}</h1>
        </div>

        <div className="px-4 md:px-8 pb-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

            {/* Matches Editor */}
            {activeTab === 'matches' && (
              <div className="p-4 md:p-6 space-y-4">
                <p className="text-gray-500 text-sm">Edite os resultados dos jogos recentes. As alterações são automáticas.</p>
                {matches.map((match) => (
                  <div key={match.id} className="border border-gray-100 rounded-lg p-4 space-y-3 bg-gray-50">
                    {/* Row 1: Category + Status */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Categoria</span>
                        <input
                          type="text"
                          value={match.category}
                          onChange={(e) => updateMatch(match.id, { category: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded px-2 py-1.5 text-sm font-bold text-navy-900 focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div className="shrink-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Estado</span>
                        <select
                          value={match.status}
                          onChange={(e) => updateMatch(match.id, { status: e.target.value as any })}
                          className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-bold uppercase focus:outline-none focus:border-gold-400"
                        >
                          <option value="Finalizado">Finalizado</option>
                          <option value="Em Breve">Em Breve</option>
                          <option value="Ao Vivo">Ao Vivo</option>
                        </select>
                      </div>
                    </div>
                    {/* Row 2: Teams + Score */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={match.homeTeam}
                        onChange={(e) => updateMatch(match.id, { homeTeam: e.target.value })}
                        className="flex-1 min-w-0 text-right bg-white border border-gray-200 rounded px-2 py-1.5 text-sm font-bold text-navy-900 focus:outline-none focus:border-gold-400"
                      />
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm shrink-0">
                        <input
                          type="number"
                          value={match.homeScore}
                          onChange={(e) => updateMatch(match.id, { homeScore: parseInt(e.target.value) })}
                          className="w-9 text-center font-display font-bold text-xl outline-none"
                        />
                        <span className="font-bold text-gray-400">-</span>
                        <input
                          type="number"
                          value={match.awayScore}
                          onChange={(e) => updateMatch(match.id, { awayScore: parseInt(e.target.value) })}
                          className="w-9 text-center font-display font-bold text-xl outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        value={match.awayTeam}
                        onChange={(e) => updateMatch(match.id, { awayTeam: e.target.value })}
                        className="flex-1 min-w-0 text-left bg-white border border-gray-200 rounded px-2 py-1.5 text-sm font-bold text-navy-900 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* News Editor */}
            {activeTab === 'news' && (
              <div className="p-4 md:p-6">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => addNews({
                      title: 'Nova Notícia',
                      category: 'GERAL',
                      date: new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' }),
                      excerpt: 'Escreva aqui o resumo da notícia...',
                      imageUrl: 'https://picsum.photos/800/600?random=' + Date.now()
                    })}
                    className="bg-navy-900 hover:bg-navy-800 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold uppercase transition-colors"
                  >
                    <Plus size={16} /> Adicionar Notícia
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {news.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                      <div className="w-full sm:w-40 h-28 bg-gray-200 rounded overflow-hidden shrink-0 relative group">
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-white text-xs font-bold">Mudar Imagem</span>
                        </div>
                      </div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-wrap gap-2">
                          <input
                            type="text"
                            value={item.category}
                            onChange={(e) => updateNews(item.id, { category: e.target.value })}
                            className="bg-navy-900 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider w-28 text-center"
                          />
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => updateNews(item.id, { date: e.target.value })}
                            className="text-gray-400 text-xs font-bold bg-transparent border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-gold-400 min-w-0"
                          />
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateNews(item.id, { title: e.target.value })}
                          className="w-full font-display font-bold text-base text-navy-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gold-400 outline-none"
                        />
                        <textarea
                          value={item.excerpt}
                          onChange={(e) => updateNews(item.id, { excerpt: e.target.value })}
                          rows={2}
                          className="w-full text-sm text-gray-500 bg-transparent border border-transparent hover:border-gray-200 rounded p-1 focus:border-gold-400 outline-none resize-none"
                        />
                      </div>
                      <div className="flex sm:items-start justify-end sm:justify-start">
                        <button
                          onClick={() => deleteNews(item.id)}
                          className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition-colors"
                          title="Apagar Notícia"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Store Editor */}
            {activeTab === 'store' && (
              <div className="p-4 md:p-6">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => addProduct({
                      name: 'Novo Produto',
                      category: 'OFICIAL',
                      price: '0€',
                      imageUrl: 'https://picsum.photos/500/500?random=' + Date.now(),
                      isNew: true,
                      sizes: ['S', 'M', 'L']
                    })}
                    className="bg-navy-900 hover:bg-navy-800 text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold uppercase transition-colors"
                  >
                    <Plus size={16} /> Adicionar Produto
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 relative group hover:shadow-lg transition-shadow">
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="absolute top-2 right-2 z-10 text-red-400 hover:text-red-600 bg-white rounded-full p-1 shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="h-32 md:h-40 bg-gray-50 rounded mb-3 flex items-center justify-center overflow-hidden">
                        <img src={product.imageUrl} className="h-full object-contain" alt="" />
                      </div>
                      <div className="space-y-2">
                        <select
                          value={product.category}
                          onChange={(e) => updateProduct(product.id, { category: e.target.value as any })}
                          className="w-full text-[10px] font-bold text-gray-400 uppercase bg-gray-50 border-none rounded"
                        >
                          <option value="OFICIAL">OFICIAL</option>
                          <option value="TREINO">TREINO</option>
                          <option value="CASUAL">CASUAL</option>
                          <option value="ACESSÓRIOS">ACESSÓRIOS</option>
                        </select>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                          className="w-full font-bold text-navy-900 text-sm border-b border-transparent hover:border-gray-300 focus:border-gold-400 outline-none"
                        />
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={product.price}
                            onChange={(e) => updateProduct(product.id, { price: e.target.value + '€' })}
                            className="w-16 font-bold text-lg text-navy-900 border-b border-transparent hover:border-gray-300 focus:border-gold-400 outline-none"
                          />
                          <span className="font-bold">€</span>
                        </div>
                        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={product.isNew}
                            onChange={(e) => updateProduct(product.id, { isNew: e.target.checked })}
                            className="rounded text-navy-900 focus:ring-gold-400"
                          />
                          Marcar como Novo
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Voting Manager */}
            {activeTab === 'voting' && (
              <div className="p-4 md:p-6 space-y-4">
                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-2xl font-bold text-navy-900">{totalVotes}</span>
                  <span className="text-gray-500 text-sm">votos • Época {SEASON}</span>
                  <button
                    onClick={fetchVoteResults}
                    disabled={votesLoading}
                    className="text-gray-400 hover:text-navy-900 transition-colors"
                    title="Atualizar"
                  >
                    <RefreshCw size={16} className={votesLoading ? 'animate-spin' : ''} />
                  </button>
                </div>

                {/* Reset controls — stacked on mobile */}
                <div className="flex flex-col gap-2">
                  {showSecretInput && (
                    <input
                      type="password"
                      value={resetSecret}
                      onChange={e => setResetSecret(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleResetVotes()}
                      placeholder="Código de segurança"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400"
                    />
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetVotes}
                      disabled={resetting}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-colors"
                    >
                      <Trash2 size={15} />
                      {resetting ? 'A apagar...' : showSecretInput ? 'Confirmar reset' : 'Resetar votos'}
                    </button>
                    {showSecretInput && (
                      <button
                        onClick={() => { setShowSecretInput(false); setResetSecret(''); }}
                        className="px-4 py-2.5 text-gray-400 hover:text-gray-600 text-sm border border-gray-200 rounded-lg"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>

                {resetDone && (
                  <div className="flex items-start gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm font-medium">
                    ✓ {deletedCount} voto{deletedCount !== 1 ? 's' : ''} apagado{deletedCount !== 1 ? 's' : ''} com sucesso!
                  </div>
                )}

                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg px-3 py-3 text-xs">
                  <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                  <span>
                    Após o reset, os utilizadores podem votar novamente <strong>sem qualquer ação da parte deles</strong> — basta recarregarem a página.
                  </span>
                </div>

                {/* Results table — scrollable on mobile */}
                {votesLoading ? (
                  <p className="text-gray-400 text-sm text-center py-8">A carregar resultados...</p>
                ) : voteResults.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">Sem votos registados.</p>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm min-w-[280px]">
                      <thead className="bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <tr>
                          <th className="px-4 py-3 text-left">#</th>
                          <th className="px-4 py-3 text-left">Jogador</th>
                          <th className="px-4 py-3 text-right">Votos</th>
                          <th className="px-4 py-3 text-right">%</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {voteResults.map((r, i) => (
                          <tr key={r.name} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-gray-400 font-bold">{i + 1}</td>
                            <td className="px-4 py-3 font-bold text-navy-900">{r.name}</td>
                            <td className="px-4 py-3 text-right font-bold">{r.votes}</td>
                            <td className="px-4 py-3 text-right text-gray-400">
                              {totalVotes > 0 ? ((r.votes / totalVotes) * 100).toFixed(1) : 0}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-navy-900 border-t border-navy-800 flex items-stretch h-16 safe-area-bottom">
        {([['matches', Trophy, 'Resultados'], ['news', Newspaper, 'Notícias'], ['store', ShoppingBag, 'Loja'], ['voting', Vote, 'Votação']] as const).map(([tab, Icon, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'text-gold-400' : 'text-gray-500'}`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>

    </div>
  );
};
