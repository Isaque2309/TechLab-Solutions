import React, { useState } from 'react';
import { Layers, HelpCircle } from 'lucide-react';
import { FlashcardsView } from './FlashcardsView';
import { QuizView } from './QuizView';

interface PraticaViewProps {
  initialTab?: 'flashcards' | 'quiz';
}

export const PraticaView: React.FC<PraticaViewProps> = ({ initialTab = 'flashcards' }) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz'>(initialTab);

  return (
    <div className="space-y-6 pb-12">
      {/* Topic Switcher Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-0.5">
            Treino Ativo & Avaliação
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Prática: Flashcards 3D & Simulados
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Memorização ativa com repetição espaçada e testes práticos com gabarito explicado.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'flashcards'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards 3D</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'quiz'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Simulados & Quiz</span>
          </button>
        </div>
      </div>

      {/* Render Active View */}
      {activeTab === 'flashcards' ? <FlashcardsView /> : <QuizView />}
    </div>
  );
};
