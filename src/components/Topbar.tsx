import React from 'react';
import { Menu } from 'lucide-react';
import { useDrawer } from './drawer/DrawerProvider';

export default function Topbar() {
  const { openDrawer } = useDrawer();

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, height:56, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px', borderBottom:'1px solid var(--border)', background:'var(--surface)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <button
          aria-label="Abrir menú lateral"
          onClick={openDrawer}
          className="w-9 h-9 rounded-md bg-white border border-border inline-flex items-center justify-center text-foreground hover:border-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.98] transition"
        >
          <Menu size={18} className="text-foreground" />
        </button>
        <div style={{ fontWeight:700 }}>Panel de administración</div>
      </div>

      <div className="toolbar">
        <input className="input" placeholder="Buscar..." />
        <button className="btn">Notificaciones</button>
        <button className="btn">Salir</button>
      </div>
    </header>
  );
}
