import React from 'react';
import { Search } from 'lucide-react';
import FaqItem, { Faq } from './FaqItem';

type Props = {
  faqs: Faq[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
};

export default function FaqList({
  faqs,
  searchQuery,
  setSearchQuery,
  expandedIds,
  toggleExpand,
  expandAll,
  collapseAll,
}: Props) {
  return (
    <div>
      {/* Buscador */}
      <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 mb-3 bg-card">
        <Search className="w-4 h-4 text-muted" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar en preguntas frecuentes"
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="w-5 h-5 rounded-full grid place-items-center bg-[var(--border)] text-muted text-[10px]"
          >
            ✕
          </button>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-2 mb-3">
        <button onClick={expandAll} className="px-3 py-2 text-xs font-bold border border-border rounded-lg text-muted hover:bg-gray-50">
          Expandir todas
        </button>
        <button onClick={collapseAll} className="px-3 py-2 text-xs font-bold border border-border rounded-lg text-muted hover:bg-gray-50">
          Contraer todas
        </button>
      </div>

      {/* Lista */}
      <div className="pt-1 pb-2">
        {faqs.length === 0 ? (
          <div className="py-10 text-center">
            <div className="font-extrabold text-[16px] mb-1">Sin resultados</div>
            <div className="text-sm text-muted">Intenta con otra palabra clave.</div>
          </div>
        ) : (
          faqs.map((f) => (
            <FaqItem
              key={f.id}
              item={f}
              expanded={expandedIds.has(f.id)}
              onToggle={() => toggleExpand(f.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
