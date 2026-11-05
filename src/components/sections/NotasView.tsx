import React, { useState } from 'react';
import { useTechLab } from '../../context/TechLabContext';
import { NoteItem } from '../../types';
import { FileText, Plus, Trash2, Edit3, Search, Download, Check, Tag } from 'lucide-react';

export const NotasView: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useTechLab();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Geral');
  const [formContent, setFormContent] = useState('');

  const categories = ['todas', ...Array.from(new Set(notes.map(n => n.categoria)))];

  const filteredNotes = notes.filter(n => {
    const matchesSearch =
      n.titulo.toLowerCase().includes(search.toLowerCase()) ||
      n.conteudo.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'todas' || n.categoria === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const openNewNote = () => {
    setEditingId(null);
    setFormTitle('');
    setFormCategory('Python');
    setFormContent('');
    setIsEditing(true);
  };

  const openEditNote = (note: NoteItem) => {
    setEditingId(note.id);
    setFormTitle(note.titulo);
    setFormCategory(note.categoria);
    setFormContent(note.conteudo);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingId) {
      updateNote(editingId, {
        titulo: formTitle.trim(),
        categoria: formCategory,
        conteudo: formContent,
      });
    } else {
      addNote({
        titulo: formTitle.trim(),
        categoria: formCategory,
        conteudo: formContent,
      });
    }

    setIsEditing(false);
  };

  const exportNotesAsMarkdown = () => {
    const text = notes
      .map(
        n => `# ${n.titulo}\n*Categoria: ${n.categoria} | Atualizado: ${n.dataAtualizacao}*\n\n${n.conteudo}\n\n---\n`
      )
      .join('\n');

    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `techlab_anotacoes_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <FileText className="w-4 h-4" />
            <span>Caderno de Estudos Pessoal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Suas Anotações Técnicas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Guarde fórmulas, insights de aulas e lembretes de sintaxe. Seus dados ficam salvos localmente no navegador.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportNotesAsMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Exportar todas as anotações em arquivo .md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar .md</span>
          </button>

          <button
            onClick={openNewNote}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nova Anotação</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-56">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar anotações..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500 text-sm">
            Nenhuma anotação encontrada. Crie sua primeira nota clicando em &quot;Nova Anotação&quot;!
          </div>
        ) : (
          filteredNotes.map(note => (
            <div
              key={note.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-400 dark:hover:border-indigo-500/80 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {note.categoria}
                  </span>
                  <span className="text-slate-400 text-[11px] font-mono">
                    {note.dataAtualizacao}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {note.titulo}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap line-clamp-6 leading-relaxed font-mono">
                  {note.conteudo}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => openEditNote(note)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Editar"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded hover:bg-rose-500/10 transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Note Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <form
            onSubmit={handleSave}
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingId ? 'Editar Anotação' : 'Criar Nova Anotação'}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Título
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="Ex: Sintaxe do List Comprehension"
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Categoria
                </label>
                <select
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Lógica">Lógica de Programação</option>
                  <option value="Python">Python</option>
                  <option value="Hardware">Hardware & Arquitetura</option>
                  <option value="Dados">Ciência de Dados & SQL</option>
                  <option value="Redes">Redes & Cibersegurança</option>
                  <option value="Geral">Geral / Dúvidas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Conteúdo da Nota (Suporta Código e Texto)
                </label>
                <textarea
                  required
                  rows={8}
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                  placeholder="Escreva seus apontamentos..."
                  className="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-2xs"
              >
                Salvar Anotação
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
