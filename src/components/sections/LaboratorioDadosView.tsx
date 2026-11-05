import React, { useState, useEffect, useMemo } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { DatasetExemplo } from '../../types';
import { 
  Database, Upload, BarChart3, LineChart, ScatterChart, 
  Trash2, RefreshCw, Undo, Sparkles, CheckCircle2, AlertCircle, AlignLeft 
} from 'lucide-react';

interface ParsedDataset {
  headers: string[];
  rows: Record<string, string | number>[];
  numericColumns: string[];
  categoricalColumns: string[];
}

export const LaboratorioDadosView: React.FC = () => {
  const exampleDatasets = TECHLAB_DATA.laboratorio.datasetsExemplo as DatasetExemplo[];
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(exampleDatasets[0]?.id || 'tech_salaries');
  const [activeTab, setActiveTab] = useState<'grafico' | 'estatisticas' | 'correlacao' | 'tabela'>('grafico');

  // Chart configuration: default to bar-h for full label legibility
  const [chartType, setChartType] = useState<'bar-h' | 'bar-v' | 'line'>('bar-h');
  const [selectedX, setSelectedX] = useState<string>('');
  const [selectedY, setSelectedY] = useState<string>('');

  // History for undo
  const [datasetHistory, setDatasetHistory] = useState<Record<string, string | number>[][]>([]);
  const [currentRows, setCurrentRows] = useState<Record<string, string | number>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [customCsvName, setCustomCsvName] = useState<string | null>(null);

  // Parse CSV
  const parseCsv = (csvText: string): ParsedDataset => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return { headers: [], rows: [], numericColumns: [], categoricalColumns: [] };

    const parsedHeaders = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const parsedRows: Record<string, string | number>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const row: Record<string, string | number> = {};

      parsedHeaders.forEach((h, colIdx) => {
        const val = values[colIdx];
        if (val === undefined || val === '' || val === 'null' || val === 'NaN') {
          row[h] = '';
        } else if (!isNaN(Number(val))) {
          row[h] = Number(val);
        } else {
          row[h] = val;
        }
      });
      parsedRows.push(row);
    }

    const numericCols: string[] = [];
    const categoricalCols: string[] = [];

    parsedHeaders.forEach(h => {
      const isNum = parsedRows.some(r => typeof r[h] === 'number');
      if (isNum) numericCols.push(h);
      else categoricalCols.push(h);
    });

    return {
      headers: parsedHeaders,
      rows: parsedRows,
      numericColumns: numericCols,
      categoricalColumns: categoricalCols,
    };
  };

  // Load default or selected dataset
  useEffect(() => {
    const found = exampleDatasets.find(d => d.id === selectedDatasetId) || exampleDatasets[0];
    if (found && !customCsvName) {
      const parsed = parseCsv(found.csv);
      setHeaders(parsed.headers);
      setCurrentRows(parsed.rows);
      setDatasetHistory([]);

      // Auto select axes
      if (parsed.categoricalColumns.length > 0) setSelectedX(parsed.categoricalColumns[0]);
      else if (parsed.headers.length > 0) setSelectedX(parsed.headers[0]);

      if (parsed.numericColumns.length > 0) setSelectedY(parsed.numericColumns[0]);
    }
  }, [selectedDatasetId, customCsvName]);

  // Handle custom CSV upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const text = event.target?.result as string;
      if (text) {
        const parsed = parseCsv(text);
        setCustomCsvName(file.name);
        setHeaders(parsed.headers);
        setCurrentRows(parsed.rows);
        setDatasetHistory([]);

        if (parsed.categoricalColumns.length > 0) setSelectedX(parsed.categoricalColumns[0]);
        else if (parsed.headers.length > 0) setSelectedX(parsed.headers[0]);

        if (parsed.numericColumns.length > 0) setSelectedY(parsed.numericColumns[0]);
      }
    };
    reader.readAsText(file);
  };

  // Column statistics
  const columnStats = useMemo(() => {
    const stats: Record<string, { mean: number; median: number; min: number; max: number; nulls: number; count: number }> = {};

    headers.forEach(h => {
      const values = currentRows.map(r => r[h]).filter(v => typeof v === 'number') as number[];
      const nullCount = currentRows.filter(r => r[h] === '' || r[h] === null || r[h] === undefined).length;

      if (values.length > 0) {
        const sorted = [...values].sort((a, b) => a - b);
        const sum = sorted.reduce((a, b) => a + b, 0);
        const mean = sum / sorted.length;
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

        stats[h] = {
          mean: Math.round(mean * 100) / 100,
          median: Math.round(median * 100) / 100,
          min: sorted[0],
          max: sorted[sorted.length - 1],
          nulls: nullCount,
          count: sorted.length,
        };
      }
    });

    return stats;
  }, [headers, currentRows]);

  // Pearson Correlation calculation
  const numericHeaders = useMemo(() => {
    return headers.filter(h => currentRows.some(r => typeof r[h] === 'number'));
  }, [headers, currentRows]);

  const correlationMatrix = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {};

    numericHeaders.forEach(varA => {
      matrix[varA] = {};
      numericHeaders.forEach(varB => {
        if (varA === varB) {
          matrix[varA][varB] = 1.0;
          return;
        }

        const validPairs = currentRows
          .filter(r => typeof r[varA] === 'number' && typeof r[varB] === 'number')
          .map(r => ({ a: r[varA] as number, b: r[varB] as number }));

        const n = validPairs.length;
        if (n < 2) {
          matrix[varA][varB] = 0;
          return;
        }

        const meanA = validPairs.reduce((s, p) => s + p.a, 0) / n;
        const meanB = validPairs.reduce((s, p) => s + p.b, 0) / n;

        let num = 0;
        let denA = 0;
        let denB = 0;

        validPairs.forEach(p => {
          const diffA = p.a - meanA;
          const diffB = p.b - meanB;
          num += diffA * diffB;
          denA += diffA * diffA;
          denB += diffB * diffB;
        });

        const r = denA * denB === 0 ? 0 : num / Math.sqrt(denA * denB);
        matrix[varA][varB] = Math.round(r * 100) / 100;
      });
    });

    return matrix;
  }, [numericHeaders, currentRows]);

  // Data Cleaning Actions with Undo
  const pushHistory = () => {
    setDatasetHistory(prev => [currentRows, ...prev.slice(0, 5)]);
  };

  const handleFillNulls = (method: 'mean' | 'zero') => {
    pushHistory();
    const updated = currentRows.map(row => {
      const copy = { ...row };
      numericHeaders.forEach(h => {
        if (copy[h] === '' || copy[h] === null || copy[h] === undefined) {
          copy[h] = method === 'mean' ? columnStats[h]?.mean || 0 : 0;
        }
      });
      return copy;
    });
    setCurrentRows(updated);
  };

  const handleDropDuplicates = () => {
    pushHistory();
    const seen = new Set<string>();
    const filtered: Record<string, string | number>[] = [];

    currentRows.forEach(row => {
      const key = JSON.stringify(row);
      if (!seen.has(key)) {
        seen.add(key);
        filtered.push(row);
      }
    });

    setCurrentRows(filtered);
  };

  const handleUndo = () => {
    if (datasetHistory.length > 0) {
      const [previous, ...rest] = datasetHistory;
      setCurrentRows(previous);
      setDatasetHistory(rest);
    }
  };

  // Grouped data for chart
  const chartData = useMemo(() => {
    if (!selectedX || !selectedY) return [];

    // Aggregate by X
    const grouped: Record<string, { sum: number; count: number }> = {};

    currentRows.forEach(row => {
      const xVal = String(row[selectedX] || 'Outros');
      const yVal = typeof row[selectedY] === 'number' ? (row[selectedY] as number) : 0;

      if (!grouped[xVal]) {
        grouped[xVal] = { sum: yVal, count: 1 };
      } else {
        grouped[xVal].sum += yVal;
        grouped[xVal].count += 1;
      }
    });

    return Object.keys(grouped).slice(0, 15).map(key => ({
      label: key,
      value: Math.round((grouped[key].sum / grouped[key].count) * 10) / 10,
    }));
  }, [selectedX, selectedY, currentRows]);

  const maxChartVal = chartData.length > 0 ? Math.max(...chartData.map(d => d.value), 1) : 1;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Database className="w-4 h-4" />
            <span>Laboratório de Análise Exploratória & Machine Learning</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Data Lab: Análise Exploratória & Gráficos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Carregue datasets de tecnologia ou importe seu próprio arquivo CSV para gerar matrizes de correlação e gráficos em tempo real.
          </p>
        </div>

        {/* Dataset Selectors & Upload */}
        <div className="flex items-center gap-2">
          <select
            value={customCsvName ? 'custom' : selectedDatasetId}
            onChange={e => {
              if (e.target.value !== 'custom') {
                setCustomCsvName(null);
                setSelectedDatasetId(e.target.value);
              }
            }}
            className="text-xs font-medium p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
          >
            {customCsvName && <option value="custom">Arquivo: {customCsvName}</option>}
            {exampleDatasets.map(d => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-colors shadow-2xs">
            <Upload className="w-3.5 h-3.5" />
            <span>Subir CSV</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Workbench Navigation Subtabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl shadow-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('grafico')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'grafico'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Visualizador Gráfico
          </button>
          <button
            onClick={() => setActiveTab('estatisticas')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'estatisticas'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Estatísticas Descritivas
          </button>
          <button
            onClick={() => setActiveTab('correlacao')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'correlacao'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Matriz de Correlação Pearson
          </button>
          <button
            onClick={() => setActiveTab('tabela')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'tabela'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Tabela de Dados ({currentRows.length} linhas)
          </button>
        </div>

        {/* Data Cleaning Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleFillNulls('mean')}
            className="px-2.5 py-1 text-[11px] font-medium rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Preencher nulos com a média da coluna"
          >
            Imputar Média
          </button>

          <button
            onClick={handleDropDuplicates}
            className="px-2.5 py-1 text-[11px] font-medium rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Remover linhas duplicadas"
          >
            Remover Duplicados
          </button>

          {datasetHistory.length > 0 && (
            <button
              onClick={handleUndo}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
              title="Desfazer última alteração de limpeza"
            >
              <Undo className="w-3 h-3" />
              <span>Desfazer</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Visualizador Gráfico */}
      {activeTab === 'grafico' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          {/* Axis controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Eixo X (Agrupamento / Categoria)
              </label>
              <select
                value={selectedX}
                onChange={e => setSelectedX(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {headers.map(h => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Eixo Y (Métrica Numérica - Média)
              </label>
              <select
                value={selectedY}
                onChange={e => setSelectedY(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {numericHeaders.map(h => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Tipo de Visualização
              </label>
              <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-800 p-0.5">
                <button
                  onClick={() => setChartType('bar-h')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                    chartType === 'bar-h' ? 'bg-indigo-600 text-white font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Barras Horizontais: 100% legível com nomes e cargos completos"
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                  <span>Horizontal (Recomendado)</span>
                </button>
                <button
                  onClick={() => setChartType('bar-v')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                    chartType === 'bar-v' ? 'bg-indigo-600 text-white font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Barras Verticais com rolagem horizontal"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Vertical</span>
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                    chartType === 'line' ? 'bg-indigo-600 text-white font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Gráfico de Linhas"
                >
                  <LineChart className="w-3.5 h-3.5" />
                  <span>Linhas</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 space-y-4">
            <div className="text-xs font-mono text-slate-500 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white">Média de {selectedY}</span>
                <span className="text-slate-400">por</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60">
                  {selectedX}
                </span>
              </div>
              <span className="text-slate-500 font-sans">
                {chartData.length} categorias identificadas
              </span>
            </div>

            {/* Empty state */}
            {chartData.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                Selecione as colunas acima para visualizar o gráfico.
              </div>
            ) : chartType === 'bar-h' ? (
              /* Modo 1: BARRAS HORIZONTAIS (100% legível, sem cortes, cargos com nome completo) */
              <div className="space-y-4 py-2">
                {chartData.map((d, idx) => {
                  const pct = Math.max(4, (d.value / maxChartVal) * 100);
                  return (
                    <div key={idx} className="space-y-1.5 p-2 rounded-lg hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition-colors">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {d.label}
                        </span>
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 ml-4 shrink-0">
                          {d.value.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="w-full h-8 bg-slate-200/80 dark:bg-slate-800/90 rounded-lg overflow-hidden flex items-center p-1">
                        <div
                          className="h-full bg-indigo-600 hover:bg-indigo-500 rounded-md transition-all duration-500 flex items-center justify-end pr-2.5 shadow-2xs"
                          style={{ width: `${pct}%` }}
                        >
                          {pct > 15 && (
                            <span className="text-[11px] font-mono font-bold text-white tracking-tight drop-shadow-xs">
                              {d.value}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : chartType === 'bar-v' ? (
              /* Modo 2: BARRAS VERTICAIS com rolagem horizontal e colunas largas para leitura perfeita */
              <div className="overflow-x-auto pt-4 pb-4">
                <div 
                  className="flex items-end justify-start gap-4 px-2 h-80"
                  style={{ minWidth: `${Math.max(chartData.length * 90, 480)}px` }}
                >
                  {chartData.map((d, idx) => {
                    const heightPct = Math.max(10, (d.value / maxChartVal) * 75);
                    return (
                      <div 
                        key={idx} 
                        className="flex-1 flex flex-col items-center justify-end h-full group"
                        style={{ minWidth: '80px', maxWidth: '140px' }}
                      >
                        {/* Value pill on top */}
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                          {d.value}
                        </span>
                        
                        {/* Bar */}
                        <div className="w-full px-2 flex items-end justify-center h-48">
                          <div
                            className="w-full max-w-16 bg-indigo-600 group-hover:bg-indigo-500 rounded-t-lg transition-all duration-300 shadow-2xs"
                            style={{ height: `${heightPct}%` }}
                          />
                        </div>

                        {/* Category label - clear multi-line without cutting */}
                        <div className="w-full pt-3 pb-1 text-center">
                          <span 
                            className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 block leading-tight break-words"
                            title={d.label}
                          >
                            {d.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Modo 3: GRÁFICO DE LINHAS com rolagem horizontal */
              <div className="overflow-x-auto pt-4 pb-4">
                <div 
                  className="h-72 flex items-end justify-start gap-4 px-4 relative"
                  style={{ minWidth: `${Math.max(chartData.length * 90, 480)}px` }}
                >
                  {chartData.map((d, idx) => {
                    const heightPct = Math.max(12, (d.value / maxChartVal) * 70);
                    return (
                      <div 
                        key={idx} 
                        className="flex-1 flex flex-col items-center justify-end h-full"
                        style={{ minWidth: '80px', maxWidth: '140px' }}
                      >
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                          {d.value}
                        </span>
                        <div 
                          className="w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-500/20 shadow-xs"
                          style={{ marginBottom: `${heightPct * 1.8}px` }}
                        />
                        <span 
                          className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 text-center block leading-tight break-words mt-2"
                          title={d.label}
                        >
                          {d.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Estatísticas Descritivas */}
      {activeTab === 'estatisticas' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Resumo Estatístico por Variável Numérica
          </h3>
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Coluna</th>
                  <th className="p-3">Média (Mean)</th>
                  <th className="p-3">Mediana (Median)</th>
                  <th className="p-3">Mínimo</th>
                  <th className="p-3">Máximo</th>
                  <th className="p-3">Valores Nulos</th>
                  <th className="p-3">Registros Válidos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                {numericHeaders.map(col => {
                  const s = columnStats[col];
                  if (!s) return null;
                  return (
                    <tr key={col}>
                      <td className="p-3 font-semibold font-sans">{col}</td>
                      <td className="p-3 text-indigo-600 dark:text-indigo-400 font-bold">{s.mean}</td>
                      <td className="p-3">{s.median}</td>
                      <td className="p-3">{s.min}</td>
                      <td className="p-3">{s.max}</td>
                      <td className="p-3">
                        {s.nulls > 0 ? (
                          <span className="text-rose-500 font-bold">{s.nulls} nulos</span>
                        ) : (
                          <span className="text-emerald-500">0</span>
                        )}
                      </td>
                      <td className="p-3">{s.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Matriz de Correlação Pearson */}
      {activeTab === 'correlacao' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Matriz de Correlação de Pearson (r)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Varia de -1.0 (correlação negativa perfeita) a +1.0 (correlação positiva perfeita). Valores próximos de 0 indicam independência linear.
            </p>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto">
            <table className="w-full text-xs text-center font-mono">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3 text-left font-sans">Variável</th>
                  {numericHeaders.map(col => (
                    <th key={col} className="p-3 font-sans truncate max-w-28">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {numericHeaders.map(rowVar => (
                  <tr key={rowVar}>
                    <td className="p-3 font-semibold text-left font-sans text-slate-700 dark:text-slate-300">
                      {rowVar}
                    </td>
                    {numericHeaders.map(colVar => {
                      const r = correlationMatrix[rowVar]?.[colVar] ?? 0;
                      let cellBg = 'bg-transparent';
                      let textColor = 'text-slate-600 dark:text-slate-300';

                      if (r >= 0.7) {
                        cellBg = 'bg-emerald-500/20';
                        textColor = 'text-emerald-600 dark:text-emerald-400 font-bold';
                      } else if (r <= -0.7) {
                        cellBg = 'bg-rose-500/20';
                        textColor = 'text-rose-600 dark:text-rose-400 font-bold';
                      } else if (Math.abs(r) >= 0.4) {
                        cellBg = 'bg-indigo-500/10';
                        textColor = 'text-indigo-600 dark:text-indigo-400 font-semibold';
                      }

                      return (
                        <td key={colVar} className={`p-3 transition-colors ${cellBg} ${textColor}`}>
                          {r.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Tabela de Dados */}
      {activeTab === 'tabela' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Visualização Bruta das Linhas do Dataset
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Exibindo as primeiras {Math.min(25, currentRows.length)} linhas
            </span>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto max-h-96">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold sticky top-0 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3 w-10 text-slate-400">#</th>
                  {headers.map(h => (
                    <th key={h} className="p-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {currentRows.slice(0, 25).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                    {headers.map(h => (
                      <td key={h} className="p-3 font-mono">
                        {String(row[h])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
