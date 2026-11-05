import React from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { NavSection } from '../../types';
import { 
  Sparkles, BookOpen, Cpu, Code2, Database, Library, 
  Layers, HelpCircle, Map, FileCode, Wrench, FileText 
} from 'lucide-react';

interface SubnavItem {
  id: NavSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Subnav: React.FC = () => {
  const { currentSection, setCurrentSection } = useTechLab();

  const navItems: SubnavItem[] = [
    { id: 'inicio', label: 'Painel Geral', icon: Sparkles },
    { id: 'apostila', label: 'Apostila & Simuladores', icon: BookOpen },
    { id: 'hardware3d', label: 'Hardware 3D', icon: Cpu },
    { id: 'linguagens', label: 'Linguagens', icon: Code2 },
    { id: 'laboratorio', label: 'Laboratório de Dados', icon: Database },
    { id: 'conceitos', label: 'Conceitos Tech', icon: Library },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'roadmaps', label: 'Roadmaps', icon: Map },
    { id: 'cheatsheets', label: 'Cheatsheets', icon: FileCode },
    { id: 'guias', label: 'Guias Práticos', icon: Wrench },
    { id: 'notas', label: 'Anotações', icon: FileText },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentSection(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200 dark:border-slate-700 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
