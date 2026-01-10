'use client';

import React, { useMemo, useState } from 'react';
import { Header } from '../../components/layout/header';
import { BottomNav } from '../../components/layout/bottom-nav';
import FaqList from '../../components/ayuda/FaqList';
import ContactCard from '../../components/ayuda/ContactCard';
import type { Faq } from '../../components/ayuda/FaqItem';

export default function AyudaPage() {
  // Datos ejemplo (replicarías desde API en el futuro)
  const allFaqs = useMemo<Faq[]>(
    () => [
      { id: '1', question: '¿Cómo gestiono mis reservas?', answer: 'Desde el menú Gestionar reservas podés crear, editar o cancelar reservas.' },
      { id: '2', question: '¿Cómo configuro los horarios de mis canchas?', answer: 'En Canchas, editá la disponibilidad por día con horario de apertura y cierre.' },
      { id: '3', question: '¿Cómo exporto mis reportes?', answer: 'En Configuración > Integraciones, usá la opción Exportar CSV.' },
      { id: '4', question: '¿Cómo crear un usuario administrador?', answer: 'Contactá soporte para activar usuarios administradores adicionales.' },
      { id: '5', question: '¿Puedo cambiar los precios por franja horaria?', answer: 'Sí, próximamente. Por ahora podés cambiar precio por cancha.' },
    ],
    []
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const faqs = useMemo(() => {
    if (!searchQuery) return allFaqs;
    const q = searchQuery.toLowerCase();
    return allFaqs.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [allFaqs, searchQuery]);

  const toggleExpand = (id: string) =>
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const expandAll = () => setExpandedIds(new Set(faqs.map(f => f.id)));
  const collapseAll = () => setExpandedIds(new Set());

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Ayuda" />

      <main className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <FaqList
            faqs={faqs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
            expandAll={expandAll}
            collapseAll={collapseAll}
          />

          <ContactCard />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
