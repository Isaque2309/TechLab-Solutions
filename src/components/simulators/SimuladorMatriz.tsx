import React, { useState } from 'react';
import { Grid, RefreshCw } from 'lucide-react';

export const SimuladorMatriz: React.FC = () => {
  const [highlightMode, setHighlightMode] = useState<'none' | 'principal' | 'secundaria' | 'superior' | 'inferior'>('principal');
  const [matrixSize, setMatrixSize] = useState<3 | 4>(3);

  // Default matrix 3x3
  const [matrix3, setMatrix3] = useState<number[][]>([
    [12, 45, 78],
    [34, 56, 89],
    [90, 23, 67],
  ]);

  // Default matrix 4x4
  const [matrix4, setMatrix4] = useState<number[][]>([
    [10, 20, 30, 40],
    [50, 60, 70, 80],
    [90, 11, 22, 33],
    [44, 55, 66, 77],
  ]);

  const activeMatrix = matrixSize === 3 ? matrix3 : matrix4;

  const randomize = () => {
    const generate = (size: number) =>
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10)
      );

    if (matrixSize === 3) setMatrix3(generate(3));
    else setMatrix4(generate(4));
  };

  const isHighlighted = (r: number, c: number, n: number): boolean => {
    if (highlightMode === 'principal') return r === c;
    if (highlightMode === 'secundaria') return r + c === n - 1;
    if (highlightMode === 'superior') return c > r;
    if (highlightMode === 'inferior') return r > c;
    return false;
  };

  const getExplanation = () => {
    switch (highlightMode) {
      case 'principal':
        return 'Diagonal Principal: Elementos onde o índice da linha é exatamente igual ao índice da coluna (i == j).';
      case 'secundaria':
        return 'Diagonal Secundária: Elementos onde a soma dos índices é igual a n - 1 (i + j == tamanho - 1).';
      case 'superior':
        return 'Triângulo Superior: Elementos acima da diagonal principal (j > i). Muito comum em matrizes triangulares.';
      case 'inferior':
        return 'Triângulo Inferior: Elementos abaixo da diagonal principal (i > j).';
      default:
        return 'Clique nos botões de filtro para inspecionar as propriedades da matriz.';
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Simulador de Matrizes & Diagonais
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={() => setMatrixSize(3)}
              className={`px-2 py-1 rounded ${matrixSize === 3 ? 'bg-white dark:bg-slate-700 font-bold shadow-2xs' : 'text-slate-500'}`}
            >
              3×3
            </button>
            <button
              onClick={() => setMatrixSize(4)}
              className={`px-2 py-1 rounded ${matrixSize === 4 ? 'bg-white dark:bg-slate-700 font-bold shadow-2xs' : 'text-slate-500'}`}
            >
              4×4
            </button>
          </div>
          <button
            onClick={randomize}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Gerar novos números"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Buttons */}
        <div className="md:col-span-5 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Modos de Inspeção
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setHighlightMode('principal')}
              className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                highlightMode === 'principal'
                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Diagonal Principal
            </button>
            <button
              onClick={() => setHighlightMode('secundaria')}
              className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                highlightMode === 'secundaria'
                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Diagonal Secundária
            </button>
            <button
              onClick={() => setHighlightMode('superior')}
              className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                highlightMode === 'superior'
                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Triângulo Superior
            </button>
            <button
              onClick={() => setHighlightMode('inferior')}
              className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                highlightMode === 'inferior'
                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Triângulo Inferior
            </button>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {getExplanation()}
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="md:col-span-7 flex justify-center">
          <div
            className="grid gap-2.5 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs"
            style={{ gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))` }}
          >
            {activeMatrix.map((row, r) =>
              row.map((val, c) => {
                const highlighted = isHighlighted(r, c, matrixSize);
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold transition-all ${
                      highlighted
                        ? 'bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-400'
                        : 'bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{val}</span>
                    <span className="text-[10px] opacity-60 font-sans font-normal">
                      [{r},{c}]
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
