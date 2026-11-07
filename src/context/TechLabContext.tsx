import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavSection, NoteItem, Apostila, FlashcardDeck, QuizSimulado } from '../types';
import { TECHLAB_DATA } from '../data/techlabData';
import { DEFAULT_APOSTILAS, DEFAULT_FLASHCARD_DECKS, DEFAULT_QUIZ_SIMULADOS } from '../data/apostilasData';

interface TechLabContextType {
  currentSection: NavSection;
  setCurrentSection: (section: NavSection) => void;
  
  // Apostilas Management
  allApostilas: Apostila[];
  activeApostilaId: string;
  setActiveApostilaId: (id: string) => void;
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;
  completedLessons: string[];
  toggleLessonCompleted: (id: string) => void;
  isLessonCompleted: (id: string) => boolean;
  addApostila: (apostila: Omit<Apostila, 'id' | 'numero' | 'isCustom'>) => void;
  deleteApostila: (id: string) => void;
  updateApostilaPdf: (apostilaId: string, pdfUrl: string, pdfName: string) => void;
  removeApostilaPdf: (apostilaId: string) => void;
  updateLessonPdf: (lessonId: string, pdfUrl: string, pdfName: string) => void;
  removeLessonPdf: (lessonId: string) => void;
  
  // Flashcards Management
  allDecks: FlashcardDeck[];
  activeDeckId: string;
  setActiveDeckId: (id: string) => void;
  addDeck: (deck: Omit<FlashcardDeck, 'id' | 'numero' | 'isCustom'>) => void;
  deleteDeck: (id: string) => void;
  flashcardRatings: Record<string, 'errei' | 'dificil' | 'bom' | 'facil'>;
  rateFlashcard: (id: string, rating: 'errei' | 'dificil' | 'bom' | 'facil') => void;

  // Simulados / Quiz Management
  allQuizzes: QuizSimulado[];
  activeSimuladoId: string;
  setActiveSimuladoId: (id: string) => void;
  addQuiz: (quiz: Omit<QuizSimulado, 'id' | 'numero' | 'isCustom'>) => void;
  deleteQuiz: (id: string) => void;

  overallProgressPct: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  notes: NoteItem[];
  addNote: (note: Omit<NoteItem, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => void;
  updateNote: (id: string, updates: Partial<NoteItem>) => void;
  deleteNote: (id: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  navigateToLesson: (lessonId: string, apostilaId?: string) => void;
}

const TechLabContext = createContext<TechLabContextType | undefined>(undefined);

const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    titulo: 'Complexidade de Algoritmos (Big O)',
    categoria: 'Lógica',
    conteudo: 'Regra de ouro:\n- O(1): Acesso direto via hash/index\n- O(log n): Busca binária em lista ordenada\n- O(n): Varredura linear\n- O(n log n): QuickSort e MergeSort\n- O(n^2): Bubble sort / loops aninhados',
    dataCriacao: new Date(Date.now() - 86400000 * 2).toLocaleDateString('pt-BR'),
    dataAtualizacao: new Date().toLocaleDateString('pt-BR'),
  },
  {
    id: 'note-2',
    titulo: 'Cuidados na Montagem da Placa-Mãe',
    categoria: 'Hardware',
    conteudo: '1. Descarregar estática antes de mexer nas peças.\n2. Alinhar o triângulo dourado do processador com o socket.\n3. Colocar memórias RAM nos slots 2 e 4 (Dual Channel).\n4. Não esquecer de tirar o plástico do dissipador do SSD M.2!',
    dataCriacao: new Date(Date.now() - 86400000).toLocaleDateString('pt-BR'),
    dataAtualizacao: new Date().toLocaleDateString('pt-BR'),
  }
];

export const TechLabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<NavSection>('inicio');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Theme locked to dark royal mode
  const [theme] = useState<'dark'>('dark');

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('techlab_theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Locked in royal dark theme
  };

  // 1. APOSTILAS
  const [customApostilas, setCustomApostilas] = useState<Apostila[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techlab_custom_apostilas');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // PDF attachments per apostila (stored in localStorage)
  const [apostilaPdfs, setApostilaPdfs] = useState<Record<string, { url: string; name: string }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techlab_apostila_pdfs');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {};
        }
      }
    }
    return {};
  });

  const [lessonPdfs, setLessonPdfs] = useState<Record<string, { url: string; name: string }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techlab_lesson_pdfs');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {};
        }
      }
    }
    return {};
  });

  const allApostilas: Apostila[] = [
    ...DEFAULT_APOSTILAS,
    ...customApostilas,
  ].map(a => {
    const mappedAulas = a.aulas.map(aula => {
      if (lessonPdfs[aula.id]) {
        return {
          ...aula,
          pdfUrl: lessonPdfs[aula.id].url,
          pdfName: lessonPdfs[aula.id].name,
        };
      }
      return aula;
    });

    const apostPdf = apostilaPdfs[a.id];
    return {
      ...a,
      pdfUrl: apostPdf ? apostPdf.url : a.pdfUrl,
      pdfName: apostPdf ? apostPdf.name : a.pdfName,
      aulas: mappedAulas,
    };
  });

  const [activeApostilaId, setActiveApostilaId] = useState<string>(() => {
    return DEFAULT_APOSTILAS[0]?.id || 'apostila-01';
  });

  const [activeLessonId, setActiveLessonId] = useState<string>('aula-01');

  const addApostila = (newApostilaData: Omit<Apostila, 'id' | 'numero' | 'isCustom'>) => {
    const nextNum = allApostilas.length + 1;
    const newApostila: Apostila = {
      ...newApostilaData,
      id: `apostila-custom-${Date.now()}`,
      numero: nextNum,
      isCustom: true,
    };
    const updated = [...customApostilas, newApostila];
    setCustomApostilas(updated);
    localStorage.setItem('techlab_custom_apostilas', JSON.stringify(updated));
    setActiveApostilaId(newApostila.id);
    if (newApostila.aulas[0]) {
      setActiveLessonId(newApostila.aulas[0].id);
    }
  };

  const updateApostilaPdf = (apostilaId: string, pdfUrl: string, pdfName: string) => {
    setApostilaPdfs(prev => {
      const updated = { ...prev, [apostilaId]: { url: pdfUrl, name: pdfName } };
      localStorage.setItem('techlab_apostila_pdfs', JSON.stringify(updated));
      return updated;
    });
  };

  const removeApostilaPdf = (apostilaId: string) => {
    setApostilaPdfs(prev => {
      const updated = { ...prev };
      delete updated[apostilaId];
      localStorage.setItem('techlab_apostila_pdfs', JSON.stringify(updated));
      return updated;
    });
  };

  const updateLessonPdf = (lessonId: string, pdfUrl: string, pdfName: string) => {
    setLessonPdfs(prev => {
      const updated = { ...prev, [lessonId]: { url: pdfUrl, name: pdfName } };
      localStorage.setItem('techlab_lesson_pdfs', JSON.stringify(updated));
      return updated;
    });
  };

  const removeLessonPdf = (lessonId: string) => {
    setLessonPdfs(prev => {
      const updated = { ...prev };
      delete updated[lessonId];
      localStorage.setItem('techlab_lesson_pdfs', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteApostila = (id: string) => {
    const updated = customApostilas.filter(a => a.id !== id);
    setCustomApostilas(updated);
    localStorage.setItem('techlab_custom_apostilas', JSON.stringify(updated));
    if (activeApostilaId === id) {
      setActiveApostilaId(DEFAULT_APOSTILAS[0]?.id || 'apostila-01');
      setActiveLessonId('aula-01');
    }
  };

  // 2. FLASHCARD DECKS
  const [customDecks, setCustomDecks] = useState<FlashcardDeck[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techlab_custom_decks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const allDecks: FlashcardDeck[] = [
    ...DEFAULT_FLASHCARD_DECKS,
    ...customDecks,
  ];

  const [activeDeckId, setActiveDeckId] = useState<string>(() => {
    return DEFAULT_FLASHCARD_DECKS[0]?.id || 'deck-01';
  });

  const addDeck = (newDeckData: Omit<FlashcardDeck, 'id' | 'numero' | 'isCustom'>) => {
    const nextNum = allDecks.length + 1;
    const newDeck: FlashcardDeck = {
      ...newDeckData,
      id: `deck-custom-${Date.now()}`,
      numero: nextNum,
      isCustom: true,
    };
    const updated = [...customDecks, newDeck];
    setCustomDecks(updated);
    localStorage.setItem('techlab_custom_decks', JSON.stringify(updated));
    setActiveDeckId(newDeck.id);
  };

  const deleteDeck = (id: string) => {
    const updated = customDecks.filter(d => d.id !== id);
    setCustomDecks(updated);
    localStorage.setItem('techlab_custom_decks', JSON.stringify(updated));
    if (activeDeckId === id) {
      setActiveDeckId(DEFAULT_FLASHCARD_DECKS[0]?.id || 'deck-01');
    }
  };

  // 3. QUIZ SIMULADOS
  const [customQuizzes, setCustomQuizzes] = useState<QuizSimulado[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techlab_custom_quizzes');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const allQuizzes: QuizSimulado[] = [
    ...DEFAULT_QUIZ_SIMULADOS,
    ...customQuizzes,
  ];

  const [activeSimuladoId, setActiveSimuladoId] = useState<string>(() => {
    return DEFAULT_QUIZ_SIMULADOS[0]?.id || 'simulado-01';
  });

  const addQuiz = (newQuizData: Omit<QuizSimulado, 'id' | 'numero' | 'isCustom'>) => {
    const nextNum = allQuizzes.length + 1;
    const newQuiz: QuizSimulado = {
      ...newQuizData,
      id: `simulado-custom-${Date.now()}`,
      numero: nextNum,
      isCustom: true,
    };
    const updated = [...customQuizzes, newQuiz];
    setCustomQuizzes(updated);
    localStorage.setItem('techlab_custom_quizzes', JSON.stringify(updated));
    setActiveSimuladoId(newQuiz.id);
  };

  const deleteQuiz = (id: string) => {
    const updated = customQuizzes.filter(q => q.id !== id);
    setCustomQuizzes(updated);
    localStorage.setItem('techlab_custom_quizzes', JSON.stringify(updated));
    if (activeSimuladoId === id) {
      setActiveSimuladoId(DEFAULT_QUIZ_SIMULADOS[0]?.id || 'simulado-01');
    }
  };

  // Completed Lessons
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techlab_completed_lessons');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return ['aula-01'];
  });

  const toggleLessonCompleted = (id: string) => {
    setCompletedLessons(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('techlab_completed_lessons', JSON.stringify(updated));
      return updated;
    });
  };

  const isLessonCompleted = (id: string) => completedLessons.includes(id);

  const totalLessons = TECHLAB_DATA.apostila.aulas.length;
  const overallProgressPct = Math.round((completedLessons.length / totalLessons) * 100);

  // Notes
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techlab_notes');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_NOTES;
        }
      }
    }
    return INITIAL_NOTES;
  });

  const saveNotes = (updated: NoteItem[]) => {
    setNotes(updated);
    localStorage.setItem('techlab_notes', JSON.stringify(updated));
  };

  const addNote = (noteData: Omit<NoteItem, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    const today = new Date().toLocaleDateString('pt-BR');
    const newNote: NoteItem = {
      ...noteData,
      id: `note-${Date.now()}`,
      dataCriacao: today,
      dataAtualizacao: today,
    };
    saveNotes([newNote, ...notes]);
  };

  const updateNote = (id: string, updates: Partial<NoteItem>) => {
    const updated = notes.map(n =>
      n.id === id ? { ...n, ...updates, dataAtualizacao: new Date().toLocaleDateString('pt-BR') } : n
    );
    saveNotes(updated);
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id));
  };

  // Flashcard Ratings
  const [flashcardRatings, setFlashcardRatings] = useState<Record<string, 'errei' | 'dificil' | 'bom' | 'facil'>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techlab_flashcard_ratings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {};
        }
      }
    }
    return {};
  });

  const rateFlashcard = (id: string, rating: 'errei' | 'dificil' | 'bom' | 'facil') => {
    setFlashcardRatings(prev => {
      const updated = { ...prev, [id]: rating };
      localStorage.setItem('techlab_flashcard_ratings', JSON.stringify(updated));
      return updated;
    });
  };

  const navigateToLesson = (lessonId: string, apostilaId?: string) => {
    if (apostilaId) setActiveApostilaId(apostilaId);
    setActiveLessonId(lessonId);
    setCurrentSection('apostila');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <TechLabContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        allApostilas,
        activeApostilaId,
        setActiveApostilaId,
        activeLessonId,
        setActiveLessonId,
        completedLessons,
        toggleLessonCompleted,
        isLessonCompleted,
        addApostila,
        deleteApostila,
        updateApostilaPdf,
        removeApostilaPdf,
        updateLessonPdf,
        removeLessonPdf,
        allDecks,
        activeDeckId,
        setActiveDeckId,
        addDeck,
        deleteDeck,
        flashcardRatings,
        rateFlashcard,
        allQuizzes,
        activeSimuladoId,
        setActiveSimuladoId,
        addQuiz,
        deleteQuiz,
        overallProgressPct,
        theme,
        toggleTheme,
        notes,
        addNote,
        updateNote,
        deleteNote,
        isSearchOpen,
        setIsSearchOpen,
        navigateToLesson,
      }}
    >
      {children}
    </TechLabContext.Provider>
  );
};

export const useTechLab = () => {
  const context = useContext(TechLabContext);
  if (!context) {
    throw new Error('useTechLab must be used within a TechLabProvider');
  }
  return context;
};
