'use client';


import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Settings, Newspaper, ShoppingBag, Trophy, Save, Trash2, Plus, LogOut } from 'lucide-react';
import { MatchResult, NewsItem, Product } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { matches, news, products, updateMatch, updateNews, addNews, deleteNews, updateProduct, addProduct, deleteProduct } = useData();
  const [activeTab, setActiveTab] = useState<'matches' | 'news' | 'store'>('matches');
  
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
              <div className="w-16 h-16 bg-navy-900 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
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
                   className="w-full bg-gray-100 border border-gray-200 p-3 rounded focus:outline-none focus:border-yellow-400 transition-colors"
                   placeholder="Introduza a senha..."
                 />
              </div>
              <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-bold py-3 rounded uppercase tracking-widest text-sm transition-colors">
                 Entrar
              </button>
           </form>
           <button onClick={onLogout} className="w-full mt-4 text-gray-400 text-xs hover:text-navy-900 underline">Voltar ao Site</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
       {/* Sidebar */}
       <aside className="w-64 bg-navy-900 text-white fixed h-full hidden md:flex flex-col">
          <div className="p-6 border-b border-navy-800">
             <h2 className="font-display font-bold text-2xl uppercase tracking-wider">ADSR <span className="text-yellow-400">Admin</span></h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
             <button 
                onClick={() => setActiveTab('matches')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === 'matches' ? 'bg-yellow-400 text-navy-900' : 'hover:bg-navy-800 text-gray-300'}`}
             >
                <Trophy size={18} /> Resultados
             </button>
             <button 
                onClick={() => setActiveTab('news')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === 'news' ? 'bg-yellow-400 text-navy-900' : 'hover:bg-navy-800 text-gray-300'}`}
             >
                <Newspaper size={18} /> Notícias
             </button>
             <button 
                onClick={() => setActiveTab('store')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === 'store' ? 'bg-yellow-400 text-navy-900' : 'hover:bg-navy-800 text-gray-300'}`}
             >
                <ShoppingBag size={18} /> Loja
             </button>
          </nav>
          <div className="p-4 border-t border-navy-800">
             <button onClick={onLogout} className="w-full flex items-center gap-2 text-red-400 hover:text-white transition-colors text-sm font-bold uppercase">
                <LogOut size={16} /> Sair
             </button>
          </div>
       </aside>

       {/* Main Content */}
       <main className="md:ml-64 flex-1 p-8 overflow-y-auto">
          <header className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold text-navy-900 uppercase">
                Gestão de {activeTab === 'matches' ? 'Resultados' : activeTab === 'news' ? 'Notícias' : 'Loja'}
             </h1>
             <div className="md:hidden">
                <button onClick={onLogout} className="text-red-500 font-bold text-sm">Sair</button>
             </div>
          </header>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
             
             {/* Matches Editor */}
             {activeTab === 'matches' && (
                <div className="p-6 space-y-6">
                   <p className="text-gray-500 text-sm mb-4">Edite os resultados dos jogos recentes. As alterações são automáticas.</p>
                   {matches.map((match) => (
                      <div key={match.id} className="border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 bg-gray-50">
                         <div className="w-full md:w-1/4">
                            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Categoria</span>
                            <input 
                              type="text" 
                              value={match.category}
                              onChange={(e) => updateMatch(match.id, { category: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm font-bold text-navy-900"
                            />
                         </div>
                         <div className="flex-1 flex items-center justify-between gap-4">
                            <div className="text-right flex-1">
                               <input 
                                 type="text" 
                                 value={match.homeTeam}
                                 onChange={(e) => updateMatch(match.id, { homeTeam: e.target.value })}
                                 className="w-full text-right bg-transparent border-b border-transparent hover:border-gray-300 focus:border-yellow-400 text-navy-900 font-bold outline-none"
                               />
                            </div>
                            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded shadow-sm">
                               <input 
                                 type="number" 
                                 value={match.homeScore}
                                 onChange={(e) => updateMatch(match.id, { homeScore: parseInt(e.target.value) })}
                                 className="w-10 text-center font-display font-bold text-xl outline-none"
                               />
                               <span>-</span>
                               <input 
                                 type="number" 
                                 value={match.awayScore}
                                 onChange={(e) => updateMatch(match.id, { awayScore: parseInt(e.target.value) })}
                                 className="w-10 text-center font-display font-bold text-xl outline-none"
                               />
                            </div>
                            <div className="text-left flex-1">
                               <input 
                                 type="text" 
                                 value={match.awayTeam}
                                 onChange={(e) => updateMatch(match.id, { awayTeam: e.target.value })}
                                 className="w-full text-left bg-transparent border-b border-transparent hover:border-gray-300 focus:border-yellow-400 text-navy-900 font-bold outline-none"
                               />
                            </div>
                         </div>
                         <div className="w-full md:w-auto">
                            <select 
                               value={match.status} 
                               onChange={(e) => updateMatch(match.id, { status: e.target.value as any })}
                               className="bg-white border border-gray-200 rounded px-2 py-1 text-xs font-bold uppercase"
                            >
                               <option value="Finalizado">Finalizado</option>
                               <option value="Em Breve">Em Breve</option>
                               <option value="Ao Vivo">Ao Vivo</option>
                            </select>
                         </div>
                      </div>
                   ))}
                </div>
             )}

             {/* News Editor */}
             {activeTab === 'news' && (
                <div className="p-6">
                   <div className="flex justify-end mb-6">
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
                   
                   <div className="grid grid-cols-1 gap-6">
                      {news.map((item) => (
                         <div key={item.id} className="flex flex-col md:flex-row gap-6 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gray-50">
                            <div className="w-full md:w-48 h-32 bg-gray-200 rounded overflow-hidden shrink-0 relative group">
                               <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-white text-xs font-bold">Mudar Imagem</span>
                               </div>
                            </div>
                            <div className="flex-1 space-y-3">
                               <div className="flex gap-4">
                                  <input 
                                    type="text" 
                                    value={item.category}
                                    onChange={(e) => updateNews(item.id, { category: e.target.value })}
                                    className="bg-navy-900 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider w-32 text-center"
                                  />
                                  <input 
                                    type="text" 
                                    value={item.date}
                                    onChange={(e) => updateNews(item.id, { date: e.target.value })}
                                    className="text-gray-400 text-xs font-bold bg-transparent border-b border-transparent hover:border-gray-300"
                                  />
                               </div>
                               <input 
                                 type="text" 
                                 value={item.title}
                                 onChange={(e) => updateNews(item.id, { title: e.target.value })}
                                 className="w-full font-display font-bold text-xl text-navy-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-yellow-400 outline-none"
                               />
                               <textarea 
                                 value={item.excerpt}
                                 onChange={(e) => updateNews(item.id, { excerpt: e.target.value })}
                                 rows={2}
                                 className="w-full text-sm text-gray-500 bg-transparent border border-transparent hover:border-gray-200 rounded p-1 focus:border-yellow-400 outline-none resize-none"
                               />
                            </div>
                            <div className="flex items-start">
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
                <div className="p-6">
                   <div className="flex justify-end mb-6">
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

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                         <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 relative group hover:shadow-lg transition-shadow">
                            <button 
                               onClick={() => deleteProduct(product.id)}
                               className="absolute top-2 right-2 z-10 text-red-400 hover:text-red-600 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                               <Trash2 size={16} />
                            </button>
                            
                            <div className="h-40 bg-gray-50 rounded mb-4 flex items-center justify-center overflow-hidden">
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
                                 className="w-full font-bold text-navy-900 text-sm border-b border-transparent hover:border-gray-300 focus:border-yellow-400 outline-none"
                               />
                               
                               <div className="flex items-center gap-1">
                                  <input 
                                    type="number" 
                                    value={product.price}
                                    onChange={(e) => updateProduct(product.id, { price: e.target.value + '€' })}
                                    className="w-20 font-bold text-lg text-navy-900 border-b border-transparent hover:border-gray-300 focus:border-yellow-400 outline-none"
                                  />
                                  <span className="font-bold">€</span>
                               </div>
                               
                               <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                                  <input 
                                    type="checkbox" 
                                    checked={product.isNew}
                                    onChange={(e) => updateProduct(product.id, { isNew: e.target.checked })}
                                    className="rounded text-navy-900 focus:ring-yellow-400"
                                  />
                                  Marcar como Novo
                               </label>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             )}

          </div>
       </main>
    </div>
  );
};
