import React from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { TECHLAB_DATA } from '../../data/techlabData';
import { 
  BookOpen, Cpu, Code2, Database, Library, Layers, 
  HelpCircle, Map, FileCode, ArrowRight, CheckCircle2, Play, Flame, Trophy, Sparkles
} from 'lucide-react';
import { NavSection } from '../../types';

export const InicioView: React.FC = () => {
  const { 
    completedLessons, 
    overallProgressPct, 
    setCurrentSection, 
    navigateToLesson, 
    activeLessonId,
    notes 
  } = useTechLab();

  // Find the first uncompleted lesson or current active lesson
  const currentLesson = TECHLAB_DATA.apostila.aulas.find(a => a.id === activeLessonId) || TECHLAB_DATA.apostila.aulas[0];

  const quickModules: {
    id: NavSection;
    title: string;
    description: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
  }[] = [
    {
      id: 'apostila',
      title: 'Apostila de Lógica & Python',
      description: '13 aulas interativas com teoria, execução em tempo real e simuladores de laços e vetores.',
      badge: `${completedLessons.length}/13 Aulas`,
      icon: BookOpen,
      accent: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      id: 'hardware3d',
      title: 'Estação 3D de Hardware & PC',
      description: 'PC gamer desmontável em 3D. Explore Motherboard, CPU, GPU, NVMe, visão explodida e guia de montagem.',
      badge: 'Visualizador 3D',
      icon: Cpu,
      accent: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60',
    },
    {
      id: 'laboratorio',
      title: 'Laboratório de Dados & Estatística',
      description: 'Upload de CSV, matriz de correlação Pearson, detecção de outliers e limpeza com 1 clique.',
      badge: 'Workbench Interativo',
      icon: Database,
      accent: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      id: 'linguagens',
      title: 'Galeria & Comparador de Linguagens',
      description: '26 linguagens catalogadas, comparador lado a lado e assistente de recomendação de carreira.',
      badge: '26 Linguagens',
      icon: Code2,
      accent: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60',
    },
    {
      id: 'pratica',
      title: 'Prática: Flashcards 3D & Simulados',
      description: 'Memorização ativa com repetição espaçada em 3D e testes práticos com gabarito explicado.',
      badge: 'Treino Ativo',
      icon: Layers,
      accent: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60',
    },
    {
      id: 'referencia',
      title: 'Consulta: Conceitos & Cheat Sheets',
      description: '64 termos essenciais com analogias do mundo real e comandos copiáveis para terminal (Git, Docker, SQL).',
      badge: '64 Conceitos + Sheets',
      icon: Library,
      accent: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60',
    },
    {
      id: 'carreira',
      title: 'Carreira: Roadmaps & Guias Práticos',
      description: 'Trilhas de Júnior a Sênior com salários médios e tutoriais passo a passo (sites, bots, redes).',
      badge: '5 Carreiras + 8 Guias',
      icon: Map,
      accent: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero / Continue Learning Banner */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Plataforma Integrada de Estudo Tech</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span>Versão 2.5</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Aprenda Programação, Hardware e Dados com Prática Interativa
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Do pensamento computacional com Python ao laboratório de análise de dados, visualizador 3D de hardware e roadmaps estruturados.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateToLesson(currentLesson.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-xs"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Continuar Aula {currentLesson.numero}: {currentLesson.titulo}</span>
              </button>

              <button
                onClick={() => setCurrentSection('hardware3d')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm transition-colors"
              >
                <Cpu className="w-4 h-4" />
                <span>Explorar Hardware 3D</span>
              </button>
            </div>
          </div>

          {/* Quick Hub Card */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700/60 pb-2.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Acesso Rápido aos Ambientes</span>
            </div>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => setCurrentSection('hardware3d')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-left transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">Simulador de Hardware 3D</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setCurrentSection('laboratorio')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-left transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">Data Lab & Gráficos</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setCurrentSection('linguagens')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-left transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-violet-500" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">Comparador de 26 Linguagens</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setCurrentSection('pratica')}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-left transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-rose-500" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">Flashcards & Simulados</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Unidades da Apostila Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Unidades Didáticas: Lógica de Programação
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              4 unidades estruturadas com teoria, testes ao vivo e simuladores interativos.
            </p>
          </div>
          <button
            onClick={() => setCurrentSection('apostila')}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Ver Apostila Completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECHLAB_DATA.apostila.unidades.map(unidade => {
            return (
              <div
                key={unidade.id}
                onClick={() => {
                  navigateToLesson(unidade.aulasIds[0]);
                }}
                className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all shadow-2xs hover:shadow-sm"
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Unidade 0{unidade.numero}
                  </span>
                  <span className="font-mono text-slate-400 text-xs">
                    {unidade.aulasIds.length} aulas
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 mb-1">
                  {unidade.titulo}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {unidade.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* All Platform Modules Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Módulos & Laboratórios Interativos
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ferramentas práticas desenvolvidas para acelerar o aprendizado com visualizações ativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickModules.map(mod => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => {
                  setCurrentSection(mod.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-400 dark:hover:border-indigo-500/80 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${mod.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-end text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <span className="flex items-center gap-1">
                    Acessar módulo <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
