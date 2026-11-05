import React, { useState } from 'react';
import { Map, Wrench } from 'lucide-react';
import { RoadmapsView } from './RoadmapsView';
import { GuiasView } from './GuiasView';

interface CarreiraViewProps {
  initialTab?: 'roadmaps' | 'guias';
}

export const CarreiraView: React.FC<CarreiraViewProps> = ({ initialTab = 'roadmaps' }) => {
  const [activeTab, setActiveTab] = useState<'roadmaps' | 'guias'>(initialTab);

  return (
    <div className="space-y-6 pb-12">
      {/* Topic Switcher Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-0.5">
            Evolução Profissional & Prática
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Carreira: Roadmaps & Guias de Execução
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Trilhas de Júnior a Sênior com salários médios e tutoriais passo a passo para colocar em prática.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('roadmaps')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'roadmaps'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Roadmaps de Carreira</span>
          </button>

          <button
            onClick={() => setActiveTab('guias')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'guias'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Guias Práticos Passo a Passo</span>
          </button>
        </div>
      </div>

      {/* Render Active View */}
      {activeTab === 'roadmaps' ? <RoadmapsView /> : <GuiasView />}
    </div>
  );
};
