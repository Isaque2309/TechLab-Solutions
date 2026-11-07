import React, { useState } from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { QuizPergunta, QuizSimulado } from '../../types';
import { 
  HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, 
  ArrowRight, Sparkles, Plus, Trash2, User, Clock, X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizView: React.FC = () => {
  const { 
    allQuizzes, 
    activeSimuladoId, 
    setActiveSimuladoId, 
    addQuiz, 
    deleteQuiz 
  } = useTechLab();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form state for creating a new simulado
  const [simTitulo, setSimTitulo] = useState('');
  const [simArea, setSimArea] = useState('Programação & Lógica');
  const [simProfessor, setSimProfessor] = useState('Prof. Fernando Brito');
  const [simTempo, setSimTempo] = useState('15 min');
  const [simDescricao, setSimDescricao] = useState('');
  const [simPerguntas, setSimPerguntas] = useState<{
    pergunta: string;
    opcoes: string[];
    correta: number;
    explicacao: string;
  }[]>([
    {
      pergunta: 'Em Python, qual das seguintes estruturas de dados é imutável?',
      opcoes: ['Lista (list)', 'Dicionário (dict)', 'Tupla (tuple)', 'Conjunto (set)'],
      correta: 2,
      explicacao: 'Tuplas não podem ser alteradas após sua criação, garantindo integridade e segurança de dados.',
    },
    {
      pergunta: 'Qual a principal finalidade de um laço while com sentinela?',
      opcoes: [
        'Executar infinitamente até faltar energia.',
        'Repetir instruções até que um valor sentinela pré-definido pelo usuário seja inserido.',
        'Aumentar a memória RAM do computador.',
        'Imprimir números aleatórios automaticamente.',
      ],
      correta: 1,
      explicacao: 'A sentinela atua como a flag de parada que encerra o laço while.',
    }
  ]);

  const currentSimulado: QuizSimulado = allQuizzes.find(q => q.id === activeSimuladoId) || allQuizzes[0];
  const questions = currentSimulado.perguntas;
  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted || isFinished) return;
    setSelectedOption(idx);
    setIsSubmitted(true);

    const isCorrect = idx === currentQ.correta;
    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      if (score >= Math.ceil(questions.length * 0.7)) {
        try {
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleAddQuestionField = () => {
    setSimPerguntas(prev => [
      ...prev,
      {
        pergunta: '',
        opcoes: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
        correta: 0,
        explicacao: '',
      }
    ]);
  };

  const handleSaveSimulado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simTitulo.trim()) return;

    const formattedQuestions: QuizPergunta[] = simPerguntas.map((q, idx) => ({
      id: `q-custom-${Date.now()}-${idx}`,
      area: simArea,
      pergunta: q.pergunta || 'Questão sem enunciado',
      opcoes: q.opcoes,
      correta: q.correta,
      explicacao: q.explicacao || 'Gabarito oficial elaborado pelo professor.',
    }));

    addQuiz({
      titulo: simTitulo,
      area: simArea,
      professor: simProfessor || 'Prof. Fernando Brito',
      tempoSugerido: simTempo || '15 min',
      descricao: simDescricao || 'Simulado prático de avaliação técnica.',
      perguntas: formattedQuestions,
    });

    setIsCreateModalOpen(false);
    setSimTitulo('');
    setSimDescricao('');
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* 1. SELEÇÃO DE BLOCOS DE SIMULADOS (SIMULADO 1, SIMULADO 2...) */}
      <div className="bg-[#040e2b]/85 backdrop-blur-md border border-blue-500/25 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-blue-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Avaliação Prática de Competências Técnicas</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Simulados & Provas Técnicas
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/80 mt-0.5">
              Escolha um simulado para testar seus conhecimentos ou crie novos testes para os alunos.
            </p>
          </div>

          {/* Botão de Criar Simulado */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400/40 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Novo Simulado (Professor)</span>
          </button>
        </div>

        {/* Blocos de Simulado 1, Simulado 2, Simulado 3... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allQuizzes.map(sim => {
            const isActive = sim.id === activeSimuladoId;

            return (
              <div
                key={sim.id}
                onClick={() => {
                  setActiveSimuladoId(sim.id);
                  restartQuiz();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-blue-900/90 to-[#040d2e] border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.35)] ring-2 ring-blue-500/50'
                    : 'bg-[#030a24]/80 border-blue-500/25 hover:border-blue-400/60 hover:bg-blue-950/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black text-blue-400 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/30">
                      Simulado {sim.numero}
                    </span>
                    <span className="text-[10px] font-mono text-blue-300">
                      {sim.perguntas.length} Questões
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-1">
                    {sim.titulo}
                  </h3>

                  <p className="text-[11px] text-blue-200/70 line-clamp-2 mb-3">
                    {sim.descricao}
                  </p>
                </div>

                <div className="pt-3 border-t border-blue-500/20 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-blue-300/80 font-medium">
                    <User className="w-3 h-3 text-blue-400" />
                    <span className="truncate max-w-[130px]">{sim.professor}</span>
                  </div>

                  {sim.isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Remover Simulado ${sim.numero} (${sim.titulo})?`)) {
                          deleteQuiz(sim.id);
                        }
                      }}
                      className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-rose-950/50"
                      title="Excluir simulado personalizado"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ÁREA DE REALIZAÇÃO DO SIMULADO */}
      <div className="bg-[#040e2b]/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-blue-300 font-mono pb-3 border-b border-blue-500/20">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Simulado {currentSimulado.numero}:</span>
            <span className="text-blue-400">{currentSimulado.titulo}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">
              Acertos: {score}/{questions.length}
            </span>
            <span>Questão {currentIndex + 1} de {questions.length}</span>
          </div>
        </div>

        {!isFinished ? (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                {currentQ?.area || 'Geral'}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ?.pergunta}
              </h2>
            </div>

            {/* Alternativas */}
            <div className="space-y-3">
              {currentQ?.opcoes.map((op, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-[#030a24]/90 border-blue-500/30 text-blue-100 hover:border-blue-400 hover:bg-blue-900/40';

                if (isSubmitted) {
                  if (idx === currentQ.correta) {
                    btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200 font-bold';
                  } else {
                    btnStyle = 'bg-blue-950/40 border-blue-500/20 text-blue-300/50 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-blue-950 border border-blue-500/40 flex items-center justify-center font-mono text-xs font-bold text-blue-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{op}</span>
                    </div>

                    {isSubmitted && idx === currentQ.correta && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && idx !== currentQ.correta && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Explicativo */}
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-500/35 space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Explicação Didática do Gabarito:</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                  {currentQ.explicacao}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    <span>{currentIndex < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tela de Resultado Final */
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center border border-blue-500/40 shadow-lg">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">Simulado Concluído!</h2>
              <p className="text-xs sm:text-sm text-blue-200/80 mt-1">
                Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong> questões ({Math.round((score / questions.length) * 100)}%).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 max-w-md mx-auto text-xs text-blue-200">
              {score >= Math.ceil(questions.length * 0.7) ? (
                <span className="text-emerald-400 font-bold block">
                  🎉 Excelente desempenho! Você demonstrou sólido domínio técnico sobre este tópico.
                </span>
              ) : (
                <span className="text-amber-400 font-bold block">
                  💡 Bom esforço! Recomendamos revisar as aulas teóricas da apostila correspondente e refazer o teste.
                </span>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Refazer este Simulado</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. MODAL DE CRIAÇÃO DE SIMULADO (ÁREA DO PROFESSOR) */}
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
                    Cadastrar Novo Simulado Técnico (Professor)
                  </h3>
                  <p className="text-xs text-blue-200/70">
                    Crie provas objetivas com gabarito explicado para os alunos realizarem.
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

            <form onSubmit={handleSaveSimulado} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Título do Simulado *
                  </label>
                  <input
                    type="text"
                    required
                    value={simTitulo}
                    onChange={e => setSimTitulo(e.target.value)}
                    placeholder="Ex: Simulado 4 - Cloud & Microsserviços"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Professor Responsável
                  </label>
                  <input
                    type="text"
                    value={simProfessor}
                    onChange={e => setSimProfessor(e.target.value)}
                    placeholder="Ex: Prof. Fernando Brito"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Área de Conhecimento
                  </label>
                  <input
                    type="text"
                    value={simArea}
                    onChange={e => setSimArea(e.target.value)}
                    placeholder="Ex: Python, Cloud, Segurança"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Tempo Sugerido
                  </label>
                  <input
                    type="text"
                    value={simTempo}
                    onChange={e => setSimTempo(e.target.value)}
                    placeholder="Ex: 20 min"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-300 mb-1">
                  Descrição Resumida
                </label>
                <input
                  type="text"
                  value={simDescricao}
                  onChange={e => setSimDescricao(e.target.value)}
                  placeholder="Orientações e escopo do simulado"
                  className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white"
                />
              </div>

              {/* Questões */}
              <div className="pt-2 border-t border-blue-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Questões do Simulado ({simPerguntas.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddQuestionField}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Questão</span>
                  </button>
                </div>

                {simPerguntas.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/25 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-400">
                        Questão {idx + 1}
                      </span>
                      {simPerguntas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setSimPerguntas(simPerguntas.filter((_, i) => i !== idx))}
                          className="text-xs text-rose-400 hover:text-rose-200"
                        >
                          Remover Questão
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-blue-300 mb-0.5">Enunciado da Pergunta *</label>
                      <input
                        type="text"
                        required
                        value={q.pergunta}
                        onChange={e => {
                          const updated = [...simPerguntas];
                          updated[idx].pergunta = e.target.value;
                          setSimPerguntas(updated);
                        }}
                        className="w-full text-xs p-2 rounded bg-blue-950 border border-blue-500/30 text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-blue-300 mb-0.5">Alternativas e Marcação da Correta:</label>
                      {q.opcoes.map((op, opIdx) => (
                        <div key={opIdx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correta-${idx}`}
                            checked={q.correta === opIdx}
                            onChange={() => {
                              const updated = [...simPerguntas];
                              updated[idx].correta = opIdx;
                              setSimPerguntas(updated);
                            }}
                            className="accent-blue-600 cursor-pointer"
                          />
                          <input
                            type="text"
                            required
                            value={op}
                            onChange={e => {
                              const updated = [...simPerguntas];
                              updated[idx].opcoes[opIdx] = e.target.value;
                              setSimPerguntas(updated);
                            }}
                            className="flex-1 text-xs p-1.5 rounded bg-blue-950 border border-blue-500/25 text-white"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] text-blue-300 mb-0.5">Explicação Didática do Gabarito</label>
                      <textarea
                        rows={2}
                        value={q.explicacao}
                        onChange={e => {
                          const updated = [...simPerguntas];
                          updated[idx].explicacao = e.target.value;
                          setSimPerguntas(updated);
                        }}
                        placeholder="Por que a alternativa selecionada é a correta?"
                        className="w-full text-xs p-2 rounded bg-blue-950 border border-blue-500/30 text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

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
                  Salvar e Publicar Simulado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
