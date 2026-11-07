import React from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { NavSection } from '../../types';
import { 
  Sparkles, BookOpen, Cpu, Code2, Database, Layers, 
  Library, Map, FileText, Search, X, PanelLeftClose
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavGroupItem {
  id: NavSection;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { 
    currentSection, 
    setCurrentSection, 
    setIsSearchOpen, 
    completedLessons, 
    notes 
  } = useTechLab();

  // Primary navigation grouped logically
  const navGroups: { group: string; items: NavGroupItem[] }[] = [
    {
      group: 'Visão Geral',
      items: [
        { id: 'inicio', label: 'Painel Geral', icon: Sparkles },
      ],
    },
    {
      group: 'Formação & Laboratórios',
      items: [
        { id: 'apostila', label: 'Apostila & Simuladores', icon: BookOpen },
        { id: 'hardware3d', label: 'Hardware 3D & PC', icon: Cpu },
        { id: 'linguagens', label: 'Linguagens & Comparador', icon: Code2 },
        { id: 'laboratorio', label: 'Laboratório de Dados', icon: Database },
      ],
    },
    {
      group: 'Treino & Referência',
      items: [
        { id: 'pratica', label: 'Flashcards & Quiz', icon: Layers },
        { id: 'referencia', label: 'Conceitos & Cheatsheets', icon: Library },
        { id: 'carreira', label: 'Carreira & Guias Práticos', icon: Map },
      ],
    },
    {
      group: 'Caderno',
      items: [
        { id: 'notas', label: 'Caderno de Anotações', icon: FileText },
      ],
    },
  ];

  const handleSelect = (id: NavSection) => {
    setCurrentSection(id);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if item is active (including aliases)
  const isItemActive = (id: NavSection) => {
    if (currentSection === id) return true;
    if (id === 'pratica' && (currentSection === 'flashcards' || currentSection === 'quiz')) return true;
    if (id === 'referencia' && (currentSection === 'conceitos' || currentSection === 'cheatsheets')) return true;
    if (id === 'carreira' && (currentSection === 'roadmaps' || currentSection === 'guias')) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container with Royal Blue Cyber Theme */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#040e2b]/95 backdrop-blur-xl border-r border-blue-500/25 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand */}
        <div>
          <div className="flex items-center justify-between p-5 border-b border-blue-500/20">
            <button
              onClick={() => handleSelect('inicio')}
              className="flex items-center gap-2.5 text-left focus-visible:outline-none group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_12px_rgba(37,99,235,0.4)] border border-blue-400/30">
                TL
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight">
                  Tech<span className="text-blue-400">Lab</span>
                </span>
                <span className="text-[10px] text-blue-300/70 block -mt-0.5 font-medium">
                  Plataforma de Análise Tech
                </span>
              </div>
            </button>

            {/* Close / Collapse button for both desktop and mobile */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-blue-300 hover:text-white rounded-lg hover:bg-blue-900/40 border border-blue-500/30 transition-colors text-xs font-medium"
              title="Fechar / Recolher painel lateral"
            >
              <X className="w-4 h-4 md:hidden" />
              <PanelLeftClose className="w-4 h-4 hidden md:block" />
              <span className="hidden md:inline text-[11px]">Recolher</span>
            </button>
          </div>

          {/* Quick Search Button */}
          <div className="px-4 pt-4">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-blue-200/80 hover:text-white bg-blue-950/60 hover:bg-blue-900/50 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-colors shadow-inner"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-blue-400" />
                <span>Buscar em tudo...</span>
              </span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-900/60 border border-blue-500/40 rounded text-blue-300">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navGroups.map(group => (
            <div key={group.group} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-blue-400/70 uppercase tracking-wider">
                {group.group}
              </div>

              <div className="space-y-1">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const active = isItemActive(item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.35)] border border-blue-400/40'
                          : 'text-blue-100/80 hover:bg-blue-900/40 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-blue-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Panel: Signature & Brand */}
        <div className="p-4 border-t border-blue-500/25 bg-[#030c27]/85 backdrop-blur-md space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-extrabold text-blue-400 tracking-wider">
              CHEETOOSSS
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Online
            </span>
          </div>

          <div className="text-left border-t border-blue-500/20 pt-2 space-y-0.5">
            <div className="text-xs font-bold text-white tracking-tight">
              Desenvolvido por Isaque Rocha
            </div>
            <div className="text-[10px] font-medium text-blue-300/80">
              Tecnologia & Desenvolvimento Web
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
