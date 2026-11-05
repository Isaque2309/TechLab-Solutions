import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, CheckCircle2 } from 'lucide-react';

interface Step {
  array: number[];
  comparing: [number, number] | null;
  swapped: boolean;
  sortedIndices: number[];
}

export const SimuladorBubbleSort: React.FC = () => {
  const INITIAL_ARRAY = [48, 15, 82, 33, 95, 27, 64, 10];
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [speedMs, setSpeedMs] = useState(300);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [swapCount, setSwapCount] = useState(0);

  const stepsRef = useRef<Step[]>([]);
  const timerRef = useRef<number | null>(null);

  // Precompute all steps of Bubble Sort
  const generateSteps = (initial: number[]) => {
    const steps: Step[] = [];
    const arr = [...initial];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted: number[] = [];

    steps.push({
      array: [...arr],
      comparing: null,
      swapped: false,
      sortedIndices: [],
    });

    for (let i = 0; i < n - 1; i++) {
      let anySwapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: false,
          sortedIndices: [...sorted],
        });

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swaps++;
          anySwapped = true;

          steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapped: true,
            sortedIndices: [...sorted],
          });
        }
      }
      sorted.push(n - i - 1);
      if (!anySwapped) break;
    }

    // Add all remaining as sorted
    const allIndices = arr.map((_, idx) => idx);
    steps.push({
      array: [...arr],
      comparing: null,
      swapped: false,
      sortedIndices: allIndices,
    });

    return steps;
  };

  useEffect(() => {
    stepsRef.current = generateSteps(INITIAL_ARRAY);
    reset();
  }, []);

  const reset = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    stepsRef.current = generateSteps(INITIAL_ARRAY);
    setCurrentStepIndex(0);
    setArray([...INITIAL_ARRAY]);
    setComparisonCount(0);
    setSwapCount(0);
  };

  const stepForward = () => {
    if (currentStepIndex < stepsRef.current.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const step = stepsRef.current[nextIndex];
      setCurrentStepIndex(nextIndex);
      setArray(step.array);
      if (step.comparing) setComparisonCount(c => c + 1);
      if (step.swapped) setSwapCount(s => s + 1);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < stepsRef.current.length - 1) {
            const next = prev + 1;
            const step = stepsRef.current[next];
            setArray(step.array);
            if (step.comparing) setComparisonCount(c => c + 1);
            if (step.swapped) setSwapCount(s => s + 1);
            return next;
          } else {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return prev;
          }
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMs]);

  const currentStep = stepsRef.current[currentStepIndex] || {
    array,
    comparing: null,
    swapped: false,
    sortedIndices: [],
  };

  const isCompleted = currentStepIndex >= stepsRef.current.length - 1;

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Visualizador Interativo Bubble Sort (Ordenação por Bolha)</span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs text-emerald-500 font-normal">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ordenado!
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compara pares adjacentes e empurra o maior valor para o final da lista em cada iteração.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400">Comparações: </span>
            <strong className="text-indigo-600 dark:text-indigo-400">{comparisonCount}</strong>
          </div>
          <div>
            <span className="text-slate-400">Trocas (Swaps): </span>
            <strong className="text-amber-600 dark:text-amber-400">{swapCount}</strong>
          </div>
        </div>
      </div>

      {/* Bars Chart */}
      <div className="h-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-end justify-center gap-3">
        {array.map((val, idx) => {
          const isComparing = currentStep.comparing && (currentStep.comparing[0] === idx || currentStep.comparing[1] === idx);
          const isSorted = currentStep.sortedIndices.includes(idx);

          let barBg = 'bg-slate-300 dark:bg-slate-700';
          let textColor = 'text-slate-700 dark:text-slate-300';

          if (isSorted) {
            barBg = 'bg-emerald-500';
            textColor = 'text-emerald-500 font-bold';
          } else if (isComparing) {
            if (currentStep.swapped) {
              barBg = 'bg-rose-500 animate-pulse';
              textColor = 'text-rose-500 font-bold';
            } else {
              barBg = 'bg-indigo-500';
              textColor = 'text-indigo-500 font-bold';
            }
          }

          return (
            <div key={idx} className="flex-1 max-w-12 flex flex-col items-center gap-1.5 h-full justify-end">
              <span className={`text-xs font-mono ${textColor}`}>{val}</span>
              <div
                className={`w-full rounded-t-md transition-all duration-200 ${barBg}`}
                style={{ height: `${(val / 100) * 100}%` }}
              />
              <span className="text-[10px] text-slate-400 font-mono">i={idx}</span>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isCompleted}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-xs transition-colors shadow-xs"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            <span>{isPlaying ? 'Pausar' : 'Reproduzir'}</span>
          </button>

          <button
            onClick={stepForward}
            disabled={isPlaying || isCompleted}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-xs font-medium transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Passo a Passo</span>
          </button>

          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs transition-colors"
            title="Reiniciar lista"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar</span>
          </button>
        </div>

        {/* Speed slider */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>Velocidade:</span>
          <input
            type="range"
            min="50"
            max="600"
            step="50"
            value={650 - speedMs}
            onChange={e => setSpeedMs(650 - parseInt(e.target.value, 10))}
            className="w-24 accent-indigo-600 cursor-pointer"
          />
          <span className="font-mono text-[11px] text-slate-400">
            {speedMs < 200 ? 'Rápido' : speedMs > 400 ? 'Lento' : 'Normal'}
          </span>
        </div>
      </div>
    </div>
  );
};
