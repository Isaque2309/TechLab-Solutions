import React, { useState } from 'react';
import { TechLabProvider, useTechLab } from './context/TechLabContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Views
import { InicioView } from './components/sections/InicioView';
import { ApostilaView } from './components/sections/ApostilaView';
import { Hardware3DView } from './components/sections/Hardware3DView';
import { LinguagensView } from './components/sections/LinguagensView';
import { LaboratorioDadosView } from './components/sections/LaboratorioDadosView';
import { PraticaView } from './components/sections/PraticaView';
import { ReferenciaView } from './components/sections/ReferenciaView';
import { CarreiraView } from './components/sections/CarreiraView';
import { NotasView } from './components/sections/NotasView';

const MainLayout: React.FC = () => {
  const { currentSection } = useTechLab();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen relative text-slate-100 flex transition-colors selection:bg-blue-600 selection:text-white bg-[#020817]">
      {/* Background Image Layer with Royal Blue Cyber Glow */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed pointer-events-none"
        style={{ backgroundImage: `url('/assets/aistudio/image_fdf488d6.png')` }}
      >
        {/* Royal Blue Semi-transparent Dark Tech Gradient Overlay for Optimal Readability */}
        <div className="absolute inset-0 bg-[#020819]/80 backdrop-blur-[2px] bg-gradient-to-b from-[#030d30]/75 via-[#02071a]/85 to-[#010411]/95" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex w-full min-h-screen">
        {/* Sidebar (painel lateral) */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <GlobalSearchModal />

        {/* Main Workspace Column */}
        <div className={`flex-1 flex flex-col w-full min-w-0 transition-all duration-300 ${isSidebarOpen ? 'md:pl-72' : 'md:pl-0'}`}>
          <TopHeader 
            isSidebarOpen={isSidebarOpen} 
            onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} 
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {currentSection === 'inicio' && <InicioView />}
            {currentSection === 'apostila' && <ApostilaView />}
            {currentSection === 'hardware3d' && <Hardware3DView />}
            {currentSection === 'linguagens' && <LinguagensView />}
            {currentSection === 'laboratorio' && <LaboratorioDadosView />}

            {/* Prática: Junção de Flashcards 3D & Simulados */}
            {(currentSection === 'pratica' || currentSection === 'flashcards' || currentSection === 'quiz') && (
              <PraticaView initialTab={currentSection === 'quiz' ? 'quiz' : 'flashcards'} />
            )}

            {/* Referência: Junção de Conceitos & Cheatsheets */}
            {(currentSection === 'referencia' || currentSection === 'conceitos' || currentSection === 'cheatsheets') && (
              <ReferenciaView initialTab={currentSection === 'cheatsheets' ? 'cheatsheets' : 'conceitos'} />
            )}

            {/* Carreira: Junção de Roadmaps & Guias Práticos */}
            {(currentSection === 'carreira' || currentSection === 'roadmaps' || currentSection === 'guias') && (
              <CarreiraView initialTab={currentSection === 'guias' ? 'guias' : 'roadmaps'} />
            )}

            {currentSection === 'notas' && <NotasView />}
          </main>

          {/* Clean Royal Blue Tech Footer */}
          <footer className="border-t border-blue-500/20 bg-[#030a21]/90 backdrop-blur-md py-6 text-xs text-blue-300/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-blue-400 tracking-wider">CHEETOOSSS</span>
                <span className="text-blue-500">·</span>
                <span className="font-semibold text-white">Desenvolvido por Isaque Rocha</span>
                <span className="text-blue-500">·</span>
                <span className="text-blue-300/80">Tecnologia & Desenvolvimento Web</span>
              </div>

              <div className="text-[11px] font-mono text-blue-400/80 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>{new Date().getFullYear()} · Painel Lateral · Azul Royal</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <TechLabProvider>
      <MainLayout />
    </TechLabProvider>
  );
}
