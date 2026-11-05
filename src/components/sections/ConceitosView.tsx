import React, { useState } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { Conceito } from '../../types';
import { Library, Search, Filter, Copy, Check, ExternalLink, ChevronRight, BookOpen } from 'lucide-react';

export const ConceitosView: React.FC = () => {
  const conceitos = TECHLAB_DATA.conceitos as Conceito[];
  const [search, setSearch] = useState('');
  const [selectedTrilha, setSelectedTrilha] = useState<string>('todas');
  const [selectedLevel, setSelectedLevel] = useState<string>('todos');
  const [activeModalConceito, setActiveModalConceito] = useState<Conceito | null>(null);
  const [copied, setCopied] = useState(false);

  // Extract unique tracks
  const uniqueTrilhas = Array.from(new Set(conceitos.map(c => c.trilha)));

  const filteredConceitos = conceitos.filter(c => {
    const matchesSearch =
      c.termo.toLowerCase().includes(search.toLowerCase()) ||
      c.definicao.toLowerCase().includes(search.toLowerCase()) ||
      c.exemploReal.toLowerCase().includes(search.toLowerCase());

    const matchesTrilha = selectedTrilha === 'todas' || c.trilha === selectedTrilha;
    const matchesLevel = selectedLevel === 'todos' || c.nivel.toLowerCase() === selectedLevel.toLowerCase();

    return matchesSearch && matchesTrilha && matchesLevel;
  });

  const copySnippet = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
            <Library className="w-4 h-4" />
            <span>Glossário Técnico & Teoria Fundamental</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Biblioteca de 64 Conceitos de Tecnologia
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Termos essenciais de computação, arquitetura, redes, banco de dados e algoritmos explicados com exemplos reais.
          </p>
        </div>

        {/* Count badge */}
        <div className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
          {filteredConceitos.length} de {conceitos.length} conceitos
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Track selector */}
          <select
            value={selectedTrilha}
            onChange={e => setSelectedTrilha(e.target.value)}
            className="text-xs font-medium p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="todas">Todas as Trilhas</option>
            {uniqueTrilhas.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Level selector */}
          <select
            value={selectedLevel}
            onChange={e => setSelectedLevel(e.target.value)}
            className="text-xs font-medium p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="todos">Todos os Níveis</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediário">Intermediário</option>
            <option value="avançado">Avançado</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative min-w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por termo (ex: ACID, Docker, Big-O)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConceitos.map(c => {
          return (
            <div
              key={c.termo}
              onClick={() => setActiveModalConceito(c)}
              className="cursor-pointer group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-amber-400 dark:hover:border-amber-500/80 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    {c.trilha}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {c.nivel}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                  {c.termo}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-3">
                  {c.definicao}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                <span className="text-[11px] line-clamp-1 italic">
                  💡 {c.exemploReal}
                </span>
                <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Concept Deep Dive Modal */}
      {activeModalConceito && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  {activeModalConceito.trilha} · Nível {activeModalConceito.nivel}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeModalConceito.termo}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalConceito(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Definição Técnica:
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeModalConceito.definicao}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
                <strong className="block font-semibold mb-1">Analogia com o Mundo Real:</strong>
                {activeModalConceito.exemploReal}
              </div>

              {activeModalConceito.codigo && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Exemplo em Código</span>
                    <button
                      onClick={() => copySnippet(activeModalConceito.codigo)}
                      className="flex items-center gap-1 text-indigo-500 hover:text-indigo-400"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
                    {activeModalConceito.codigo}
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModalConceito(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
