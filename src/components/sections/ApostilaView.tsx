import React, { useState } from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { TECHLAB_DATA } from '../../data/techlabData';
import { 
  BookOpen, CheckCircle2, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Check, HelpCircle, Layers, GitBranch, Repeat, Grid, BarChart3, Zap
} from 'lucide-react';
import { PythonRunner } from '../simulators/PythonRunner';
import { SimuladorCondicional } from '../simulators/SimuladorCondicional';
import { SimuladorRange } from '../simulators/SimuladorRange';
import { SimuladorMatriz } from '../simulators/SimuladorMatriz';
import { SimuladorBubbleSort } from '../simulators/SimuladorBubbleSort';
import { DesafioRelampago } from '../simulators/DesafioRelampago';

export const ApostilaView: React.FC = () => {
  const { activeLessonId, setActiveLessonId, completedLessons, toggleLessonCompleted } = useTechLab();
  const [activeTab, setActiveTab] = useState<'aula' | 'simuladores' | 'desafio'>('aula');
  const [selectedExOption, setSelectedExOption] = useState<number | null>(null);
  const [showExResult, setShowExResult] = useState(false);

  const aulas = TECHLAB_DATA.apostila.aulas;
  const unidades = TECHLAB_DATA.apostila.unidades;

  const currentLesson = aulas.find(a => a.id === activeLessonId) || aulas[0];
  const currentUnidade = unidades.find(u => u.id === currentLesson.unidadeId);

  const currentIndex = aulas.findIndex(a => a.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? aulas[currentIndex - 1] : null;
  const nextLesson = currentIndex < aulas.length - 1 ? aulas[currentIndex + 1] : null;

  const isCompleted = completedLessons.includes(currentLesson.id);

  const handleLessonChange = (id: string) => {
    setActiveLessonId(id);
    setSelectedExOption(null);
    setShowExResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExerciseOption = (idx: number) => {
    setSelectedExOption(idx);
    setShowExResult(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
      {/* Sidebar: Navigation across 4 Units & 13 Lessons */}
      <aside className="lg:col-span-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Sumário do Curso</span>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {completedLessons.length}/{aulas.length} concluídas
            </span>
          </div>

          <div className="mt-3 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            {unidades.map(unidade => {
              const unitAulas = aulas.filter(a => a.unidadeId === unidade.id);
              const unitCompleted = unitAulas.filter(a => completedLessons.includes(a.id)).length;

              return (
                <div key={unidade.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
                    <span>Unidade {unidade.numero}: {unidade.titulo}</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {unitCompleted}/{unitAulas.length}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {unitAulas.map(aula => {
                      const active = aula.id === currentLesson.id;
                      const done = completedLessons.includes(aula.id);

                      return (
                        <button
                          key={aula.id}
                          onClick={() => handleLessonChange(aula.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-xs font-medium transition-all ${
                            active
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 font-semibold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="font-mono text-slate-400 w-4 shrink-0">
                              {aula.numero}.
                            </span>
                            <span className="truncate">{aula.titulo}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <span className="text-[10px] text-slate-400">{aula.tempo}</span>
                            {done ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:col-span-8 space-y-6">
        {/* Top Lesson Header Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Unidade 0{currentUnidade?.numero}
              </span>
              <span>·</span>
              <span>{currentUnidade?.titulo}</span>
              <span>·</span>
              <span>{currentLesson.tempo}</span>
            </div>

            <button
              onClick={() => toggleLessonCompleted(currentLesson.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isCompleted
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isCompleted ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{isCompleted ? 'Concluída' : 'Marcar como Concluída'}</span>
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Aula {currentLesson.numero}: {currentLesson.titulo}
          </h1>

          {/* Subtabs: Aula Teórica vs Simuladores vs Desafio Relâmpago */}
          <div className="flex items-center gap-1 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('aula')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'aula'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Teoria & Código
            </button>
            <button
              onClick={() => setActiveTab('simuladores')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'simuladores'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Simuladores Interativos
            </button>
            <button
              onClick={() => setActiveTab('desafio')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'desafio'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Desafio 60s</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Aula Teórica & Código Executável */}
        {activeTab === 'aula' && (
          <div className="space-y-6">
            {/* Theory Text */}
            <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 prose prose-slate dark:prose-invert max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: currentLesson.teoria }} 
                className="space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-slate-900 [&_strong]:dark:text-white"
              />
            </article>

            {/* Python Interactive Runner */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Código Exemplo & Executor Interativo</span>
                <span className="text-indigo-500 font-mono text-[11px]">Você pode editar o código antes de rodar!</span>
              </div>
              <PythonRunner initialCode={currentLesson.exemploPython} />
            </div>

            {/* Code Explanation */}
            {currentLesson.explicacaoCodigo && (
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Análise Linha a Linha:</span>
                {currentLesson.explicacaoCodigo}
              </div>
            )}

            {/* Mini-Exercício Interativo */}
            {currentLesson.miniExercicio && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Fixação: Mini-Exercício da Aula</span>
                </div>

                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {currentLesson.miniExercicio.pergunta}
                </h4>

                <div className="space-y-2">
                  {currentLesson.miniExercicio.opcoes.map((opcao, idx) => {
                    const isSelected = selectedExOption === idx;
                    const isCorrect = idx === currentLesson.miniExercicio?.respostaCorreta;

                    let btnClass = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400';
                    if (showExResult) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                      } else if (isSelected) {
                        btnClass = 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleExerciseOption(idx)}
                        disabled={showExResult}
                        className={`w-full p-3 rounded-lg border text-left text-xs font-medium transition-all flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opcao}</span>
                        {showExResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>

                {showExResult && (
                  <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200">
                    <strong className="block mb-0.5">Explicação Detalhada:</strong>
                    {currentLesson.miniExercicio.explicacao}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Simuladores Interativos */}
        {activeTab === 'simuladores' && (
          <div className="space-y-6">
            <SimuladorCondicional />
            <SimuladorRange />
            <SimuladorMatriz />
            <SimuladorBubbleSort />
          </div>
        )}

        {/* Tab 3: Desafio Relâmpago */}
        {activeTab === 'desafio' && (
          <div>
            <DesafioRelampago />
          </div>
        )}

        {/* Bottom Navigation (Prev / Next Lesson) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          {prevLesson ? (
            <button
              onClick={() => handleLessonChange(prevLesson.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Aula Anterior: Aula {prevLesson.numero}</span>
            </button>
          ) : (
            <div />
          )}

          {nextLesson && (
            <button
              onClick={() => handleLessonChange(nextLesson.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors shadow-xs"
            >
              <span>Próxima: Aula {nextLesson.numero}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
