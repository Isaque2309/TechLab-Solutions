import React, { useState, useEffect, useRef } from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { TECHLAB_DATA } from '../../data/techlabData';
import { Search, X, BookOpen, Code2, Library, FileCode, Map, ArrowRight } from 'lucide-react';
import { NavSection } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setCurrentSection, setActiveLessonId } = useTechLab();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const normalizedQuery = query.trim().toLowerCase();

  // Search in Aulas
  const matchedAulas = normalizedQuery
    ? TECHLAB_DATA.apostila.aulas.filter(
        a =>
          a.titulo.toLowerCase().includes(normalizedQuery) ||
          a.exemploPython.toLowerCase().includes(normalizedQuery)
      ).slice(0, 4)
    : [];

  // Search in Linguagens
  const matchedLangs = normalizedQuery
    ? TECHLAB_DATA.linguagens.filter(
        l =>
          l.nome.toLowerCase().includes(normalizedQuery) ||
          l.descricao.toLowerCase().includes(normalizedQuery) ||
          l.criador.toLowerCase().includes(normalizedQuery)
      ).slice(0, 4)
    : [];

  // Search in Conceitos
  const matchedConceitos = normalizedQuery
    ? TECHLAB_DATA.conceitos.filter(
        c =>
          c.termo.toLowerCase().includes(normalizedQuery) ||
          c.definicao.toLowerCase().includes(normalizedQuery) ||
          c.trilha.toLowerCase().includes(normalizedQuery)
      ).slice(0, 4)
    : [];

  // Search in Cheatsheets
  const matchedCheatsheets = normalizedQuery
    ? TECHLAB_DATA.cheatsheets.filter(
        cs =>
          cs.titulo.toLowerCase().includes(normalizedQuery) ||
          cs.categoria.toLowerCase().includes(normalizedQuery)
      ).slice(0, 3)
    : [];

  // Search in Roadmaps
  const matchedRoadmaps = normalizedQuery
    ? TECHLAB_DATA.roadmaps.filter(
        r =>
          r.titulo.toLowerCase().includes(normalizedQuery) ||
          r.descricao.toLowerCase().includes(normalizedQuery)
      ).slice(0, 3)
    : [];

  const totalMatches =
    matchedAulas.length +
    matchedLangs.length +
    matchedConceitos.length +
    matchedCheatsheets.length +
    matchedRoadmaps.length;

  const handleSelect = (section: NavSection, payload?: string) => {
    setCurrentSection(section);
    if (section === 'apostila' && payload) {
      setActiveLessonId(payload);
    }
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/80 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl bg-[#040e2b]/95 border border-blue-500/35 rounded-xl shadow-[0_0_40px_rgba(37,99,235,0.25)] overflow-hidden animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header / Input */}
        <div className="flex items-center px-4 border-b border-blue-500/25">
          <Search className="w-5 h-5 text-blue-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por aulas, linguagens, conceitos, comandos..."
            className="w-full py-4 bg-transparent text-white placeholder-blue-300/50 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-blue-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-xs font-mono text-blue-300 hover:text-white px-2 py-1 rounded border border-blue-500/40 bg-blue-950/60"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
              Digite palavras-chave como <span className="text-indigo-500 font-mono">Python</span>,{' '}
              <span className="text-indigo-500 font-mono">Bubble Sort</span>,{' '}
              <span className="text-indigo-500 font-mono">Docker</span> ou{' '}
              <span className="text-indigo-500 font-mono">API REST</span>.
            </div>
          )}

          {query && totalMatches === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
              Nenhum resultado encontrado para &quot;{query}&quot;.
            </div>
          )}

          {/* Matched Aulas */}
          {matchedAulas.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Apostila & Aulas ({matchedAulas.length})
              </div>
              <div className="space-y-1">
                {matchedAulas.map(aula => (
                  <button
                    key={aula.id}
                    onClick={() => handleSelect('apostila', aula.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        Aula {aula.numero}: {aula.titulo}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Tempo estimado: {aula.tempo}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Languages */}
          {matchedLangs.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> Linguagens de Programação ({matchedLangs.length})
              </div>
              <div className="space-y-1">
                {matchedLangs.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => handleSelect('linguagens')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span>{lang.nome}</span>
                        <span className="text-xs font-mono text-slate-400">{lang.ano} · {lang.criador}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {lang.utilizacaoPrincipal}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Conceitos */}
          {matchedConceitos.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Library className="w-3.5 h-3.5" /> Conceitos & Glossário ({matchedConceitos.length})
              </div>
              <div className="space-y-1">
                {matchedConceitos.map(c => (
                  <button
                    key={c.termo}
                    onClick={() => handleSelect('conceitos')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {c.termo}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {c.definicao}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Cheatsheets */}
          {matchedCheatsheets.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5" /> Cheatsheets & Comandos ({matchedCheatsheets.length})
              </div>
              <div className="space-y-1">
                {matchedCheatsheets.map(cs => (
                  <button
                    key={cs.id}
                    onClick={() => handleSelect('cheatsheets')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {cs.titulo} · <span className="text-xs text-slate-400">{cs.categoria}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Roadmaps */}
          {matchedRoadmaps.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Map className="w-3.5 h-3.5" /> Roadmaps de Carreira ({matchedRoadmaps.length})
              </div>
              <div className="space-y-1">
                {matchedRoadmaps.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect('roadmaps')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {r.titulo}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        Média salarial: {r.salarioMedio}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Pressione <strong>ESC</strong> para fechar</span>
          <span>Navegue pelas seções com 1 clique</span>
        </div>
      </div>
    </div>
  );
};
