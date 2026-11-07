import React, { useState, useRef } from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { Apostila, ApostilaAula, ApostilaUnidade } from '../../types';
import { 
  BookOpen, CheckCircle2, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Check, HelpCircle, Layers, Plus, 
  Trash2, User, Clock, Award, X, Play, Code2, BookMarked,
  FileText, Upload, Download, ExternalLink, ChevronDown, ChevronUp
} from 'lucide-react';
import { PythonRunner } from '../simulators/PythonRunner';
import { SimuladorCondicional } from '../simulators/SimuladorCondicional';
import { SimuladorRange } from '../simulators/SimuladorRange';
import { SimuladorMatriz } from '../simulators/SimuladorMatriz';
import { SimuladorBubbleSort } from '../simulators/SimuladorBubbleSort';
import { DesafioRelampago } from '../simulators/DesafioRelampago';

export const ApostilaView: React.FC = () => {
  const { 
    allApostilas, 
    activeApostilaId, 
    setActiveApostilaId, 
    activeLessonId, 
    setActiveLessonId, 
    completedLessons, 
    toggleLessonCompleted,
    addApostila,
    deleteApostila,
    updateApostilaPdf,
    removeApostilaPdf,
    updateLessonPdf,
    removeLessonPdf
  } = useTechLab();

  const [activeTab, setActiveTab] = useState<'aula' | 'pdf' | 'simuladores' | 'desafio'>('aula');
  const [selectedExOption, setSelectedExOption] = useState<number | null>(null);
  const [showExResult, setShowExResult] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [apostilaToDelete, setApostilaToDelete] = useState<Apostila | null>(null);

  // Reference to lesson container for precision scrolling
  const lessonAreaRef = useRef<HTMLDivElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const modalPdfInputRef = useRef<HTMLInputElement>(null);

  // Form state for creating a new Apostila
  const [formTitulo, setFormTitulo] = useState('');
  const [formSubtitulo, setFormSubtitulo] = useState('');
  const [formProfessor, setFormProfessor] = useState('Prof. Fernando Brito');
  const [formNivel, setFormNivel] = useState<'Iniciante' | 'Intermediário' | 'Avançado'>('Iniciante');
  const [formDuracao, setFormDuracao] = useState('3 Aulas · ~1h 30min');
  const [formDescricao, setFormDescricao] = useState('');
  const [formTags, setFormTags] = useState('Programação, Exercícios, Prática');
  const [formPdfData, setFormPdfData] = useState<{ url: string; name: string } | null>(null);

  // Lessons inside the new apostila
  const [formAulas, setFormAulas] = useState<{ titulo: string; tempo: string; teoria: string; exemploPython: string; explicacao: string }[]>([
    {
      titulo: 'Introdução ao Tema',
      tempo: '15 min',
      teoria: 'Explicação detalhada dos conceitos fundamentais para os alunos...',
      exemploPython: '# Exemplo prático elaborado pelo professor\nprint("Bem-vindo à nova apostila!")',
      explicacao: 'Observe como o código acima estrutura o fluxo de execução.',
    }
  ]);

  const currentApostila = allApostilas.find(a => a.id === activeApostilaId) || allApostilas[0];
  const currentLesson = currentApostila.aulas.find(a => a.id === activeLessonId) || currentApostila.aulas[0] || {
    id: 'empty',
    unidadeId: 'u1',
    numero: 1,
    titulo: 'Aula Inicial',
    tempo: '10 min',
    teoria: '<p>Selecione uma aula no sumário ao lado.</p>',
    exemploPython: '# Sem código',
    explicacaoCodigo: '',
  };

  const currentUnidade = currentApostila.unidades.find(u => u.id === currentLesson.unidadeId);
  const currentIndex = currentApostila.aulas.findIndex(a => a.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? currentApostila.aulas[currentIndex - 1] : null;
  const nextLesson = currentIndex < currentApostila.aulas.length - 1 ? currentApostila.aulas[currentIndex + 1] : null;
  const isCompleted = completedLessons.includes(currentLesson.id);

  // Scroll to the start of the lesson, NOT top of page!
  const handleLessonChange = (id: string) => {
    setActiveLessonId(id);
    setSelectedExOption(null);
    setShowExResult(false);
    
    // Precision scroll directly to lesson workspace header
    if (lessonAreaRef.current) {
      lessonAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Upload PDF for current lesson theme (or apostila)
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        if (currentLesson && currentLesson.id !== 'empty') {
          updateLessonPdf(currentLesson.id, result, file.name);
        } else {
          updateApostilaPdf(currentApostila.id, result, file.name);
        }
        setActiveTab('pdf');
      }
    };
    reader.readAsDataURL(file);
  };

  const activePdfUrl = currentLesson.pdfUrl || currentApostila.pdfUrl;
  const activePdfName = currentLesson.pdfUrl 
    ? (currentLesson.pdfName || `Aula_${currentLesson.numero}_${currentLesson.titulo}.pdf`)
    : (currentApostila.pdfName || `Apostila_${currentApostila.numero}.pdf`);
  const isLessonSpecificPdf = Boolean(currentLesson.pdfUrl);

  const handleRemoveCurrentPdf = () => {
    if (currentLesson.pdfUrl) {
      removeLessonPdf(currentLesson.id);
    } else if (currentApostila.pdfUrl) {
      removeApostilaPdf(currentApostila.id);
    }
  };

  // Upload PDF in modal form
  const handleModalPdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setFormPdfData({ url: result, name: file.name });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddLessonField = () => {
    setFormAulas(prev => [
      ...prev,
      {
        titulo: `Aula ${prev.length + 1} - Novo Tópico`,
        tempo: '20 min',
        teoria: 'Conteúdo explicativo da aula...',
        exemploPython: '# Código de exemplo\nprint("Nova aula")',
        explicacao: 'Explicação do código.',
      }
    ]);
  };

  const handleSaveApostila = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitulo.trim()) return;

    const unidadeId = `unit-${Date.now()}`;
    const aulasIds: string[] = [];

    const builtAulas: ApostilaAula[] = formAulas.map((a, idx) => {
      const aulaId = `aula-custom-${Date.now()}-${idx}`;
      aulasIds.push(aulaId);
      return {
        id: aulaId,
        unidadeId: unidadeId,
        numero: idx + 1,
        titulo: a.titulo,
        tempo: a.tempo || '15 min',
        teoria: a.teoria.includes('<p>') ? a.teoria : `<p>${a.teoria.replace(/\n/g, '<br/>')}</p>`,
        exemploPython: a.exemploPython,
        explicacaoCodigo: a.explicacao,
      };
    });

    const builtUnidade: ApostilaUnidade = {
      id: unidadeId,
      numero: 1,
      titulo: 'Conteúdo Programático Completo',
      descricao: formDescricao || 'Módulo principal estruturado pelo professor.',
      aulasIds: aulasIds,
    };

    addApostila({
      titulo: formTitulo,
      subtitulo: formSubtitulo || 'Material didático para estudo dos alunos',
      professor: formProfessor || 'Prof. Fernando Brito',
      nivel: formNivel,
      duracaoTotal: formDuracao || `${formAulas.length} Aulas`,
      descricao: formDescricao || 'Apostila criada para estudo técnico e prático.',
      tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
      unidades: [builtUnidade],
      aulas: builtAulas,
      pdfUrl: formPdfData?.url,
      pdfName: formPdfData?.name,
    });

    setIsCreateModalOpen(false);
    setFormTitulo('');
    setFormSubtitulo('');
    setFormDescricao('');
    setFormPdfData(null);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. SELETOR EM QUADRADOS DAS APOSTILAS (Apostila X, Nível e Título) */}
      <div className="bg-[#040e2b]/85 backdrop-blur-md border border-blue-500/25 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Apostilas Didáticas</span>
                <span className="text-xs font-mono font-normal text-blue-300/70">
                  ({allApostilas.length} disponíveis)
                </span>
              </h1>
              <p className="text-xs text-blue-200/70">
                Selecione um quadrado abaixo para abrir os materiais e aulas da disciplina.
              </p>
            </div>
          </div>

          {/* Botão de Criar Apostila (Professor) */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400/40 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Criar Nova Apostila (Professor)</span>
          </button>
        </div>

        {/* Container com barra para subir e descer ao ter mais apostilas */}
        <div className="max-h-72 sm:max-h-80 overflow-y-auto pr-1.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
            {allApostilas.map(apostila => {
              const isActive = apostila.id === activeApostilaId;
              const pdfCount = apostila.aulas.filter(a => Boolean(a.pdfUrl)).length + (apostila.pdfUrl ? 1 : 0);

              return (
                <div
                  key={apostila.id}
                  onClick={() => {
                    setActiveApostilaId(apostila.id);
                    if (apostila.aulas[0]) {
                      setActiveLessonId(apostila.aulas[0].id);
                    }
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none relative min-w-0 ${
                    isActive
                      ? 'bg-gradient-to-b from-blue-900/90 to-[#040d2e] border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] ring-2 ring-blue-500/50'
                      : 'bg-[#030a24]/85 border-blue-500/25 hover:border-blue-400/60 hover:bg-blue-950/40'
                  }`}
                >
                  <div className="min-w-0">
                    {/* Linha 1: Apostila X e Nível */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                      <span className="font-mono text-xs font-black text-blue-400 px-2 py-0.5 rounded bg-blue-950/90 border border-blue-500/30 shrink-0">
                        Apostila {apostila.numero}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                        {pdfCount > 0 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950/90 text-red-300 border border-red-500/50 font-mono">
                            {pdfCount} {pdfCount === 1 ? 'PDF' : 'PDFs'}
                          </span>
                        )}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                          {apostila.nivel}
                        </span>
                      </div>
                    </div>

                    {/* Linha 2: Título */}
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug break-words">
                      {apostila.titulo}
                    </h3>
                  </div>

                  {apostila.isCustom && (
                    <div className="pt-2 mt-2 border-t border-blue-500/20 flex justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setApostilaToDelete(apostila);
                        }}
                        className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-rose-950/60 transition-colors cursor-pointer"
                        title="Excluir apostila personalizada"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. ESPAÇO DE ESTUDO DA APOSTILA COM ÂNCORA DE ROLAGEM */}
      <div ref={lessonAreaRef} className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Sidebar: Sumário da Apostila Atual */}
        <aside className="xl:col-span-4 space-y-4">
          <div className="bg-[#040e2b]/90 backdrop-blur-md border border-blue-500/25 rounded-2xl p-4 sm:p-5 shadow-md sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-blue-500/20">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white text-sm truncate max-w-[170px]">
                  Apostila {currentApostila.numero}
                </span>
              </div>
              <span className="text-xs font-mono text-blue-400 font-semibold">
                {currentApostila.aulas.length} Aulas
              </span>
            </div>

            {/* Botão rápido para ver PDF se houver na aula ou na apostila */}
            {activePdfUrl && (
              <div className="w-full mt-2 flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('pdf')}
                  className="flex-1 flex items-center justify-between px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/40 border border-red-500/40 text-xs font-semibold text-red-200 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="truncate">
                      {isLessonSpecificPdf ? `PDF da Aula ${currentLesson.numero}` : 'PDF da Apostila'}
                    </span>
                  </span>
                  <span className="text-[10px] font-mono text-red-300 ml-1">Abrir</span>
                </button>
                <button
                  onClick={handleRemoveCurrentPdf}
                  className="p-2 rounded-xl bg-red-950/40 hover:bg-rose-900/60 border border-red-500/40 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer shrink-0"
                  title="Remover arquivo PDF deste tema/apostila"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="mt-3 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              {currentApostila.unidades.map(unidade => {
                const unitAulas = currentApostila.aulas.filter(a => a.unidadeId === unidade.id);
                const unitCompleted = unitAulas.filter(a => completedLessons.includes(a.id)).length;

                return (
                  <div key={unidade.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-300/80 px-1">
                      <span className="truncate max-w-[210px]">{unidade.titulo}</span>
                      <span className="text-[11px] font-mono text-blue-400">
                        {unitCompleted}/{unitAulas.length}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {unitAulas.map(aula => {
                        const active = aula.id === currentLesson.id;
                        const done = completedLessons.includes(aula.id);
                        const hasLessonPdf = Boolean(aula.pdfUrl);

                        return (
                          <button
                            key={aula.id}
                            onClick={() => handleLessonChange(aula.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-xl text-xs font-medium transition-all cursor-pointer ${
                              active
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold border border-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.35)]'
                                : 'text-blue-100/80 hover:bg-blue-900/40 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="font-mono text-blue-400 w-4 shrink-0">
                                {aula.numero}.
                              </span>
                              <span className="truncate">{aula.titulo}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              {hasLessonPdf && (
                                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-950/90 text-red-300 border border-red-500/50 shrink-0">
                                  PDF
                                </span>
                              )}
                              <span className="text-[10px] text-blue-300/70">{aula.tempo}</span>
                              {done ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-blue-500/40 shrink-0" />
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

        {/* Main Workspace: Aula, Leitor de PDF, Simuladores */}
        <main className="xl:col-span-8 space-y-6">
          {/* Top Lesson Header Card */}
          <div className="bg-[#040e2b]/90 backdrop-blur-md border border-blue-500/25 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-blue-300/80">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-400">
                  Apostila {currentApostila.numero} · Aula {currentLesson.numero}
                </span>
                <span>·</span>
                <span>{currentLesson.tempo}</span>
                <span>·</span>
                <span className="text-white font-medium">{currentApostila.professor}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Botão de Anexar PDF do tema da aula */}
                <button
                  onClick={() => pdfInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-950 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-900/50 transition-colors cursor-pointer"
                  title="Anexar arquivo PDF para este tema de aula"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{activePdfUrl ? (isLessonSpecificPdf ? 'Substituir PDF da Aula' : 'Substituir PDF') : 'Anexar PDF da Aula'}</span>
                </button>
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />

                {activePdfUrl && (
                  <button
                    onClick={handleRemoveCurrentPdf}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/70 border border-rose-500/40 text-rose-300 hover:text-white hover:bg-rose-900/60 transition-colors cursor-pointer"
                    title="Remover arquivo PDF deste tema"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover PDF</span>
                  </button>
                )}

                <button
                  onClick={() => toggleLessonCompleted(currentLesson.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-blue-950/80 text-blue-200 border border-blue-500/30 hover:bg-blue-900/60 hover:text-white'
                  }`}
                >
                  {isCompleted && <Check className="w-3.5 h-3.5" />}
                  <span>{isCompleted ? 'Aula Concluída' : 'Marcar como Concluída'}</span>
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Aula {currentLesson.numero}: {currentLesson.titulo}
            </h2>

            {/* Navigation Tabs (Teoria, Leitor PDF, Simuladores se houver) */}
            <div className="flex items-center gap-2 pt-2 border-t border-blue-500/20 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('aula')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'aula'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-300 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Teoria & Código</span>
              </button>

              <button
                onClick={() => setActiveTab('pdf')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'pdf'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-300 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Visualizador de PDF</span>
                {currentApostila.pdfUrl && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>

              {currentApostila.numero === 1 && (
                <>
                  <button
                    onClick={() => setActiveTab('simuladores')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'simuladores'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-blue-300 hover:text-white hover:bg-blue-900/40'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Simuladores Interativos</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('desafio')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'desafio'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-blue-300 hover:text-white hover:bg-blue-900/40'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Desafio 60s</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* TAB 1: Teoria & Interpretador de Código */}
          {activeTab === 'aula' && (
            <div className="space-y-6">
              {/* Theory Content */}
              <div className="bg-[#040e2b]/85 backdrop-blur-md border border-blue-500/25 rounded-2xl p-6 sm:p-7 shadow-md text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: currentLesson.teoria }} />
              </div>

              {/* Code Example & Interactive Python Runner */}
              {currentLesson.exemploPython && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-blue-300 font-semibold px-1">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-blue-400" />
                      <span>CÓDIGO EXEMPLO & EXECUTOR INTERATIVO</span>
                    </span>
                    <span className="text-[11px] text-blue-400 font-mono">
                      Você pode editar o código antes de rodar!
                    </span>
                  </div>

                  <PythonRunner initialCode={currentLesson.exemploPython} />
                </div>
              )}

              {/* Mini Exercise if present */}
              {currentLesson.miniExercicio && (
                <div className="bg-[#040e2b]/85 border border-blue-500/25 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4" />
                    <span>Desafio de Fixação Rápido</span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {currentLesson.miniExercicio.pergunta}
                  </p>

                  <div className="space-y-2">
                    {currentLesson.miniExercicio.opcoes.map((op, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedExOption(idx);
                          setShowExResult(true);
                        }}
                        className={`w-full p-3 rounded-xl text-xs font-medium text-left border transition-all ${
                          showExResult
                            ? idx === currentLesson.miniExercicio?.respostaCorreta
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                              : selectedExOption === idx
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-blue-950/50 border-blue-500/20 text-blue-200'
                            : selectedExOption === idx
                            ? 'bg-blue-600 text-white border-blue-400'
                            : 'bg-blue-950/50 border-blue-500/20 text-blue-200 hover:bg-blue-900/40'
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>

                  {showExResult && (
                    <div className="p-3 rounded-lg bg-blue-950/80 border border-blue-500/30 text-xs text-blue-200 flex items-center justify-between gap-2">
                      <div>
                        <strong>Explicação:</strong> {currentLesson.miniExercicio.explicacao}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedExOption(null);
                          setShowExResult(false);
                        }}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0"
                      >
                        Tentar de Novo
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-blue-500/20">
                {prevLesson ? (
                  <button
                    onClick={() => handleLessonChange(prevLesson.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-200 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Aula Anterior</span>
                  </button>
                ) : <div />}

                {nextLesson && (
                  <button
                    onClick={() => handleLessonChange(nextLesson.id)}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-xs cursor-pointer"
                  >
                    <span>Próxima Aula</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Visualizador de PDF Embutido com Opção de Download */}
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              {activePdfUrl ? (
                <div className="bg-[#040e2b]/90 border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
                  {/* PDF Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-500/20">
                    <div className="flex items-center gap-2.5 text-xs">
                      <div className="p-2 rounded-lg bg-red-950/80 border border-red-500/40 text-red-400 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">
                          {activePdfName}
                        </span>
                        <span className="text-[10px] text-blue-300">
                          {isLessonSpecificPdf 
                            ? `PDF do Tema: Aula ${currentLesson.numero} - ${currentLesson.titulo}`
                            : `PDF Geral da Apostila ${currentApostila.numero}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={activePdfUrl}
                        download={activePdfName}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar PDF</span>
                      </a>

                      <button
                        onClick={() => pdfInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-medium cursor-pointer"
                      >
                        Substituir Arquivo
                      </button>

                      <button
                        onClick={handleRemoveCurrentPdf}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/70 border border-rose-500/40 text-rose-300 hover:text-white hover:bg-rose-900/60 text-xs font-semibold transition-colors cursor-pointer"
                        title="Remover este arquivo PDF"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remover PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Embedded PDF Viewer */}
                  <div className="w-full h-[760px] rounded-xl overflow-hidden border border-blue-500/30 bg-slate-900">
                    <iframe
                      src={activePdfUrl}
                      className="w-full h-full rounded-xl bg-white"
                      title={activePdfName}
                    />
                  </div>
                </div>
              ) : (
                /* Empty state: Dropzone para anexar PDF */
                <div className="bg-[#040e2b]/90 border-2 border-dashed border-blue-500/40 rounded-2xl p-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center border border-blue-500/30">
                    <Upload className="w-8 h-8" />
                  </div>

                  <div className="max-w-md mx-auto space-y-1">
                    <h3 className="text-base font-bold text-white">
                      Nenhum arquivo PDF anexado à Aula {currentLesson.numero} ainda
                    </h3>
                    <p className="text-xs text-blue-200/80 leading-relaxed">
                      Você pode anexar um documento PDF específico para o tema desta aula (slides, apostila ou lista de exercícios) para os alunos estudarem e baixarem.
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => pdfInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-md cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Anexar Arquivo PDF para a Aula {currentLesson.numero}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Simuladores */}
          {activeTab === 'simuladores' && (
            <div className="space-y-6">
              <SimuladorCondicional />
              <SimuladorRange />
              <SimuladorMatriz />
              <SimuladorBubbleSort />
            </div>
          )}

          {/* TAB 4: Desafio 60s */}
          {activeTab === 'desafio' && <DesafioRelampago />}
        </main>
      </div>

      {/* 3. MODAL DE CRIAÇÃO DE NOVA APOSTILA (ÁREA DO PROFESSOR COM SUPORTE A PDF) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#040e2b] border border-blue-500/40 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between p-5 border-b border-blue-500/25 bg-blue-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Cadastrar Nova Apostila (Área do Professor)
                  </h3>
                  <p className="text-xs text-blue-200/70">
                    Insira aulas teóricas, código executável e opcionalmente anexe um arquivo PDF para os alunos.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveApostila} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Título da Apostila *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitulo}
                    onChange={e => setFormTitulo(e.target.value)}
                    placeholder="Ex: Apostila 5 - Cibersegurança & Redes"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Nome do Professor Responsável *
                  </label>
                  <input
                    type="text"
                    required
                    value={formProfessor}
                    onChange={e => setFormProfessor(e.target.value)}
                    placeholder="Ex: Prof. Fernando Brito"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Nível de Dificuldade
                  </label>
                  <select
                    value={formNivel}
                    onChange={e => setFormNivel(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Duração Estimada
                  </label>
                  <input
                    type="text"
                    value={formDuracao}
                    onChange={e => setFormDuracao(e.target.value)}
                    placeholder="Ex: 4 Aulas · ~2 horas"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={e => setFormTags(e.target.value)}
                    placeholder="Lógica, Redes, Prática"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              {/* Anexo de PDF no Modal */}
              <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-500/30 space-y-2">
                <label className="block text-xs font-semibold text-white">
                  Anexar Arquivo PDF da Apostila (Opcional)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => modalPdfInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{formPdfData ? 'Trocar PDF Selecionado' : 'Carregar PDF (.pdf)'}</span>
                  </button>
                  <input
                    ref={modalPdfInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleModalPdfUpload}
                    className="hidden"
                  />
                  {formPdfData && (
                    <span className="text-xs text-emerald-400 font-medium truncate max-w-xs">
                      ✓ {formPdfData.name}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-300 mb-1">
                  Subtítulo / Descrição Resumida
                </label>
                <textarea
                  rows={2}
                  value={formDescricao}
                  onChange={e => setFormDescricao(e.target.value)}
                  placeholder="Explique os objetivos de aprendizagem que os alunos alcançarão com esta apostila..."
                  className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400 resize-none"
                />
              </div>

              {/* Seção de Aulas da Apostila */}
              <div className="pt-2 border-t border-blue-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Aulas & Capítulos da Apostila ({formAulas.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddLessonField}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Mais uma Aula</span>
                  </button>
                </div>

                {formAulas.map((aula, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/25 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-400">
                        Aula {idx + 1}
                      </span>
                      {formAulas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setFormAulas(formAulas.filter((_, i) => i !== idx))}
                          className="text-xs text-rose-400 hover:text-rose-200"
                        >
                          Remover Aula
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-blue-300 mb-0.5">Título da Aula</label>
                        <input
                          type="text"
                          required
                          value={aula.titulo}
                          onChange={e => {
                            const updated = [...formAulas];
                            updated[idx].titulo = e.target.value;
                            setFormAulas(updated);
                          }}
                          className="w-full text-xs p-2 rounded bg-blue-950 border border-blue-500/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-blue-300 mb-0.5">Tempo Estimado</label>
                        <input
                          type="text"
                          value={aula.tempo}
                          onChange={e => {
                            const updated = [...formAulas];
                            updated[idx].tempo = e.target.value;
                            setFormAulas(updated);
                          }}
                          placeholder="Ex: 20 min"
                          className="w-full text-xs p-2 rounded bg-blue-950 border border-blue-500/30 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-blue-300 mb-0.5">Teoria Explicativa para o Aluno</label>
                      <textarea
                        rows={3}
                        required
                        value={aula.teoria}
                        onChange={e => {
                          const updated = [...formAulas];
                          updated[idx].teoria = e.target.value;
                          setFormAulas(updated);
                        }}
                        className="w-full text-xs p-2 rounded bg-blue-950 border border-blue-500/30 text-white font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-blue-300 mb-0.5">Código Exemplo Executável (Python / Lógica)</label>
                      <textarea
                        rows={3}
                        value={aula.exemploPython}
                        onChange={e => {
                          const updated = [...formAulas];
                          updated[idx].exemploPython = e.target.value;
                          setFormAulas(updated);
                        }}
                        className="w-full text-xs p-2 rounded bg-black/60 border border-blue-500/30 text-emerald-400 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Botões do modal */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-blue-500/25">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-blue-300 hover:text-white bg-blue-950/60 border border-blue-500/30"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/30 cursor-pointer"
                >
                  Salvar e Publicar Apostila
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DE APOSTILA */}
      {apostilaToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#040e2b] border border-rose-500/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-white">
                Excluir Apostila?
              </h3>
              <p className="text-xs text-blue-200/80 leading-relaxed">
                Tem certeza que deseja remover a <strong className="text-white">Apostila {apostilaToDelete.numero}: {apostilaToDelete.titulo}</strong>? Todas as aulas e materiais associados serão excluídos.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setApostilaToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/30 text-xs font-semibold text-blue-200 hover:text-white transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteApostila(apostilaToDelete.id);
                  setApostilaToDelete(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-md transition-colors cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
