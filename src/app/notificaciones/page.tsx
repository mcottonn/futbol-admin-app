"use client"

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { CalendarCheck2, CalendarX2, Bell, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Header } from '../../components/layout/header';
import { BottomNav } from '../../components/layout/bottom-nav';

type NotificationType = 'booking' | 'cancellation';
type AdminNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string; // ISO
  read: boolean;
  data?: {
    reservationId?: string;
    playerName?: string;
    court?: string;
    date?: string;
    timeSlot?: string;
  };
};

export default function NotificacionesPage() {
  const initialItems = useMemo<AdminNotification[]>(
    () => [
      {
        id: 'n1',
        type: 'booking',
        title: 'Nueva reserva confirmada',
        message: 'Juan Pérez reservó Cancha 5 para hoy 18:00 - 19:00',
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        read: false,
        data: { reservationId: 'r1', playerName: 'Juan Pérez', court: 'Cancha 5', date: new Date().toISOString().slice(0,10), timeSlot: '18:00 - 19:00' },
      },
      {
        id: 'n2',
        type: 'cancellation',
        title: 'Reserva cancelada',
        message: 'María López canceló su reserva (Cancha 7 - 19:00)',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        read: false,
        data: { reservationId: 'r2', playerName: 'María López', court: 'Cancha 7', date: new Date().toISOString().slice(0,10), timeSlot: '19:00 - 20:00' },
      },
      {
        id: 'n3',
        type: 'booking',
        title: 'Reserva confirmada',
        message: 'Carlos Méndez reservó Cancha 1 (mañana 20:00 - 21:00)',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
        read: true,
        data: { reservationId: 'r3', playerName: 'Carlos Méndez', court: 'Cancha 1', date: new Date(Date.now()+86400000).toISOString().slice(0,10), timeSlot: '20:00 - 21:00' },
      },
    ],
    []
  );

  const [items, setItems] = useState<AdminNotification[]>(initialItems);
  const [filter, setFilter] = useState<'all' | 'booking' | 'cancellation'>('all');

  const unreadCount = items.filter(i => !i.read).length;

  const formatRelative = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'ahora';
    if (m < 60) return `hace ${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `hace ${h} h`;
    const d = Math.floor(h / 24);
    return `hace ${d} d`;
  };

  const toggleRead = (id: string) => setItems(prev => prev.map(i => (i.id === id ? { ...i, read: !i.read } : i)));
  const markAllAsRead = () => setItems(prev => prev.map(i => ({ ...i, read: true })));
  const clearAll = () => setItems([]);

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter(i => i.type === filter)),
    [items, filter]
  );

  const ItemIcon = ({ type }: { type: NotificationType }) =>
    type === 'booking' ? (
      <CalendarCheck2 className="w-5 h-5 text-primary" />
    ) : (
      <CalendarX2 className="w-5 h-5 text-destructive" />
    );

  return (
    <div className="min-h-screen bg-muted-light pb-24">
      <Header title="Notificaciones" />

      <main className="px-4 py-6 max-w-5xl mx-auto">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="default" className="rounded-full">
                {unreadCount} sin leer
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllAsRead}>Marcar todas</Button>
              <Button variant="outline" onClick={clearAll}>Borrar</Button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 text-muted">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filtrar por tipo</span>
            </div>
            <div className="inline-flex rounded-md border border-border overflow-hidden">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm font-semibold transition ${
                  filter === 'all' ? 'bg-primary text-white' : 'bg-card text-foreground hover:bg-gray-50'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('booking')}
                className={`px-3 py-1.5 text-sm font-semibold transition ${
                  filter === 'booking' ? 'bg-primary text-white' : 'bg-card text-foreground hover:bg-gray-50'
                }`}
              >
                Reservas
              </button>
              <button
                onClick={() => setFilter('cancellation')}
                className={`px-3 py-1.5 text-sm font-semibold transition ${
                  filter === 'cancellation' ? 'bg-primary text-white' : 'bg-card text-foreground hover:bg-gray-50'
                }`}
              >
                Cancelaciones
              </button>
            </div>
          </div>

          {/* Lista */}
          <div className="grid gap-3">
            {filtered.length === 0 && (
              <Card className="p-10 text-center">
                <div className="font-extrabold text-[16px] mb-1">Sin notificaciones</div>
                <div className="text-sm text-muted">Cuando tengas actividad, aparecerá aquí.</div>
              </Card>
            )}

            {filtered.map(n => (
              <Card
                key={n.id}
                className={`overflow-hidden border shadow-sm`}
                style={{
                  borderLeftWidth: 4,
                  borderLeftColor: n.type === 'booking' ? 'var(--primary)' : 'var(--destructive)'
                }}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg grid place-items-center bg-input shrink-0">
                      <ItemIcon type={n.type} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="font-extrabold text-[15px] truncate">{n.title}</div>
                            {n.type === 'booking' ? (
                              <Badge variant="default">Reserva</Badge>
                            ) : (
                              <Badge variant="destructive">Cancelación</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted mt-0.5 line-clamp-2">
                            {n.message}
                          </div>
                        </div>
                        <div className="w-5 text-right">
                          {!n.read ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                          ) : (
                            <Bell className="w-4 h-4 text-muted" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Link
                          href="/reservas"
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-primary text-primary hover:bg-gray-50 transition"
                        >
                          Ver reserva
                        </Link>
                        <button
                          onClick={() => toggleRead(n.id)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-border text-muted hover:bg-gray-50 transition"
                        >
                          {n.read ? 'Marcar no leída' : 'Marcar leída'}
                        </button>

                        <span className="ml-auto text-xs text-muted">{formatRelative(n.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>



  );
    
}
