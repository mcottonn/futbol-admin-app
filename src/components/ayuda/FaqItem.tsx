import React from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export type Faq = { id: string; question: string; answer: string };

export default function FaqItem({
  item,
  expanded,
  onToggle,
}: {
  item: Faq;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border rounded-xl p-3 mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 text-left"
        aria-expanded={expanded}
      >
        <div className="w-7 h-7 rounded-md grid place-items-center bg-[var(--border)]">
          <HelpCircle className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 font-extrabold text-[15px] text-foreground line-clamp-2">
          {item.question}
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted" />
        )}
      </button>

      {expanded && (
        <div className="mt-2 pl-10 text-sm leading-6 text-muted">{item.answer}</div>
      )}
    </div>
  );
}
