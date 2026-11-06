import React from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { Search, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NavSection } from '../../types';

interface TopHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ isSidebarOpen, onToggleSidebar }) => {
  const { currentSection, setIsSearchOpen } = useTechLab();

  const getSectionTitle = (sec: NavSection): string => {
    switch (sec) {
      case 'inicio': return 'Painel Geral';
      case 'apostila': return 'Apostila de Lógica & Python';
      case 'hardware3d': return 'Hardware 3D & Arquitetura';
      case 'linguagens': return 'Linguagens & Comparador';
      case 'laboratorio': return 'Laboratório de Dados (Data Lab)';
      case 'pratica':
      case 'flashcards':
      case 'quiz': return 'Prática: Flashcards 3D & Simulados';
      case 'referencia':
      case 'conceitos':
      case 'cheatsheets': return 'Consulta: Conceitos & Cheat Sheets';
      case 'carreira':
      case 'roadmaps':
      case 'guias': return 'Carreira: Roadmaps & Guias Práticos';
      case 'notas': return 'Caderno de Anotações Pessoais';
      default: return 'TechLab';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#040e2b]/85 backdrop-blur-md border-b border-blue-500/25 px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between shadow-sm">
      {/* Left: Sidebar Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            !isSidebarOpen
              ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.4)]'
              : 'text-blue-200 hover:text-white bg-blue-950/60 hover:bg-blue-900/60 border-blue-500/30'
          }`}
          title={isSidebarOpen ? "Recolher painel lateral" : "Abrir painel lateral"}
          aria-label={isSidebarOpen ? "Recolher painel lateral" : "Abrir painel lateral"}
        >
          {isSidebarOpen ? <PanelLeftClose className="w-4 h-4 text-blue-300" /> : <PanelLeftOpen className="w-4 h-4 text-white" />}
          <span>{isSidebarOpen ? 'Recolher Menu' : 'Abrir Menu'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-blue-300/80">
          <span className="hidden sm:inline text-blue-400 font-semibold">TechLab</span>
          <span className="hidden sm:inline text-blue-500/40">/</span>
          <span className="font-bold text-white truncate drop-shadow-xs">
            {getSectionTitle(currentSection)}
          </span>
        </div>
      </div>

      {/* Right: Quick Search and Dev badge */}
      <div className="flex items-center gap-2.5">
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>Fernando Brito</span>
        </div>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-blue-200 hover:text-white bg-blue-950/60 hover:bg-blue-900/60 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-colors shadow-xs"
          title="Buscar (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline font-medium">Buscar</span>
          <kbd className="hidden sm:inline-block text-[10px] font-mono text-blue-300 bg-blue-900/50 px-1 rounded border border-blue-500/30">⌘K</kbd>
        </button>
      </div>
    </header>
  );
};
