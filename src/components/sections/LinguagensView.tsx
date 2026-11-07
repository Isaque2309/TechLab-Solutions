import React, { useState } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { Linguagem } from '../../types';
import { 
  Code2, Search, Filter, ArrowRightLeft, Sparkles, 
  Check, X, Copy, ExternalLink, HelpCircle, Trophy, 
  Cpu, Layers, Zap, Play, Terminal, BookOpen, Briefcase, ChevronRight, CheckCircle2, RotateCcw
} from 'lucide-react';

export const LinguagensView: React.FC = () => {
  const languages = TECHLAB_DATA.linguagens as unknown as Linguagem[];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedLang, setSelectedLang] = useState<Linguagem>(languages[0]);
  const [viewMode, setViewMode] = useState<'catalogo' | 'comparador' | 'assistente'>('catalogo');
  const [activeLangTab, setActiveLangTab] = useState<'arquitetura' | 'exemplos' | 'mercado' | 'quiz'>('arquitetura');
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Comparator states
  const [compareLangA, setCompareLangA] = useState<Linguagem>(languages[0]);
  const [compareLangB, setCompareLangB] = useState<Linguagem>(languages[1] || languages[0]);

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

  const getLanguageMetrics = (lang: Linguagem) => {
    let velocidade = 75;
    let popularidade = 80;
    let dificuldade: 'Iniciante' | 'Intermediário' | 'Avançado' = 'Iniciante';

    const name = lang.nome.toLowerCase();
    if (name.includes('c++') || name.includes('rust') || name.includes('c ') || name === 'c') {
      velocidade = 98;
      popularidade = 88;
      dificuldade = 'Avançado';
    } else if (name.includes('go') || name.includes('zig')) {
      velocidade = 94;
      popularidade = 85;
      dificuldade = 'Intermediário';
    } else if (name.includes('java') || name.includes('c#')) {
      velocidade = 87;
      popularidade = 92;
      dificuldade = 'Intermediário';
    } else if (name.includes('javascript') || name.includes('typescript')) {
      velocidade = 82;
      popularidade = 98;
      dificuldade = name.includes('type') ? 'Intermediário' : 'Iniciante';
    } else if (name.includes('python')) {
      velocidade = 68;
      popularidade = 99;
      dificuldade = 'Iniciante';
    } else if (name.includes('html') || name.includes('css')) {
      velocidade = 90;
      popularidade = 99;
      dificuldade = 'Iniciante';
    } else if (name.includes('sql')) {
      velocidade = 92;
      popularidade = 95;
      dificuldade = 'Iniciante';
    } else if (name.includes('php') || name.includes('ruby')) {
      velocidade = 72;
      popularidade = 78;
      dificuldade = 'Iniciante';
    } else if (name.includes('kotlin') || name.includes('swift')) {
      velocidade = 88;
      popularidade = 84;
      dificuldade = 'Intermediário';
    } else if (name.includes('assembly')) {
      velocidade = 100;
      popularidade = 45;
      dificuldade = 'Avançado';
    } else if (name.includes('r') || name.includes('julia')) {
      velocidade = name.includes('julia') ? 93 : 65;
      popularidade = 70;
      dificuldade = 'Intermediário';
    }

    return { velocidade, popularidade, dificuldade };
  };

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

  // Multiple practical code examples per language
  const getCodeExamples = (lang: Linguagem) => {
    const name = lang.nome.toLowerCase();
    
    if (name.includes('python')) {
      return [
        {
          titulo: '1. Hello World & Formatação',
          codigo: 'nome = "Isaque Rocha"\nidade = 22\nprint(f"Olá mundo! Sou {nome} e tenho {idade} anos.")',
          saida: 'Olá mundo! Sou Isaque Rocha e tenho 22 anos.',
          explicacao: 'Uso de f-strings para interpolação limpa de variáveis.',
        },
        {
          titulo: '2. Estruturas Condicionais & Decisões',
          codigo: 'temperatura = 28\nif temperatura > 30:\n    print("Clima muito quente! Hidrate-se.")\nelif temperatura >= 20:\n    print("Clima agradável e ameno.")\nelse:\n    print("Clima frio!")',
          saida: 'Clima agradável e ameno.',
          explicacao: 'Blocos delimitados estritamente por indentação (4 espaços).',
        },
        {
          titulo: '3. Laços & List Comprehensions',
          codigo: 'numeros = [1, 2, 3, 4, 5, 6]\n# Gerar quadrados dos números pares\nquadrados_pares = [n**2 for n in numeros if n % 2 == 0]\nprint("Resultado:", quadrados_pares)',
          saida: 'Resultado: [4, 16, 36]',
          explicacao: 'List comprehension expressiva combinando mapeamento e filtragem.',
        },
        {
          titulo: '4. Função com Tipagem Opcional',
          codigo: 'def calcular_imc(peso: float, altura: float) -> float:\n    imc = peso / (altura ** 2)\n    return round(imc, 2)\n\nprint("IMC:", calcular_imc(74.5, 1.78))',
          saida: 'IMC: 23.51',
          explicacao: 'Type hints aumentam a manutenibilidade sem impor tipagem rígida em tempo de execução.',
        },
      ];
    } else if (name.includes('javascript') || name.includes('typescript')) {
      return [
        {
          titulo: '1. Hello World Moderno (ES6+)',
          codigo: 'const usuario = "Dev TechLab";\nconsole.log(`Bem-vindo ao ecossistema moderno, ${usuario}!`);',
          saida: 'Bem-vindo ao ecossistema moderno, Dev TechLab!',
          explicacao: 'Template literals e declaração imutável com const.',
        },
        {
          titulo: '2. Array Methods (Map & Filter)',
          codigo: 'const salarios = [3500, 5200, 8900, 12000];\nconst comAumento = salarios\n  .filter(s => s >= 5000)\n  .map(s => s * 1.1);\nconsole.log("Salários ajustados:", comAumento);',
          saida: 'Salários ajustados: [ 5720, 9790, 13200 ]',
          explicacao: 'Programação funcional encadeada com alta legibilidade.',
        },
        {
          titulo: '3. Assincronismo com Async / Await',
          codigo: 'async function buscarDados() {\n  console.log("Carregando API...");\n  // simulação de delay assíncrono\n  return { status: 200, versao: "2.5.0" };\n}\n\nbuscarDados().then(res => console.log("Resposta:", res));',
          saida: 'Carregando API...\nResposta: { status: 200, versao: \'2.5.0\' }',
          explicacao: 'Event Loop não-bloqueante orientado a eventos do V8.',
        },
      ];
    } else if (name.includes('html')) {
      return [
        {
          titulo: '1. Estrutura HTML5 Semântica',
          codigo: '<!DOCTYPE html>\n<html lang="pt-BR">\n  <head><title>TechLab</title></head>\n  <body>\n    <header><h1>TechLab 2.5</h1></header>\n    <main><p>A web semântica começa aqui.</p></main>\n  </body>\n</html>',
          saida: 'Renderizado: Cabeçalho h1 + Conteúdo semântico na árvore DOM.',
          explicacao: 'Uso de tags semânticas para acessibilidade e SEO.',
        },
      ];
    } else {
      return [
        {
          titulo: '1. Exemplo de Sintaxe Canônica',
          codigo: lang.helloWorld,
          saida: `[Saída simulada para ${lang.nome}]: Execução finalizada com código 0.`,
          explicacao: `Código estruturado no padrão canônico recomendado para ${lang.nome}.`,
        },
      ];
    }
  };

  const currentExamples = getCodeExamples(selectedLang);
  const activeExample = currentExamples[selectedExampleIndex] || currentExamples[0];
  const selectedMetrics = getLanguageMetrics(selectedLang);

  // Quick fix Quiz per language
  const getLanguageQuiz = (lang: Linguagem) => {
    const name = lang.nome.toLowerCase();
    if (name.includes('python')) {
      return {
        pergunta: 'Como o Python delimita blocos de código (corpo de funções, laços e condicionais)?',
        opcoes: [
          'Através de chaves { } obrigatórias.',
          'Através da indentação consistente (espaços em branco).',
          'Através das palavras-chave begin e end.',
          'Através de ponto e vírgula ao final de cada linha.',
        ],
        correta: 1,
        explicacao: 'Python utiliza a indentação obrigatória (PEP 8 recomenda 4 espaços) para definir a hierarquia de escopo.',
      };
    } else if (name.includes('javascript') || name.includes('typescript')) {
      return {
        pergunta: 'O que caracteriza a execução assíncrona do JavaScript no navegador e no Node.js?',
        opcoes: [
          'Múltiplas threads paralelas compartilhando a mesma memória sem travas.',
          'O Event Loop baseado em fila de mensagens e pilha de chamadas única (single-thread).',
          'Execução exclusivamente síncrona que bloqueia a interface durante requisições HTTP.',
          'Compilação estática pura antes da distribuição.',
        ],
        correta: 1,
        explicacao: 'O motor V8 do JS opera em uma thread principal orientada pelo Event Loop com chamadas assíncronas delegadas às WebAPIs ou Libuv.',
      };
    } else {
      return {
        pergunta: `Qual é o paradigma de execução predominante da linguagem ${lang.nome}?`,
        opcoes: [
          lang.specs?.paradigma || 'Multi-paradigma',
          'Apenas lógica pura sem variáveis',
          'Binário sem controle de fluxo',
          'Exclusivamente declarativo sem funções',
        ],
        correta: 0,
        explicacao: `A especificação técnica define que ${lang.nome} segue: ${lang.specs?.paradigma || 'Multi-paradigma'}.`,
      };
    }
  };

  const currentQuiz = getLanguageQuiz(selectedLang);

  // Wizard calculation
  const handleWizardChoice = (tag: string) => {
    const updated = [...wizardAnswers, tag];
    setWizardAnswers(updated);

    if (wizardStep < 2) {
      setWizardStep(s => s + 1);
    } else {
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
      <div className="bg-[#05112e]/80 backdrop-blur-md border border-blue-500/25 rounded-xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Code2 className="w-4 h-4" />
            <span>Enciclopédia de Engenharia & Aprendizado Prático</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Galeria & Centro de Aprendizado de Linguagens
          </h1>
          <p className="text-xs sm:text-sm text-blue-200/80 mt-1 max-w-3xl">
            26 linguagens dissecadas com arquitetura interna, como funcionam por baixo dos panos, simulador de código interativo, benchmarks de velocidade e assistente de carreira.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-blue-950/70 border border-blue-500/30 rounded-lg">
          <button
            onClick={() => setViewMode('catalogo')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'catalogo'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            Catálogo & Estudo
          </button>
          <button
            onClick={() => setViewMode('comparador')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'comparador'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Comparador</span>
          </button>
          <button
            onClick={() => setViewMode('assistente')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'assistente'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Qual Aprender? (Quiz)</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Catálogo com Estudo Prático */}
      {viewMode === 'catalogo' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)] border border-blue-400/40'
                      : 'bg-blue-950/60 text-blue-200/80 border border-blue-500/25 hover:bg-blue-900/40 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filtrar por nome, paradigma ou uso..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-blue-950/60 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* Main Grid: Language Cards List (Left) + Rich Learning Studio (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* List of cards */}
            <div className="lg:col-span-4 space-y-3 max-h-[820px] overflow-y-auto pr-1">
              {filteredLanguages.map(lang => {
                const isSelected = selectedLang.id === lang.id;
                const m = getLanguageMetrics(lang);

                return (
                  <div
                    key={lang.id}
                    onClick={() => {
                      setSelectedLang(lang);
                      setSelectedExampleIndex(0);
                      setTerminalOutput(null);
                      setShowQuizResult(false);
                      setQuizAnswer(null);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-900/80 to-blue-950/90 border-blue-400 shadow-[0_0_18px_rgba(37,99,235,0.3)] ring-1 ring-blue-400/40'
                        : 'bg-[#040e2b]/80 border-blue-500/20 hover:border-blue-400/50 hover:bg-blue-950/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{lang.icone || '💻'}</span>
                        <div>
                          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <span>{lang.nome}</span>
                            <span className="text-[10px] font-mono text-blue-300/70 font-normal">
                              ({lang.ano})
                            </span>
                          </h3>
                          <span className="text-[11px] text-blue-200/80 block line-clamp-1">
                            {lang.criador}
                          </span>
                        </div>
                      </div>
                      
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        m.dificuldade === 'Iniciante'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : m.dificuldade === 'Intermediário'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}>
                        {m.dificuldade}
                      </span>
                    </div>

                    <p className="text-xs text-blue-100/70 line-clamp-2 leading-relaxed mb-3">
                      {lang.utilizacaoPrincipal}
                    </p>

                    {/* Progress bars with real numbers */}
                    <div className="pt-2 border-t border-blue-500/20 grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div>
                        <div className="flex justify-between text-blue-300/80 mb-0.5">
                          <span>Velocidade:</span>
                          <span className="font-bold text-blue-400">{m.velocidade}%</span>
                        </div>
                        <div className="h-1 bg-blue-950 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${m.velocidade}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-blue-300/80 mb-0.5">
                          <span>Popularidade:</span>
                          <span className="font-bold text-emerald-400">{m.popularidade}%</span>
                        </div>
                        <div className="h-1 bg-blue-950 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${m.popularidade}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Language Deep Learning Studio */}
            <div className="lg:col-span-8 bg-[#040e2b]/90 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 shadow-xl space-y-6 sticky top-20">
              {/* Header of selected language */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 rounded-xl bg-blue-950/60 border border-blue-500/30">
                    {selectedLang.icone || '💻'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">
                        {selectedLang.nome}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600/30 text-blue-300 border border-blue-500/40">
                        {selectedLang.badge}
                      </span>
                    </div>
                    <p className="text-xs text-blue-200/80 mt-0.5">
                      Criado por <strong>{selectedLang.criador}</strong> em {selectedLang.ano} · Extensão: <code className="font-mono text-blue-400">.{selectedLang.specs?.ext || 'txt'}</code>
                    </p>
                  </div>
                </div>

                {/* Quick stats box */}
                <div className="flex items-center gap-3 bg-blue-950/80 border border-blue-500/30 px-3.5 py-2 rounded-xl text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-blue-300 block">Performance</span>
                    <span className="font-bold text-blue-400 text-sm">{selectedMetrics.velocidade}%</span>
                  </div>
                  <div className="w-px h-6 bg-blue-500/30" />
                  <div>
                    <span className="text-[10px] text-blue-300 block">Mercado Global</span>
                    <span className="font-bold text-emerald-400 text-sm">{selectedMetrics.popularidade}%</span>
                  </div>
                  <div className="w-px h-6 bg-blue-500/30" />
                  <div>
                    <span className="text-[10px] text-blue-300 block">Dificuldade</span>
                    <span className="font-bold text-amber-400 text-sm">{selectedMetrics.dificuldade}</span>
                  </div>
                </div>
              </div>

              {/* Learning Studio Navigation Subtabs */}
              <div className="flex items-center gap-2 border-b border-blue-500/20 pb-3">
                <button
                  onClick={() => setActiveLangTab('arquitetura')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeLangTab === 'arquitetura'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-blue-300 hover:text-white hover:bg-blue-900/40'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Arquitetura & Como Funciona</span>
                </button>

                <button
                  onClick={() => setActiveLangTab('exemplos')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeLangTab === 'exemplos'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-blue-300 hover:text-white hover:bg-blue-900/40'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Laboratório de Código ({currentExamples.length} Exemplos)</span>
                </button>

                <button
                  onClick={() => setActiveLangTab('mercado')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeLangTab === 'mercado'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-blue-300 hover:text-white hover:bg-blue-900/40'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Ecossistema & Mercado</span>
                </button>

                <button
                  onClick={() => setActiveLangTab('quiz')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeLangTab === 'quiz'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-blue-300 hover:text-white hover:bg-blue-900/40'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Teste de Fixação</span>
                </button>
              </div>

              {/* Subtab 1: Arquitetura & Como Funciona */}
              {activeLangTab === 'arquitetura' && (
                <div className="space-y-5">
                  <div className="bg-blue-950/40 border border-blue-500/20 p-4 rounded-xl">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1.5">
                      Visão Geral & Filosofia
                    </h3>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      {selectedLang.descricao}
                    </p>
                  </div>

                  {/* Architecture Specs 4-Card Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/25">
                      <span className="font-bold text-blue-400 block text-[11px] mb-1">Paradigma de Programação</span>
                      <p className="text-white font-medium">{selectedLang.specs?.paradigma || 'Multi-paradigma moderno'}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/25">
                      <span className="font-bold text-blue-400 block text-[11px] mb-1">Sistema de Tipagem</span>
                      <p className="text-white font-medium">{selectedLang.specs?.tipagem || 'Tipagem forte'}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/25">
                      <span className="font-bold text-blue-400 block text-[11px] mb-1">Modelo de Execução</span>
                      <p className="text-white font-medium">{selectedLang.specs?.execucao || 'Compilado / JIT'}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/25">
                      <span className="font-bold text-blue-400 block text-[11px] mb-1">Gerenciamento de Memória</span>
                      <p className="text-white font-medium">{selectedLang.specs?.memoria || 'Garbage Collector automático'}</p>
                    </div>
                  </div>

                  {/* Como funciona por baixo dos panos */}
                  {selectedLang.specs?.funcionamento && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/70 to-[#030d2e] border border-blue-500/30">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-300 mb-1.5">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Como o código roda por baixo dos panos (Runtime & Compilação)</span>
                      </div>
                      <p className="text-xs text-blue-100/90 leading-relaxed font-sans">
                        {selectedLang.specs.funcionamento}
                      </p>
                    </div>
                  )}

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
                      <span className="font-bold text-emerald-400 block text-xs">Pontos Fortes (Vantagens):</span>
                      <ul className="space-y-1 text-slate-200 text-xs">
                        {selectedLang.pros?.map((p, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1.5">
                      <span className="font-bold text-rose-400 block text-xs">Desvantagens & Cuidados:</span>
                      <ul className="space-y-1 text-slate-200 text-xs">
                        {selectedLang.contras?.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 2: Laboratório Prático de Código com Múltiplos Exemplos */}
              {activeLangTab === 'exemplos' && (
                <div className="space-y-4">
                  {/* Example Selectors */}
                  <div className="flex flex-wrap items-center gap-2">
                    {currentExamples.map((ex, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedExampleIndex(idx);
                          setTerminalOutput(null);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedExampleIndex === idx
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-blue-950/60 border border-blue-500/25 text-blue-200 hover:text-white'
                        }`}
                      >
                        {ex.titulo}
                      </button>
                    ))}
                  </div>

                  {/* Code Viewer */}
                  <div className="rounded-xl border border-blue-500/30 overflow-hidden bg-[#020719]">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-blue-950/80 border-b border-blue-500/25">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-xs font-mono text-blue-300">
                          main.{selectedLang.specs?.ext || 'txt'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTerminalOutput(activeExample.saida)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-2xs"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Simular Execução</span>
                        </button>

                        <button
                          onClick={() => copyCode(activeExample.codigo)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-medium transition-colors border border-blue-500/30"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>

                    <pre className="p-4 font-mono text-xs text-blue-100 overflow-x-auto leading-relaxed">
                      <code>{activeExample.codigo}</code>
                    </pre>

                    {/* Explicação da sintaxe */}
                    <div className="px-4 py-2.5 bg-blue-950/40 border-t border-blue-500/20 text-xs text-blue-300">
                      <strong>Explicação Didática:</strong> {activeExample.explicacao}
                    </div>

                    {/* Terminal output simulation */}
                    {terminalOutput && (
                      <div className="p-3 bg-black/90 border-t border-blue-500/30 text-xs font-mono">
                        <div className="flex items-center gap-2 text-emerald-400 mb-1 text-[11px]">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Saída do Terminal (Console):</span>
                        </div>
                        <div className="text-emerald-300 whitespace-pre-wrap pl-2 border-l-2 border-emerald-500/50">
                          {terminalOutput}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Subtab 3: Ecossistema & Mercado */}
              {activeLangTab === 'mercado' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 space-y-2">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Onde é amplamente utilizada no mercado real
                    </h3>
                    <p className="text-sm text-white font-medium">
                      {selectedLang.ondeUsa}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/20 space-y-2">
                      <span className="text-xs font-bold text-blue-300 block">Frameworks & Ferramentas do Ecossistema:</span>
                      <p className="text-xs text-blue-100/90 leading-relaxed">
                        Ao dominar {selectedLang.nome}, você terá acesso a um vasto ecossistema de bibliotecas e ferramentas de produção utilizadas pelas maiores empresas de tecnologia.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/20 space-y-2">
                      <span className="text-xs font-bold text-blue-300 block">Perfil Profissional Recomendado:</span>
                      <p className="text-xs text-blue-100/90 leading-relaxed">
                        Ideal para desenvolvedores que buscam atuar em <strong>{selectedLang.categorias.join(', ')}</strong> com alta demanda no mercado nacional e internacional.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 4: Teste de Fixação (Quiz Rápido) */}
              {activeLangTab === 'quiz' && (
                <div className="p-5 rounded-xl bg-blue-950/60 border border-blue-500/30 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                      Desafio Rápido de Fixação · {selectedLang.nome}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {currentQuiz.pergunta}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {currentQuiz.opcoes.map((opt, idx) => {
                      const isSelected = quizAnswer === idx;
                      let btnClass = 'bg-[#030a24] border-blue-500/25 text-blue-100 hover:border-blue-400';

                      if (showQuizResult) {
                        if (idx === currentQuiz.correta) {
                          btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isSelected) {
                          btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                        }
                      } else if (isSelected) {
                        btnClass = 'bg-blue-600 text-white border-blue-400 font-bold';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={showQuizResult}
                          onClick={() => {
                            setQuizAnswer(idx);
                            setShowQuizResult(true);
                          }}
                          className={`w-full p-3 rounded-lg border text-left text-xs font-medium transition-all ${btnClass}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {showQuizResult && idx === currentQuiz.correta && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResult && (
                    <div className="p-4 rounded-xl bg-blue-900/40 border border-blue-500/40 text-xs text-blue-200 space-y-3 animate-in fade-in">
                      <div>
                        <strong className="text-white block text-sm mb-1">
                          {quizAnswer === currentQuiz.correta ? '🎉 Resposta Correta! Parabéns.' : '❌ Resposta Incorreta.'}
                        </strong>
                        <p className="text-xs text-blue-100/90 leading-relaxed">{currentQuiz.explicacao}</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-blue-500/20">
                        <span className="text-[11px] text-blue-300 font-medium">Quer testar novamente?</span>
                        <button
                          type="button"
                          onClick={() => {
                            setQuizAnswer(null);
                            setShowQuizResult(false);
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Fazer de Novo</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Comparador Lado a Lado */}
      {viewMode === 'comparador' && (
        <div className="bg-[#040e2b]/90 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 shadow-xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-blue-500/20">
            <div>
              <label className="block text-xs font-semibold text-blue-300 mb-1.5">
                Primeira Linguagem:
              </label>
              <select
                value={compareLangA.id}
                onChange={e => setCompareLangA(languages.find(l => l.id === e.target.value) || languages[0])}
                className="w-full text-xs font-medium p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white focus:outline-none focus:border-blue-400"
              >
                {languages.map(l => (
                  <option key={l.id} value={l.id}>{l.nome} ({l.badge})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-300 mb-1.5">
                Segunda Linguagem:
              </label>
              <select
                value={compareLangB.id}
                onChange={e => setCompareLangB(languages.find(l => l.id === e.target.value) || languages[1])}
                className="w-full text-xs font-medium p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white focus:outline-none focus:border-blue-400"
              >
                {languages.map(l => (
                  <option key={l.id} value={l.id}>{l.nome} ({l.badge})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lang A */}
            <div className="p-5 rounded-xl bg-blue-950/50 border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{compareLangA.icone}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{compareLangA.nome}</h3>
                    <span className="text-xs text-blue-300">Lançada em {compareLangA.ano} por {compareLangA.criador}</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-blue-600/30 text-blue-300 border border-blue-500/40">
                  {getLanguageMetrics(compareLangA).dificuldade}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded bg-blue-900/30 border border-blue-500/20">
                  <span className="font-bold text-blue-300 block text-[11px]">Paradigma:</span>
                  <span className="text-white">{compareLangA.specs?.paradigma}</span>
                </div>

                <div className="p-2.5 rounded bg-blue-900/30 border border-blue-500/20">
                  <span className="font-bold text-blue-300 block text-[11px]">Tipagem:</span>
                  <span className="text-white">{compareLangA.specs?.tipagem}</span>
                </div>

                <div className="p-2.5 rounded bg-blue-900/30 border border-blue-500/20">
                  <span className="font-bold text-blue-300 block text-[11px]">Velocidade de Execução:</span>
                  <span className="text-blue-400 font-bold font-mono">{getLanguageMetrics(compareLangA).velocidade}%</span>
                </div>
              </div>
            </div>

            {/* Lang B */}
            <div className="p-5 rounded-xl bg-blue-950/50 border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{compareLangB.icone}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{compareLangB.nome}</h3>
                    <span className="text-xs text-blue-300">Lançada em {compareLangB.ano} por {compareLangB.criador}</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-blue-600/30 text-blue-300 border border-blue-500/40">
                  {getLanguageMetrics(compareLangB).dificuldade}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded bg-blue-900/30 border border-blue-500/20">
                  <span className="font-bold text-blue-300 block text-[11px]">Paradigma:</span>
                  <span className="text-white">{compareLangB.specs?.paradigma}</span>
                </div>

                <div className="p-2.5 rounded bg-blue-900/30 border border-blue-500/20">
                  <span className="font-bold text-blue-300 block text-[11px]">Tipagem:</span>
                  <span className="text-white">{compareLangB.specs?.tipagem}</span>
                </div>

                <div className="p-2.5 rounded bg-blue-900/30 border border-blue-500/20">
                  <span className="font-bold text-blue-300 block text-[11px]">Velocidade de Execução:</span>
                  <span className="text-blue-400 font-bold font-mono">{getLanguageMetrics(compareLangB).velocidade}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Assistente "Qual Aprender?" */}
      {viewMode === 'assistente' && (
        <div className="bg-[#040e2b]/90 backdrop-blur-xl border border-blue-500/30 rounded-xl p-8 shadow-xl max-w-2xl mx-auto space-y-6 text-center">
          <div>
            <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center mb-3 border border-blue-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Assistente de Escolha de Linguagem</h2>
            <p className="text-xs text-blue-200/80 mt-1">
              Descubra qual linguagem combina melhor com seus objetivos de carreira e projetos.
            </p>
          </div>

          {!wizardResult ? (
            <div className="space-y-4">
              <span className="text-xs font-mono text-blue-400">Passo {wizardStep + 1} de 3</span>
              <h3 className="text-base font-semibold text-white">
                {wizardStep === 0 && 'Qual é o seu objetivo principal na programação?'}
                {wizardStep === 1 && 'Que tipo de produto você mais quer construir?'}
                {wizardStep === 2 && 'Qual estilo de desenvolvimento você prefere?'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {wizardStep === 0 && (
                  <>
                    <button onClick={() => handleWizardChoice('web')} className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/40 text-white font-medium transition-all">
                      🌐 Criar Websites & Aplicações Modernas
                    </button>
                    <button onClick={() => handleWizardChoice('dados')} className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/40 text-white font-medium transition-all">
                      🤖 Inteligência Artificial & Ciência de Dados
                    </button>
                    <button onClick={() => handleWizardChoice('mobile')} className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/40 text-white font-medium transition-all">
                      📱 Aplicativos de Celular (iOS & Android)
                    </button>
                    <button onClick={() => handleWizardChoice('sistemas')} className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/40 text-white font-medium transition-all">
                      ⚡ Sistemas de Alto Desempenho & Games
                    </button>
                  </>
                )}

                {wizardStep === 1 && (
                  <>
                    <button onClick={() => handleWizardChoice('Iniciante')} className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/40 text-white font-medium transition-all">
                      🚀 Quero começar rápido sem configurações complexas
                    </button>
                    <button onClick={() => handleWizardChoice('backend')} className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/40 text-white font-medium transition-all">
                      🏢 Sistemas corporativos e APIs escaláveis
                    </button>
                  </>
                )}

                {wizardStep === 2 && (
                  <>
                    <button onClick={() => handleWizardChoice('tipagem')} className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/40 text-white font-medium transition-all">
                      🛡️ Segurança com tipagem forte e checagem de erros
                    </button>
                    <button onClick={() => handleWizardChoice('dinamica')} className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/40 text-white font-medium transition-all">
                      ⚡ Agilidade com tipagem dinâmica e sintaxe limpa
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Linguagens mais recomendadas para você:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {wizardResult.map(lang => (
                  <div key={lang.id} className="p-4 rounded-xl bg-blue-950/80 border border-blue-500/30 text-left space-y-2">
                    <span className="text-3xl">{lang.icone}</span>
                    <h4 className="text-sm font-bold text-white">{lang.nome}</h4>
                    <p className="text-[11px] text-blue-200/80 line-clamp-2">{lang.utilizacaoPrincipal}</p>
                    <button
                      onClick={() => {
                        setSelectedLang(lang);
                        setViewMode('catalogo');
                      }}
                      className="w-full mt-2 py-1.5 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      Estudar {lang.nome}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={resetWizard}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-950 border border-blue-500/30 text-blue-300 hover:text-white"
              >
                Refazer Questionário
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
