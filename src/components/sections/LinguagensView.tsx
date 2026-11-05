import React, { useState } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { Linguagem } from '../../types';
import { 
  Code2, Search, Filter, ArrowRightLeft, Sparkles, 
  Check, X, Copy, ExternalLink, HelpCircle, Trophy 
} from 'lucide-react';

export const LinguagensView: React.FC = () => {
  const languages = TECHLAB_DATA.linguagens as unknown as Linguagem[];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedLang, setSelectedLang] = useState<Linguagem>(languages[0]);
  const [viewMode, setViewMode] = useState<'catalogo' | 'comparador' | 'assistente'>('catalogo');

  // Comparator states
  const [compareLangA, setCompareLangA] = useState<Linguagem>(languages[0]); // Python
  const [compareLangB, setCompareLangB] = useState<Linguagem>(languages[1] || languages[0]); // JavaScript

  // Wizard states
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardAnswers, setWizardAnswers] = useState<string[]>([]);
  const [wizardResult, setWizardResult] = useState<Linguagem[] | null>(null);

  const categories = [
    { id: 'todos', label: 'Todas as 26' },
    { id: 'web', label: 'Web & Frontend' },
    { id: 'dados', label: 'Ciência de Dados & IA' },
    { id: 'sistemas', label: 'Sistemas & Baixo Nível' },
    { id: 'mobile', label: 'Mobile (iOS & Android)' },
    { id: 'backend', label: 'Backend & APIs' },
  ];

  const filteredLanguages = languages.filter(lang => {
    const matchesSearch =
      lang.nome.toLowerCase().includes(search.toLowerCase()) ||
      lang.descricao.toLowerCase().includes(search.toLowerCase()) ||
      lang.utilizacaoPrincipal.toLowerCase().includes(search.toLowerCase());

    if (selectedCategory === 'todos') return matchesSearch;
    return matchesSearch && lang.categorias.includes(selectedCategory);
  });

  const [copied, setCopied] = useState(false);
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run wizard calculation
  const handleWizardChoice = (tag: string) => {
    const updated = [...wizardAnswers, tag];
    setWizardAnswers(updated);

    if (wizardStep < 2) {
      setWizardStep(s => s + 1);
    } else {
      // Calculate best recommendation
      const scored = languages.map(lang => {
        let score = 0;
        updated.forEach(t => {
          if (lang.categorias.includes(t)) score += 3;
          if (lang.descricao.toLowerCase().includes(t.toLowerCase())) score += 1;
        });
        return { lang, score };
      });
      scored.sort((a, b) => b.score - a.score);
      setWizardResult(scored.slice(0, 3).map(s => s.lang));
    }
  };

  const resetWizard = () => {
    setWizardStep(0);
    setWizardAnswers([]);
    setWizardResult(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <Code2 className="w-4 h-4" />
            <span>Enciclopédia & Engenharia de Linguagens</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Galeria de Linguagens de Programação
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            26 linguagens dissecadas com sintaxe Hello World, paradigmas, benchmarks de velocidade e assistente de recomendação.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setViewMode('catalogo')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'catalogo'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Catálogo
          </button>
          <button
            onClick={() => setViewMode('comparador')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'comparador'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Comparador Lado a Lado</span>
          </button>
          <button
            onClick={() => setViewMode('assistente')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'assistente'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Qual Escolher? (Wizard)</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Catálogo */}
      {viewMode === 'catalogo' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filtrar por nome ou uso..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Languages Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[750px] overflow-y-auto pr-1">
              {filteredLanguages.map(lang => {
                const isSelected = selectedLang.id === lang.id;
                return (
                  <div
                    key={lang.id}
                    onClick={() => setSelectedLang(lang)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/40 border-indigo-500 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{lang.icone || '💻'}</span>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {lang.nome}
                          </h3>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                            {lang.ano} · {lang.criador}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {lang.nivel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {lang.utilizacaoPrincipal}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Velocidade: {lang.specs?.velocidade || 70}%</span>
                      <span>Popularidade: {lang.specs?.popularidade || 80}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Language Deep-Dive */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4 sticky top-20">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedLang.icone || '💻'}</span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {selectedLang.nome}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Criado por {selectedLang.criador} ({selectedLang.ano})
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    {selectedLang.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedLang.descricao}
                </p>

                {/* Specs bars */}
                <div className="space-y-2 pt-1 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Velocidade de Execução:</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedLang.specs?.velocidade}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${selectedLang.specs?.velocidade}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Adoção no Mercado:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedLang.specs?.popularidade}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${selectedLang.specs?.popularidade}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[11px]">Pontos Fortes:</span>
                    <ul className="space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                      {selectedLang.pros?.slice(0, 3).map((p, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 space-y-1">
                    <span className="font-bold text-rose-600 dark:text-rose-400 block text-[11px]">Desvantagens:</span>
                    <ul className="space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                      {selectedLang.contras?.slice(0, 3).map((c, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <X className="w-3 h-3 text-rose-500 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hello World Code */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>Sintaxe Hello World</span>
                    <button
                      onClick={() => copyCode(selectedLang.helloWorld)}
                      className="flex items-center gap-1 text-indigo-500 hover:text-indigo-400"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-950 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                    {selectedLang.helloWorld}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Comparador Lado a Lado */}
      {viewMode === 'comparador' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lang A Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Linguagem A
              </label>
              <select
                value={compareLangA.id}
                onChange={e => {
                  const found = languages.find(l => l.id === e.target.value);
                  if (found) setCompareLangA(found);
                }}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none"
              >
                {languages.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.nome} ({l.ano})
                  </option>
                ))}
              </select>
            </div>

            {/* Lang B Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Linguagem B
              </label>
              <select
                value={compareLangB.id}
                onChange={e => {
                  const found = languages.find(l => l.id === e.target.value);
                  if (found) setCompareLangB(found);
                }}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none"
              >
                {languages.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.nome} ({l.ano})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3 w-1/4">Critério</th>
                  <th className="p-3 w-3/8 text-indigo-600 dark:text-indigo-400 font-bold">{compareLangA.nome}</th>
                  <th className="p-3 w-3/8 text-emerald-600 dark:text-emerald-400 font-bold">{compareLangB.nome}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Criador & Ano</td>
                  <td className="p-3 font-mono">{compareLangA.criador} ({compareLangA.ano})</td>
                  <td className="p-3 font-mono">{compareLangB.criador} ({compareLangB.ano})</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Sistema de Tipagem</td>
                  <td className="p-3">{compareLangA.specs?.tipagem || 'Dinâmica'}</td>
                  <td className="p-3">{compareLangB.specs?.tipagem || 'Estática'}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Modelo de Execução</td>
                  <td className="p-3">{compareLangA.specs?.execucao || 'Interpretada / Bytecode'}</td>
                  <td className="p-3">{compareLangB.specs?.execucao || 'Compilada / JIT'}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Concorrência</td>
                  <td className="p-3">{compareLangA.specs?.concorrencia || 'Async/Await'}</td>
                  <td className="p-3">{compareLangB.specs?.concorrencia || 'Threads / Goroutines'}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Velocidade Benchmark</td>
                  <td className="p-3 font-mono font-bold text-indigo-500">{compareLangA.specs?.velocidade}%</td>
                  <td className="p-3 font-mono font-bold text-emerald-500">{compareLangB.specs?.velocidade}%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Curva de Aprendizado</td>
                  <td className="p-3">{compareLangA.specs?.dificuldade || 'Média'}</td>
                  <td className="p-3">{compareLangB.specs?.dificuldade || 'Média'}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Foco Principal</td>
                  <td className="p-3">{compareLangA.utilizacaoPrincipal}</td>
                  <td className="p-3">{compareLangB.utilizacaoPrincipal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mode 3: Assistente Interativo (Wizard) */}
      {viewMode === 'assistente' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs max-w-2xl mx-auto space-y-6">
          {!wizardResult ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Pergunta {wizardStep + 1} de 3</span>
                <span className="font-mono">{Math.round(((wizardStep + 1) / 3) * 100)}%</span>
              </div>

              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${((wizardStep + 1) / 3) * 100}%` }}
                />
              </div>

              {wizardStep === 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Qual é o seu objetivo de carreira prioritário?
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { tag: 'web', text: 'Desenvolvimento Web moderno (criar websites, interfaces e plataformas)' },
                      { tag: 'dados', text: 'Inteligência Artificial, Ciência de Dados, Machine Learning e automação' },
                      { tag: 'sistemas', text: 'Sistemas de alta performance, jogos, drivers ou baixo nível' },
                      { tag: 'mobile', text: 'Aplicativos para celulares (iOS e Android nativos)' },
                    ].map(opt => (
                      <button
                        key={opt.tag}
                        onClick={() => handleWizardChoice(opt.tag)}
                        className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-indigo-500 text-left text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 1 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Como você prefere lidar com o rigor do código?
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { tag: 'dinamica', text: 'Quero facilidade e prototipagem rápida sem declarar tipos manuais' },
                      { tag: 'estatica', text: 'Quero tipagem estática e segurança do compilador para evitar bugs' },
                      { tag: 'concorrente', text: 'Quero dominar microsserviços rápidos e sistemas concorrentes' },
                    ].map(opt => (
                      <button
                        key={opt.tag}
                        onClick={() => handleWizardChoice(opt.tag)}
                        className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-indigo-500 text-left text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Qual ambiente de execução você pretende rodar seus projetos?
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { tag: 'cloud', text: 'Nuvem (AWS, GCP), containers Docker e APIs distribuídas' },
                      { tag: 'browser', text: 'No navegador dos usuários com React, Vue ou TypeScript' },
                      { tag: 'hardware', text: 'Direto no hardware físico com controle manual de memória' },
                    ].map(opt => (
                      <button
                        key={opt.tag}
                        onClick={() => handleWizardChoice(opt.tag)}
                        className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-indigo-500 text-left text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Result */
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Recomendação Personalizada para o seu Perfil!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Com base nos seus objetivos e preferências de arquitetura, estas são as 3 linguagens ideais para você focar:
              </p>

              <div className="space-y-3 pt-2 text-left">
                {wizardResult.map((lang, idx) => (
                  <div
                    key={lang.id}
                    className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/30 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold flex items-center justify-center text-sm">
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang.nome} ({lang.ano})
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                          {lang.utilizacaoPrincipal}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedLang(lang);
                        setViewMode('catalogo');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={resetWizard}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Refazer Perguntas
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
