import React, { useState, useEffect } from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { Flashcard, FlashcardDeck } from '../../types';
import { 
  Layers, RotateCcw, ChevronLeft, ChevronRight, 
  Shuffle, CheckCircle2, AlertTriangle, Trophy, Sparkles, 
  Plus, Trash2, User, HelpCircle, X
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const { 
    allDecks, 
    activeDeckId, 
    setActiveDeckId, 
    addDeck, 
    deleteDeck, 
    flashcardRatings, 
    rateFlashcard 
  } = useTechLab();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState<FlashcardDeck | null>(null);

  // Form state for creating a new deck
  const [deckTitulo, setDeckTitulo] = useState('');
  const [deckCategoria, setDeckCategoria] = useState('Lógica & Algoritmos');
  const [deckProfessor, setDeckProfessor] = useState('Prof. Fernando Brito');
  const [deckDescricao, setDeckDescricao] = useState('');
  const [deckCards, setDeckCards] = useState<{ pergunta: string; resposta: string; analogia: string }[]>([
    {
      pergunta: 'O que é uma condição de parada em uma função recursiva?',
      resposta: 'É o Caso Base: a condição que interrompe as chamadas a si mesma e retorna um valor concreto, evitando estouro de pilha (Stack Overflow).',
      analogia: 'O freio de mão que impede o carro de descer a ladeira infinitamente.',
    },
    {
      pergunta: 'Qual a diferença entre uma variável global e uma local?',
      resposta: 'Variáveis locais existem apenas dentro do escopo da função onde foram declaradas. Variáveis globais podem ser acessadas por todo o programa.',
      analogia: 'Chave do quarto privativo vs chave do portão de entrada.',
    }
  ]);

  const currentDeck: FlashcardDeck = allDecks.find(d => d.id === activeDeckId) || allDecks[0];
  const cards = currentDeck.cards;
  const currentCard = cards[currentIndex] || cards[0];
  const currentRating = currentCard ? flashcardRatings[currentCard.id] : undefined;

  const goToCard = (index: number) => {
    setIsFlipped(false);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      goToCard(currentIndex + 1);
    } else {
      goToCard(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToCard(currentIndex - 1);
    } else {
      goToCard(cards.length - 1);
    }
  };

  const handleRandom = () => {
    const rnd = Math.floor(Math.random() * cards.length);
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
  }, [currentIndex, cards.length]);

  const handleAddCardField = () => {
    setDeckCards(prev => [
      ...prev,
      {
        pergunta: '',
        resposta: '',
        analogia: '',
      }
    ]);
  };

  const handleSaveDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckTitulo.trim()) return;

    const formattedCards: Flashcard[] = deckCards.map((c, i) => ({
      id: `fc-custom-${Date.now()}-${i}`,
      categoria: deckCategoria,
      pergunta: c.pergunta || 'Pergunta sem texto',
      resposta: c.resposta || 'Resposta explicativa',
      analogia: c.analogia,
    }));

    addDeck({
      titulo: deckTitulo,
      categoria: deckCategoria,
      professor: deckProfessor || 'Prof. Fernando Brito',
      descricao: deckDescricao || 'Baralho personalizado criado pelo professor.',
      cards: formattedCards,
    });

    setIsCreateModalOpen(false);
    setDeckTitulo('');
    setDeckDescricao('');
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* 1. SELEÇÃO DE BLOCOS DE BARALHOS (BARALHO 1, BARALHO 2...) */}
      <div className="bg-[#040e2b]/85 backdrop-blur-md border border-blue-500/25 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-blue-500/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>Memorização Ativa com Efeito 3D</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Baralhos de Flashcards 3D
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/80 mt-0.5">
              Escolha um baralho para treinar recall ativo ou crie novos baralhos de estudo.
            </p>
          </div>

          {/* Botão de Criar Baralho */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(244,63,94,0.35)] border border-rose-400/40 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Novo Baralho (Professor)</span>
          </button>
        </div>

        {/* Blocos de Baralho 1, Baralho 2... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allDecks.map(deck => {
            const isActive = deck.id === activeDeckId;

            return (
              <div
                key={deck.id}
                onClick={() => {
                  setActiveDeckId(deck.id);
                  goToCard(0);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-rose-950/80 to-[#040d2e] border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)] ring-2 ring-rose-500/50'
                    : 'bg-[#030a24]/80 border-blue-500/25 hover:border-rose-400/50 hover:bg-blue-950/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black text-rose-400 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/30">
                      Baralho {deck.numero}
                    </span>
                    <span className="text-[10px] font-mono text-blue-300">
                      {deck.cards.length} Cartões
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-1">
                    {deck.titulo}
                  </h3>

                  <p className="text-[11px] text-blue-200/70 line-clamp-2 mb-3">
                    {deck.descricao}
                  </p>
                </div>

                <div className="pt-3 border-t border-blue-500/20 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-blue-300/80 font-medium">
                    <User className="w-3 h-3 text-rose-400" />
                    <span className="truncate max-w-[130px]">{deck.professor}</span>
                  </div>

                  {deck.isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeckToDelete(deck);
                      }}
                      className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-rose-950/50 cursor-pointer transition-colors"
                      title="Excluir baralho personalizado"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ÁREA INTERATIVA DE RECALL 3D */}
      <div className="bg-[#040e2b]/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between text-xs text-blue-300 font-mono pb-3 border-b border-blue-500/20">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Baralho {currentDeck.numero}:</span>
            <span className="text-rose-400">{currentDeck.titulo}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Cartão {currentIndex + 1} de {cards.length}</span>
            <button
              onClick={handleRandom}
              className="p-1 rounded bg-blue-950 border border-blue-500/30 text-blue-300 hover:text-white cursor-pointer"
              title="Embaralhar aleatório"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D Flip Card Container */}
        <div className="perspective-1000 min-h-[320px] flex items-center justify-center py-2" style={{ perspective: '1200px' }}>
          <div
            onClick={() => setIsFlipped(f => !f)}
            className="w-full max-w-xl h-76 rounded-2xl cursor-pointer relative select-none shadow-2xl transition-transform duration-500 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front of the card (Pergunta) */}
            <div 
              className="absolute inset-0 rounded-2xl p-8 bg-gradient-to-br from-blue-950 via-[#040e2b] to-[#02071a] border-2 border-blue-500/40 flex flex-col justify-between text-center shadow-xl"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
                pointerEvents: isFlipped ? 'none' : 'auto',
                opacity: isFlipped ? 0 : 1,
                transition: 'opacity 0.2s ease-in-out',
                zIndex: isFlipped ? 0 : 10,
              }}
            >
              <div className="flex items-center justify-between text-xs text-blue-400 font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30">
                  {currentCard?.categoria || 'Frente'}
                </span>
                <span className="text-blue-300/60 text-[11px]">Clique ou Espaço para virar ⟲</span>
              </div>

              <div className="my-auto px-4">
                <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  {currentCard?.pergunta}
                </p>
              </div>

              <div className="text-[11px] text-blue-400 font-mono">
                Pense na resposta antes de virar a carta
              </div>
            </div>

            {/* Back of the card (Resposta) */}
            <div 
              className="absolute inset-0 rounded-2xl p-8 bg-gradient-to-br from-indigo-950 via-[#071338] to-[#03091e] border-2 border-emerald-500/50 flex flex-col justify-between text-center shadow-xl"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                pointerEvents: isFlipped ? 'auto' : 'none',
                opacity: isFlipped ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out',
                zIndex: isFlipped ? 10 : 0,
              }}
            >
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  Resposta & Explicação
                </span>
                <span className="text-emerald-300/80 text-[11px]">Recall Ativo</span>
              </div>

              <div className="my-auto px-4 space-y-3">
                <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  {currentCard?.resposta}
                </p>

                {currentCard?.analogia && (
                  <p className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/30">
                    💡 <strong>Analogia:</strong> {currentCard.analogia}
                  </p>
                )}
              </div>

              <div className="text-[11px] text-emerald-400 font-mono">
                Classifique seu recall abaixo para avançar
              </div>
            </div>
          </div>
        </div>

        {/* Rating Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-blue-500/20">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-300 hover:text-white"
              title="Cartão Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-300 hover:text-white"
              title="Próximo Cartão"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 recall buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRate('errei')}
              className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-200 text-xs font-semibold border border-rose-500/40 transition-colors"
            >
              ❌ Errei
            </button>
            <button
              onClick={() => handleRate('dificil')}
              className="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600 text-amber-200 text-xs font-semibold border border-amber-500/40 transition-colors"
            >
              ⚠️ Difícil
            </button>
            <button
              onClick={() => handleRate('bom')}
              className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs font-semibold border border-blue-500/40 transition-colors"
            >
              👍 Bom
            </button>
            <button
              onClick={() => handleRate('facil')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 text-xs font-semibold border border-emerald-500/40 transition-colors"
            >
              ⭐ Fácil
            </button>
          </div>
        </div>
      </div>

      {/* 3. MODAL DE CRIAÇÃO DE BARALHO (ÁREA DO PROFESSOR) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#040e2b] border border-rose-500/40 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between p-5 border-b border-rose-500/25 bg-rose-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Cadastrar Novo Baralho de Flashcards (Professor)
                  </h3>
                  <p className="text-xs text-rose-200/70">
                    Crie perguntas e respostas para memorização ativa dos alunos.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-900/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDeck} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Título do Baralho *
                  </label>
                  <input
                    type="text"
                    required
                    value={deckTitulo}
                    onChange={e => setDeckTitulo(e.target.value)}
                    placeholder="Ex: Baralho 4 - Algoritmos & Grafos"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Professor Responsável
                  </label>
                  <input
                    type="text"
                    value={deckProfessor}
                    onChange={e => setDeckProfessor(e.target.value)}
                    placeholder="Ex: Prof. Fernando Brito"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white placeholder-blue-300/40 focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={deckCategoria}
                    onChange={e => setDeckCategoria(e.target.value)}
                    placeholder="Ex: Lógica, Redes, Cloud"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-300 mb-1">
                    Descrição Resumida
                  </label>
                  <input
                    type="text"
                    value={deckDescricao}
                    onChange={e => setDeckDescricao(e.target.value)}
                    placeholder="Sobre o que são estes cartões"
                    className="w-full text-xs p-2.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-white"
                  />
                </div>
              </div>

              {/* Cartões do baralho */}
              <div className="pt-2 border-t border-blue-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Cartões do Baralho ({deckCards.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddCardField}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Cartão</span>
                  </button>
                </div>

                {deckCards.map((c, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-rose-400">
                        Cartão {idx + 1}
                      </span>
                      {deckCards.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setDeckCards(deckCards.filter((_, i) => i !== idx))}
                          className="text-xs text-rose-400 hover:text-rose-200"
                        >
                          Remover
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-blue-300 mb-0.5">Pergunta (Frente da Carta)</label>
                      <input
                        type="text"
                        required
                        value={c.pergunta}
                        onChange={e => {
                          const updated = [...deckCards];
                          updated[idx].pergunta = e.target.value;
                          setDeckCards(updated);
                        }}
                        className="w-full text-xs p-2 rounded bg-blue-950 border border-blue-500/30 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-blue-300 mb-0.5">Resposta (Verso da Carta)</label>
                      <textarea
                        rows={2}
                        required
                        value={c.resposta}
                        onChange={e => {
                          const updated = [...deckCards];
                          updated[idx].resposta = e.target.value;
                          setDeckCards(updated);
                        }}
                        className="w-full text-xs p-2 rounded bg-blue-950 border border-blue-500/30 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-blue-300 mb-0.5">Dica / Analogia Didática (Opcional)</label>
                      <input
                        type="text"
                        value={c.analogia}
                        onChange={e => {
                          const updated = [...deckCards];
                          updated[idx].analogia = e.target.value;
                          setDeckCards(updated);
                        }}
                        placeholder="Ex: Pense como uma lista de compras..."
                        className="w-full text-xs p-2 rounded bg-blue-950 border border-blue-500/30 text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-blue-500/25">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-blue-300 hover:text-white bg-blue-950/60 border border-blue-500/30"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-500/30 cursor-pointer"
                >
                  Salvar e Publicar Baralho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DE BARALHO */}
      {deckToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#040e2b] border border-rose-500/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-white">
                Excluir Baralho de Flashcards?
              </h3>
              <p className="text-xs text-blue-200/80 leading-relaxed">
                Tem certeza que deseja remover o <strong className="text-white">Baralho {deckToDelete.numero}: {deckToDelete.titulo}</strong>? Todos os cartões cadastrados nele serão removidos.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeckToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/30 text-xs font-semibold text-blue-200 hover:text-white transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteDeck(deckToDelete.id);
                  setDeckToDelete(null);
                  goToCard(0);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-md transition-colors cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
