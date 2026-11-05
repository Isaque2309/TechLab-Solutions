export type NavSection =
  | 'inicio'
  | 'apostila'
  | 'hardware3d'
  | 'linguagens'
  | 'laboratorio'
  | 'pratica'
  | 'referencia'
  | 'carreira'
  | 'notas'
  | 'conceitos'
  | 'flashcards'
  | 'quiz'
  | 'roadmaps'
  | 'cheatsheets'
  | 'guias';

export interface MiniExercicio {
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}

export interface ApostilaAula {
  id: string;
  unidadeId: string;
  numero: number;
  titulo: string;
  tempo: string;
  teoria: string;
  exemploPython: string;
  explicacaoCodigo: string;
  miniExercicio?: MiniExercicio;
}

export interface ApostilaUnidade {
  id: string;
  numero: number;
  titulo: string;
  descricao: string;
  aulasIds: string[];
}

export interface SimuladoPergunta {
  pergunta: string;
  opcoes: string[];
  correta: number;
  comentario: string;
}

export interface LinguagemSpecs {
  execucao: string;
  tipagem: string;
  memoria: string;
  paradigma: string;
  ext: string;
  funcionamento: string;
  concorrencia?: string;
  dificuldade?: string;
  popularidade?: number;
  velocidade?: number;
}

export interface QuizArea {
  id: string;
  nome: string;
}

export interface Linguagem {
  id: string;
  nome: string;
  utilizacaoPrincipal: string;
  criador: string;
  ano: number;
  badge: string;
  categorias: string[];
  nivel: string;
  icone: string;
  cor: string;
  descricao: string;
  ondeUsa: string;
  pros: string[];
  contras: string[];
  helloWorld: string;
  specs: LinguagemSpecs;
}

export interface Conceito {
  termo: string;
  trilha: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado' | string;
  definicao: string;
  exemploReal: string;
  codigo?: string;
}

export interface DatasetExemplo {
  id: string;
  nome: string;
  descricao: string;
  csv: string;
}

export interface Flashcard {
  id: string;
  categoria: string;
  pergunta: string;
  resposta: string;
  analogia?: string;
}

export interface QuizPergunta {
  id: string;
  area: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export interface RoadmapFase {
  nivel: string;
  tempo: string;
  competencias: string[];
  projetos: string;
  certificacoes: string;
}

export interface Roadmap {
  id: string;
  titulo: string;
  icone: string;
  salarioMedio: string;
  descricao: string;
  fases: RoadmapFase[];
}

export interface CheatsheetSnippet {
  titulo: string;
  codigo: string;
  explicacao: string;
}

export interface Cheatsheet {
  id: string;
  titulo: string;
  categoria: string;
  icone: string;
  snippets: CheatsheetSnippet[];
}

export interface GuiaPasso {
  numero: number;
  titulo: string;
  conteudo: string;
  dica?: string;
  checklist?: string[];
}

export interface Guia {
  id: string;
  titulo: string;
  subtitulo: string;
  icone: string;
  duracao: string;
  categoria: string;
  passos: GuiaPasso[];
}

export interface NoteItem {
  id: string;
  titulo: string;
  categoria: string;
  conteudo: string;
  dataCriacao: string;
  dataAtualizacao: string;
}
