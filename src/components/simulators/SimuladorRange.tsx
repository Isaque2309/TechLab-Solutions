import React, { useState } from 'react';
import { Repeat } from 'lucide-react';

export const SimuladorRange: React.FC = () => {
  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(10);
  const [step, setStep] = useState(2);

  const calculateRange = (): number[] => {
    const list: number[] = [];
    if (step === 0) return list;
    if (step > 0) {
      for (let i = start; i < stop && list.length < 50; i += step) {
        list.push(i);
      }
    } else {
      for (let i = start; i > stop && list.length < 50; i += step) {
        list.push(i);
      }
    }
    return list;
  };

  const numbers = calculateRange();

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Repeat className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Simulador de Laços com range(start, stop, step)
          </h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Entenda como o Python fatia e itera números
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Controls */}
        <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-700 dark:text-slate-300">start (Início):</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{start}</span>
            </div>
            <input
              type="range"
              min="-10"
              max="20"
              value={start}
              onChange={e => setStart(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-700 dark:text-slate-300">stop (Limite exclusivo):</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{stop}</span>
            </div>
            <input
              type="range"
              min="-10"
              max="30"
              value={stop}
              onChange={e => setStop(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-700 dark:text-slate-300">step (Passo/Incremento):</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{step}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="10"
              value={step}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                setStep(val === 0 ? 1 : val);
              }}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="pt-2 text-xs font-mono text-slate-500 bg-slate-50 dark:bg-slate-800 p-2 rounded">
            list(range({start}, {stop}, {step}))
          </div>
        </div>

        {/* Visual generation */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Total de iterações: <strong className="text-slate-900 dark:text-white font-mono">{numbers.length}</strong>
            </span>
            <span className="text-slate-400">Limite <code>{stop}</code> nunca é incluído</span>
          </div>

          <div className="min-h-24 p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 items-center">
            {numbers.length === 0 ? (
              <div className="text-xs text-rose-500 italic">
                Nenhum número gerado (o passo não caminha em direção ao limite).
              </div>
            ) : (
              numbers.map((num, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center w-11 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-sm shadow-2xs animate-in zoom-in-75 duration-100"
                >
                  <span>{num}</span>
                  <span className="text-[9px] font-normal text-slate-400">i={idx}</span>
                </div>
              ))
            )}
          </div>

          <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300">
            <span className="text-indigo-600 dark:text-indigo-400">for</span> i <span className="text-indigo-600 dark:text-indigo-400">in</span> range({start}, {stop}, {step}):
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;print(f&quot;Iteração: &#123;i&#125;&quot;)
          </div>
        </div>
      </div>
    </div>
  );
};
