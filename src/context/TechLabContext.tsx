import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavSection, NoteItem } from '../types';
import { TECHLAB_DATA } from '../data/techlabData';

interface TechLabContextType {
  currentSection: NavSection;
  setCurrentSection: (section: NavSection) => void;
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;
  completedLessons: string[];
  toggleLessonCompleted: (id: string) => void;
  isLessonCompleted: (id: string) => boolean;
  overallProgressPct: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  notes: NoteItem[];
  addNote: (note: Omit<NoteItem, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => void;
  updateNote: (id: string, updates: Partial<NoteItem>) => void;
  deleteNote: (id: string) => void;
  flashcardRatings: Record<string, 'errei' | 'dificil' | 'bom' | 'facil'>;
  rateFlashcard: (id: string, rating: 'errei' | 'dificil' | 'bom' | 'facil') => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  navigateToLesson: (lessonId: string) => void;
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
  const [activeLessonId, setActiveLessonId] = useState<string>('aula-01');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Theme is locked to dark royal mode
  const [theme] = useState<'dark'>('dark');

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('techlab_theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Theme switching disabled by user request
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
    return ['aula-01']; // Start with first lesson checked as demo
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

  const saveNotes = (newNotes: NoteItem[]) => {
    setNotes(newNotes);
    localStorage.setItem('techlab_notes', JSON.stringify(newNotes));
  };

  const addNote = (note: Omit<NoteItem, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    const today = new Date().toLocaleDateString('pt-BR');
    const newNote: NoteItem = {
      ...note,
      id: 'note-' + Date.now(),
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

  // Flashcards
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

  const navigateToLesson = (lessonId: string) => {
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
        activeLessonId,
        setActiveLessonId,
        completedLessons,
        toggleLessonCompleted,
        isLessonCompleted,
        overallProgressPct,
        theme,
        toggleTheme,
        notes,
        addNote,
        updateNote,
        deleteNote,
        flashcardRatings,
        rateFlashcard,
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
