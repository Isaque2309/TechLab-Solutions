import React, { useState } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { Cheatsheet } from '../../types';
import { FileCode, Search, Copy, Check, Terminal } from 'lucide-react';

export const CheatsheetsView: React.FC = () => {
  const cheatsheets = TECHLAB_DATA.cheatsheets as Cheatsheet[];
  const [selectedSheetId, setSelectedSheetId] = useState<string>(cheatsheets[0]?.id || 'git');
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const selectedSheet = cheatsheets.find(s => s.id === selectedSheetId) || cheatsheets[0];

  const filteredSnippets = selectedSheet.snippets.filter(s =>
    s.titulo.toLowerCase().includes(search.toLowerCase()) ||
    s.codigo.toLowerCase().includes(search.toLowerCase()) ||
    s.explicacao.toLowerCase().includes(search.toLowerCase())
  );

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">
            <FileCode className="w-4 h-4" />
            <span>Guias Rápidos & Comandos Copiáveis</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Cheat Sheets Técnicas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Comandos essenciais para o dia a dia de Git, Docker, SQL, Linux, Python e Expressões Regulares com explicações práticas.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filtrar comandos..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Cheatsheet Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {cheatsheets.map(sheet => (
          <button
            key={sheet.id}
            onClick={() => {
              setSelectedSheetId(sheet.id);
              setSearch('');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
              selectedSheetId === sheet.id
                ? 'bg-orange-600 text-white border-orange-600 font-semibold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <span>{sheet.icone || '⚡'}</span>
            <span>{sheet.titulo}</span>
          </button>
        ))}
      </div>

      {/* Snippets List */}
      <div className="space-y-4">
        {filteredSnippets.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Nenhum comando encontrado para &quot;{search}&quot;.
          </div>
        ) : (
          filteredSnippets.map((snippet, idx) => {
            const isCopied = copiedIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs"
              >
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-orange-500" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {snippet.titulo}
                    </h3>
                  </div>

                  <button
                    onClick={() => copyCode(snippet.codigo, idx)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-950 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                  <pre>{snippet.codigo}</pre>
                </div>

                <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  💡 {snippet.explicacao}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
