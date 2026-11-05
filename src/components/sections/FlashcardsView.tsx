import React, { useState, useEffect } from 'react';
import { TECHLAB_DATA } from '../../data/techlabData';
import { useTechLab } from '../../context/TechLabContext';
import { Flashcard } from '../../types';
import { 
  Layers, RotateCcw, ChevronLeft, ChevronRight, 
  Shuffle, CheckCircle2, AlertTriangle, Trophy, Sparkles 
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const allCards = TECHLAB_DATA.flashcards as Flashcard[];
  const { flashcardRatings, rateFlashcard } = useTechLab();

  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Extract categories
  const categories = ['todas', ...Array.from(new Set(allCards.map(c => c.categoria)))];

  const filteredCards = selectedCategory === 'todas'
    ? allCards
    : allCards.filter(c => c.categoria === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const currentRating = currentCard ? flashcardRatings[currentCard.id] : undefined;

  // Reset flip when card changes
  const goToCard = (index: number) => {
    setIsFlipped(false);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      goToCard(currentIndex + 1);
    } else {
      goToCard(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToCard(currentIndex - 1);
    } else {
      goToCard(filteredCards.length - 1);
    }
  };

  const handleRandom = () => {
    const rnd = Math.floor(Math.random() * filteredCards.length);
    goToCard(rnd);
  };

  const handleRate = (rating: 'errei' | 'dificil' | 'bom' | 'facil') => {
    if (!currentCard) return;
    rateFlashcard(currentCard.id, rating);
    handleNext();
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(f => !f);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, filteredCards.length]);

  // Metrics
  const totalRated = Object.keys(flashcardRatings).length;
  const masteredCount = Object.values(flashcardRatings).filter(r => r === 'bom' || r === 'facil').length;
  const masteryPct = allCards.length > 0 ? Math.round((masteredCount / allCards.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>Memorização Ativa & Repetição Espaçada</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Flashcards 3D de Retenção
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Clique na carta ou aperte a barra de espaço para virar e testar seu recall imediato.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-slate-500 block text-[10px]">Taxa de Domínio:</span>
            <strong className="text-rose-600 dark:text-rose-400 text-sm">{masteryPct}%</strong>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-slate-500 block text-[10px]">Cards Avaliados:</span>
            <strong className="text-slate-900 dark:text-white text-sm">{totalRated}/{allCards.length}</strong>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              goToCard(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors capitalize ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Flip Card Container */}
      {currentCard && (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer select-none perspective-[1200px]"
          >
            <div
              className={`relative min-h-[300px] w-full rounded-2xl transition-transform duration-500 transform-3d border ${
                isFlipped ? 'rotate-y-180' : ''
              } ${
                isFlipped
                  ? 'bg-slate-900 border-indigo-500/40 shadow-xl'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md hover:border-slate-300 dark:hover:border-slate-700'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Side */}
              <div
                className={`absolute inset-0 p-8 flex flex-col justify-between backface-hidden ${
                  isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    {currentCard.categoria}
                  </span>
                  <span className="text-slate-400 font-mono">
                    Card {currentIndex + 1} de {filteredCards.length}
                  </span>
                </div>

                <div className="text-center py-6">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Pergunta / Conceito
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
                    {currentCard.pergunta}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                  <span>Clique ou aperte <strong>Espaço</strong> para virar</span>
                  {currentRating && (
                    <span className="font-semibold capitalize text-indigo-500">
                      Última nota: {currentRating}
                    </span>
                  )}
                </div>
              </div>

              {/* Back Side */}
              <div
                className={`p-8 flex flex-col justify-between backface-hidden [transform:rotateY(180deg)] ${
                  isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                  <span className="font-semibold text-emerald-400 uppercase tracking-wider">
                    Resposta & Solução
                  </span>
                  <span className="text-slate-400 font-mono">
                    Card {currentIndex + 1} de {filteredCards.length}
                  </span>
                </div>

                <div className="py-4 space-y-3">
                  <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                    {currentCard.resposta}
                  </p>

                  {currentCard.analogia && (
                    <div className="p-3 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-xs text-indigo-300">
                      💡 <strong>Analogia Prática:</strong> {currentCard.analogia}
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  Avalie seu recall abaixo para agendar a próxima revisão:
                </div>
              </div>
            </div>
          </div>

          {/* Spaced Repetition Rating Buttons */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Card Anterior (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleRandom}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Card Aleatório"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Próximo Card (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Ratings: Errei, Difícil, Bom, Fácil */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRate('errei')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-colors"
              >
                Errei (1)
              </button>
              <button
                onClick={() => handleRate('dificil')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
              >
                Difícil (2)
              </button>
              <button
                onClick={() => handleRate('bom')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-colors"
              >
                Bom (3)
              </button>
              <button
                onClick={() => handleRate('facil')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
              >
                Fácil (4)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
