import React, { useState } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { Guia } from '../../types';
import { Wrench, Clock, CheckCircle2, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';

export const GuiasView: React.FC = () => {
  const guias = TECHLAB_DATA.guias as Guia[];
  const [selectedGuiaId, setSelectedGuiaId] = useState<string>(guias[0]?.id || 'guia-pc');

  const selectedGuia = guias.find(g => g.id === selectedGuiaId) || guias[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <Wrench className="w-4 h-4" />
            <span>Manuais Práticos Passo a Passo</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Guias Práticos de Tecnologia
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Tutoriais aprofundados com checklists, boas práticas e armadilhas comuns para quem quer construir na prática.
          </p>
        </div>
      </div>

      {/* Guides Grid / Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {guias.map(guia => {
          const isSelected = selectedGuia.id === guia.id;
          return (
            <div
              key={guia.id}
              onClick={() => setSelectedGuiaId(guia.id)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-500 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-xl">{guia.icone || '🛠️'}</span>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{guia.duracao.split(' ')[0]} min</span>
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">
                {guia.titulo}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {guia.subtitulo}
              </p>
            </div>
          );
        })}
      </div>

      {/* Guide Content */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
            {selectedGuia.categoria} · {selectedGuia.duracao}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {selectedGuia.titulo}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {selectedGuia.subtitulo}
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-6">
          {selectedGuia.passos.map(passo => (
            <div
              key={passo.numero}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  {passo.numero}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {passo.titulo}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {passo.conteudo}
              </p>

              {passo.dica && (
                <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 font-medium">
                  💡 {passo.dica}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
