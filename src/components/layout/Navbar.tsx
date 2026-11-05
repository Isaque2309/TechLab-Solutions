import React, { useState } from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { NavSection } from '../../types';
import { Search, Sun, Moon, BookOpen, Cpu, Code2, Database, Library, Sparkles, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentSection, setCurrentSection, theme, toggleTheme, setIsSearchOpen, overallProgressPct } = useTechLab();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryNavItems: { id: NavSection; label: string; icon: React.ReactNode }[] = [
    { id: 'inicio', label: 'Início', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'apostila', label: 'Apostila', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'hardware3d', label: 'Hardware 3D', icon: <Cpu className="w-4 h-4" /> },
    { id: 'linguagens', label: 'Linguagens', icon: <Code2 className="w-4 h-4" /> },
    { id: 'laboratorio', label: 'Laboratório', icon: <Database className="w-4 h-4" /> },
    { id: 'conceitos', label: 'Conceitos', icon: <Library className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: NavSection) => {
    setCurrentSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('inicio')}
              className="group flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-indigo-500 transition-colors">
                TL
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0">
                Tech<span className="text-indigo-600 dark:text-indigo-400">Lab</span>
              </span>
            </button>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-3">
              {overallProgressPct}% concluído
            </span>
          </div>

          {/* Zone 2: Nav Links (Clean typography, whitespace-nowrap) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {primaryNavItems.map(item => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                    isActive
                      ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Theme Toggle, Mobile Toggle) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
              title="Buscar na plataforma (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buscar...</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              aria-label="Alternar tema"
              title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {[
              ...primaryNavItems,
              { id: 'flashcards' as NavSection, label: 'Flashcards', icon: null },
              { id: 'quiz' as NavSection, label: 'Quiz Técnico', icon: null },
              { id: 'roadmaps' as NavSection, label: 'Roadmaps', icon: null },
              { id: 'cheatsheets' as NavSection, label: 'Cheatsheets', icon: null },
              { id: 'guias' as NavSection, label: 'Guias Práticos', icon: null },
              { id: 'notas' as NavSection, label: 'Caderno de Notas', icon: null },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentSection === item.id
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
