import React, { useState } from 'react';
import { Check, X, GitBranch } from 'lucide-react';

export const SimuladorCondicional: React.FC = () => {
  const [nota, setNota] = useState(7.5);
  const [frequencia, setFrequencia] = useState(80);
  const [mensalidadeEmDia, setMensalidadeEmDia] = useState(true);

  // Determine branch
  let activeBranch = 'reprovado_falta';
  let resultadoTexto = '';
  let statusBadge = '';

  if (frequencia < 75) {
    activeBranch = 'reprovado_falta';
    resultadoTexto = 'Reprovado por Infrequência (Frequência abaixo de 75%).';
    statusBadge = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  } else if (nota >= 9.0) {
    activeBranch = 'aprovado_louvor';
    resultadoTexto = 'Aprovado com Louvor e Distinção Acadêmica!';
    statusBadge = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
  } else if (nota >= 7.0) {
    activeBranch = 'aprovado_direto';
    resultadoTexto = 'Aprovado por Média com Sucesso!';
    statusBadge = 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800';
  } else if (nota >= 5.0) {
    activeBranch = 'recuperacao';
    resultadoTexto = 'Em Recuperação (Necessita de Prova Final).';
    statusBadge = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
  } else {
    activeBranch = 'reprovado_nota';
    resultadoTexto = 'Reprovado por Nota (Média inferior a 5.0).';
    statusBadge = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Simulador Interativo de Decisões (if / elif / else)
          </h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Ajuste as variáveis e observe o caminho iluminado
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sliders */}
        <div className="space-y-4 md:col-span-1 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-700 dark:text-slate-300">Nota do Aluno:</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{nota.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={nota}
              onChange={e => setNota(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>0.0</span>
              <span>5.0</span>
              <span>7.0</span>
              <span>10.0</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-700 dark:text-slate-300">Frequência Escolar:</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{frequencia}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={frequencia}
              onChange={e => setFrequencia(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>0%</span>
              <span>75% (Mínimo)</span>
              <span>100%</span>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={mensalidadeEmDia}
                onChange={e => setMensalidadeEmDia(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Matrícula Regular</span>
            </label>
          </div>
        </div>

        {/* Tree execution visualization */}
        <div className="md:col-span-2 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Fluxo de Execução em Tempo Real
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className={`p-2.5 rounded-lg border transition-all ${
              activeBranch === 'reprovado_falta'
                ? 'bg-rose-500/10 border-rose-500/50 text-rose-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span>if frequencia &lt; 75:</span>
                {activeBranch === 'reprovado_falta' && <span className="text-[11px] font-sans">← Condição Verdadeira!</span>}
              </div>
              <div className="pl-4 text-slate-500">print(&quot;Reprovado por Faltas&quot;)</div>
            </div>

            <div className={`p-2.5 rounded-lg border transition-all ${
              activeBranch === 'aprovado_louvor'
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span>elif nota &gt;= 9.0:</span>
                {activeBranch === 'aprovado_louvor' && <span className="text-[11px] font-sans">← Condição Verdadeira!</span>}
              </div>
              <div className="pl-4 text-slate-500">print(&quot;Aprovado com Louvor!&quot;)</div>
            </div>

            <div className={`p-2.5 rounded-lg border transition-all ${
              activeBranch === 'aprovado_direto'
                ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span>elif nota &gt;= 7.0:</span>
                {activeBranch === 'aprovado_direto' && <span className="text-[11px] font-sans">← Condição Verdadeira!</span>}
              </div>
              <div className="pl-4 text-slate-500">print(&quot;Aprovado por Média&quot;)</div>
            </div>

            <div className={`p-2.5 rounded-lg border transition-all ${
              activeBranch === 'recuperacao'
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span>elif nota &gt;= 5.0:</span>
                {activeBranch === 'recuperacao' && <span className="text-[11px] font-sans">← Condição Verdadeira!</span>}
              </div>
              <div className="pl-4 text-slate-500">print(&quot;Recuperação Final&quot;)</div>
            </div>

            <div className={`p-2.5 rounded-lg border transition-all ${
              activeBranch === 'reprovado_nota'
                ? 'bg-rose-500/10 border-rose-500/50 text-rose-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span>else:</span>
                {activeBranch === 'reprovado_nota' && <span className="text-[11px] font-sans">← Condição Verdadeira!</span>}
              </div>
              <div className="pl-4 text-slate-500">print(&quot;Reprovado por Nota&quot;)</div>
            </div>
          </div>

          {/* Result Output */}
          <div className={`p-3 rounded-lg border text-xs font-medium flex items-center justify-between ${statusBadge}`}>
            <span className="font-semibold">Resultado do Aluno:</span>
            <span>{resultadoTexto}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
