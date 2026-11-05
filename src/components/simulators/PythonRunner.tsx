import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, RotateCcw } from 'lucide-react';

interface PythonRunnerProps {
  initialCode: string;
}

export const PythonRunner: React.FC<PythonRunnerProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // When initialCode changes with lesson selection, update code
  React.useEffect(() => {
    setCode(initialCode);
    setOutput('');
  }, [initialCode]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('Executando script Python...\n');

    setTimeout(() => {
      try {
        // Safe simulation of simple Python prints and arithmetic
        const lines = code.split('\n');
        const outputLines: string[] = [];

        // Build a virtual scope
        const scope: Record<string, any> = {};

        lines.forEach(line => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) return;

          // Check for print(...)
          const printMatch = trimmed.match(/^print\((.*)\)$/);
          if (printMatch) {
            let inner = printMatch[1].trim();

            // Check if f-string: f"..." or f'...'
            if (inner.startsWith('f"') || inner.startsWith("f'")) {
              let fstr = inner.slice(2, -1);
              // replace {var}
              fstr = fstr.replace(/\{([^}]+)\}/g, (_, expr) => {
                const varName = expr.trim();
                return scope[varName] !== undefined ? scope[varName] : expr;
              });
              outputLines.push(fstr);
              return;
            }

            // Normal string: "..." or '...'
            if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
              outputLines.push(inner.slice(1, -1));
              return;
            }

            // Variable lookup
            if (scope[inner] !== undefined) {
              outputLines.push(String(scope[inner]));
              return;
            }

            // Multiple comma-separated arguments
            if (inner.includes(',')) {
              const parts = inner.split(',').map(p => {
                const s = p.trim();
                if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
                  return s.slice(1, -1);
                }
                return scope[s] !== undefined ? scope[s] : s;
              });
              outputLines.push(parts.join(' '));
              return;
            }

            outputLines.push(inner);
            return;
          }

          // Simple assignment: x = 10, nome = "Ana", lista = [1, 2, 3]
          const assignMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
          if (assignMatch) {
            const varName = assignMatch[1];
            const rawVal = assignMatch[2].trim();

            if (rawVal.startsWith('"') || rawVal.startsWith("'")) {
              scope[varName] = rawVal.slice(1, -1);
            } else if (!isNaN(Number(rawVal))) {
              scope[varName] = Number(rawVal);
            } else if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
              try {
                scope[varName] = JSON.parse(rawVal);
              } catch {
                scope[varName] = rawVal;
              }
            } else {
              scope[varName] = rawVal;
            }
          }
        });

        if (outputLines.length === 0) {
          setOutput('>>> Código executado com sucesso! (Nenhum print gerado).');
        } else {
          setOutput(outputLines.join('\n'));
        }
      } catch (err: any) {
        setOutput(`>>> Erro de Sintaxe / Execução: ${err.message || 'Erro desconhecido'}`);
      } finally {
        setIsRunning(false);
      }
    }, 250);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-900 text-slate-100 shadow-md">
      {/* Code Editor Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span>script.py</span>
          <span className="text-slate-600">·</span>
          <span>Python 3.12 (Ambiente Interativo)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Copiar código"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>

          <button
            onClick={() => {
              setCode(initialCode);
              setOutput('');
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Restaurar código original"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar</span>
          </button>

          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{isRunning ? 'Rodando...' : 'Executar'}</span>
          </button>
        </div>
      </div>

      {/* Code Textarea */}
      <div className="p-4 bg-slate-900 font-mono text-xs sm:text-sm">
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={Math.min(14, Math.max(5, code.split('\n').length + 1))}
          className="w-full bg-transparent text-emerald-300 font-mono resize-y focus:outline-none leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Terminal Output */}
      {output && (
        <div className="border-t border-slate-800 bg-slate-950 p-4">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Terminal / Saída do Programa</span>
            <span className="text-emerald-400 font-normal">Finalizado com sucesso</span>
          </div>
          <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};
