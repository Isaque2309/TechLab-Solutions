import React, { useState } from 'react';
import { Library, FileCode } from 'lucide-react';
import { ConceitosView } from './ConceitosView';
import { CheatsheetsView } from './CheatsheetsView';

interface ReferenciaViewProps {
  initialTab?: 'conceitos' | 'cheatsheets';
}

export const ReferenciaView: React.FC<ReferenciaViewProps> = ({ initialTab = 'conceitos' }) => {
  const [activeTab, setActiveTab] = useState<'conceitos' | 'cheatsheets'>(initialTab);

  return (
    <div className="space-y-6 pb-12">
      {/* Topic Switcher Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-0.5">
            Consulta & Conhecimento Rápido
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Conceitos & Cheat Sheets
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Enciclopédia de 64 termos de tecnologia e tabela de comandos copiáveis para o terminal.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('conceitos')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'conceitos'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>Enciclopédia de Conceitos</span>
          </button>

          <button
            onClick={() => setActiveTab('cheatsheets')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'cheatsheets'
                ? 'bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Cheat Sheets de Comandos</span>
          </button>
        </div>
      </div>

      {/* Render Active View */}
      {activeTab === 'conceitos' ? <ConceitosView /> : <CheatsheetsView />}
    </div>
  );
};
