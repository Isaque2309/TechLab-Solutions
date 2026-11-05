import React, { useState } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { QuizPergunta } from '../../types';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizView: React.FC = () => {
  const allPerguntas = (TECHLAB_DATA.quiz?.perguntas || []) as QuizPergunta[];
  const rawAreas = (TECHLAB_DATA.quiz?.areas || []) as { id: string; nome: string }[];
  const areas = [{ id: 'todas', nome: 'Todas as Áreas' }, ...rawAreas];

  const [selectedAreaId, setSelectedAreaId] = useState<string>('todas');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const filteredQuestions = selectedAreaId === 'todas'
    ? allPerguntas
    : allPerguntas.filter(q => q.area === selectedAreaId);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

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
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      if (score >= Math.ceil(filteredQuestions.length * 0.7)) {
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {
          // fallback
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

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Avaliação de Competências Técnicas</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Simulados & Desafios Técnicos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Questões práticas baseadas em entrevistas técnicas de grandes empresas de tecnologia.
          </p>
        </div>

        {/* Current score */}
        <div className="text-xs font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1.5 rounded-lg">
          Acertos: <strong>{score}</strong>/{filteredQuestions.length}
        </div>
      </div>

      {/* Area selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
        {areas.map(area => (
          <button
            key={area.id}
            onClick={() => {
              setSelectedAreaId(area.id);
              restartQuiz();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedAreaId === area.id
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {area.nome}
          </button>
        ))}
      </div>

      {/* Quiz Card */}
      {!isFinished && currentQ ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-5">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Questão {currentIndex + 1} de {filteredQuestions.length}</span>
              <span className="text-blue-500 font-semibold">{currentQ.area}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.pergunta}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.opcoes.map((opcao, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correta;

              let btnClass = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400';
              if (isSubmitted) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 font-mono text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opcao}</span>
                  </div>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {isSubmitted && (
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm text-blue-950 dark:text-blue-200 leading-relaxed">
                <strong className="block text-xs font-bold uppercase tracking-wider mb-1 text-blue-600 dark:text-blue-400">
                  Explicação Técnica Detalhada:
                </strong>
                {currentQ.explicacao}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <span>{currentIndex < filteredQuestions.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Result Summary */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center">
            <Trophy className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Simulado Concluído!</h2>
          <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
            {score} de {filteredQuestions.length} corretas
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            {score >= Math.ceil(filteredQuestions.length * 0.7)
              ? 'Parabéns! Seu domínio técnico está muito consistente para os desafios do mercado de TI.'
              : 'Bom esforço! Recomendamos revisar as aulas da apostila e tentar novamente.'}
          </p>

          <div className="pt-3">
            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Simulado</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
