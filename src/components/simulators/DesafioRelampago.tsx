import React, { useState, useEffect } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { Timer, CheckCircle2, XCircle, RotateCcw, Zap, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DesafioRelampago: React.FC = () => {
  const questions = TECHLAB_DATA.apostila.simuladoRelampago || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    if (isActive && timeLeft > 0 && !isFinished) {
      interval = window.setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setIsFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isFinished]);

  const startChallenge = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(60);
    setIsActive(true);
    setIsFinished(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered || isFinished) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correta;
    if (isCorrect) {
      setScore(s => s + 1);
    }

    // Auto advance after 800ms
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
        if (score + (isCorrect ? 1 : 0) >= 6) {
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          } catch {
            // fallback
          }
        }
      }
    }, 900);
  };

  const currentQ = questions[currentIndex];

  if (!isActive) {
    return (
      <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-xl p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
          <Zap className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">Desafio Relâmpago: 60 Segundos de Lógica</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
          Responda o máximo de perguntas de lógica e algoritmos antes que o cronômetro chegue ao zero. Teste seu reflexo computacional!
        </p>
        <button
          onClick={startChallenge}
          className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-md"
        >
          Iniciar Desafio (60s)
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center">
          <Trophy className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Desafio Concluído!</h3>
        <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
          {score} / {questions.length} Acertos
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {score >= 6
            ? 'Excelente reflexo! Seu raciocínio lógico está afiado.'
            : 'Bom treino! Revise os conceitos na apostila e tente novamente.'}
        </p>
        <button
          onClick={startChallenge}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Tentar Novamente</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
      {/* Top Bar with Timer & Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className={`w-4 h-4 ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-500'}`} />
          <span className={`font-mono text-sm font-bold ${timeLeft <= 10 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
          </span>
        </div>
        <div className="text-xs font-mono text-slate-500">
          Questão {currentIndex + 1} de {questions.length} · Placar: <strong className="text-emerald-500">{score}</strong>
        </div>
      </div>

      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h4 className="text-base font-bold text-slate-900 dark:text-white pt-1">
        {currentQ.pergunta}
      </h4>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {currentQ.opcoes.map((opcao, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correta;

          let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400';
          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
            } else if (isSelected) {
              btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`p-3 rounded-lg border text-left text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{opcao}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
            </button>
          );
        })}
      </div>

      {isAnswered && currentQ.comentario && (
        <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
          💡 {currentQ.comentario}
        </div>
      )}
    </div>
  );
};
