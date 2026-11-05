import React, { useState } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { Roadmap } from '../../types';
import { Map, CheckCircle2, Award, Clock, ArrowRight, DollarSign } from 'lucide-react';

export const RoadmapsView: React.FC = () => {
  const roadmaps = TECHLAB_DATA.roadmaps as Roadmap[];
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap>(roadmaps[0]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 mb-1">
            <Map className="w-4 h-4" />
            <span>Planejamento de Carreira & Competências de Mercado</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Roadmaps de Carreira em Tecnologia
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Fases progressivas de Júnior a Sênior com competências indispensáveis, projetos para portfólio e certificações de peso.
          </p>
        </div>
      </div>

      {/* Career Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {roadmaps.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedRoadmap(r)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
              selectedRoadmap.id === r.id
                ? 'bg-teal-600 text-white border-teal-600 font-semibold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <span>{r.icone || '🚀'}</span>
            <span>{r.titulo}</span>
          </button>
        ))}
      </div>

      {/* Selected Roadmap Details */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 block mb-1">
              Trilha Profissional Selecionada
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{selectedRoadmap.icone}</span>
              <span>{selectedRoadmap.titulo}</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {selectedRoadmap.descricao}
            </p>
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 p-3 rounded-xl text-xs font-mono">
            <span className="text-teal-800 dark:text-teal-300 block text-[10px] font-sans">Média Salarial de Mercado:</span>
            <strong className="text-teal-600 dark:text-teal-400 text-sm">{selectedRoadmap.salarioMedio}</strong>
          </div>
        </div>

        {/* Phases Timeline */}
        <div className="space-y-6">
          {selectedRoadmap.fases.map((fase, idx) => (
            <div
              key={idx}
              className="relative p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {fase.nivel}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <Clock className="w-3.5 h-3.5 text-teal-500" />
                  <span>Duração estimada: {fase.tempo}</span>
                </div>
              </div>

              {/* Competencies */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Competências Indispensáveis:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {fase.competencias.map((comp, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                    🎯 Projeto Recomendado para Portfólio:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {fase.projetos}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                  <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Certificação Recomendada:</span>
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {fase.certificacoes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
