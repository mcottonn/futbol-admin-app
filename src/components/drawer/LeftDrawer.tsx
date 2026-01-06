import React from 'react';
import Link from 'next/link';

export type DrawerItem = {
  key: string;
  label: string;
  Icon: React.ElementType;
  onPress?: () => void;
  danger?: boolean;
  href?: string; // navegación Next.js (como el bottom nav)
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: DrawerItem[];
  profile?: { name: string; subtitle?: string; photoUri?: string };
  widthPx?: number;
};

export default function LeftDrawer({
  open,
  onClose,
  items,
  profile = { name: 'Nombre Apellido', subtitle: 'usuario@correo.com' },
  widthPx = 320,
}: Props) {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: open ? 'auto' : 'none', zIndex: 50 }}>
      {/* Click-catcher transparente */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'transparent' }} />

      <aside
        aria-label="Menú lateral"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: widthPx,
          background: '#FFFFFF',
          borderRight: '1px solid var(--border)',
          transform: open ? 'translateX(0%)' : 'translateX(-100%)',
          transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header perfil */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16, borderBottom: '1px solid var(--border)' }}>
          {profile.photoUri ? (
            <img src={profile.photoUri} alt={profile.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 56, height: 56, borderRadius: 12, background: '#E8F2FF' }} />
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, color: 'var(--sidebar-foreground)', lineHeight: '22px' }}>{profile.name}</div>
            {profile.subtitle ? (
              <div style={{ color: 'var(--muted)', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: widthPx - 56 - 32 }} title={profile.subtitle}>
                {profile.subtitle}
              </div>
            ) : null}
          </div>
        </div>

        {/* Items con hover/focus/active */}
        <nav className="pt-2">
          {items.map(({ key, label, Icon, onPress, danger, href }) =>
            href ? (
              <Link
                key={key}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 border-b border-border transition
                  focus:outline-none focus:ring-2 active:scale-[0.99]
                  ${danger ? 'text-red-600 hover:bg-red-50 focus:ring-red-300' : 'text-foreground hover:bg-gray-50 focus:ring-primary/30'}`}
                role="button"
              >
                <Icon className="w-5 h-5" />
                <span className="truncate font-semibold">{label}</span>
              </Link>
            ) : (
              <button
                key={key}
                onClick={() => onPress?.()}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 border-b border-border transition 
                  focus:outline-none focus:ring-2 active:scale-[0.99]
                  ${danger ? 'text-red-600 hover:bg-red-50 focus:ring-red-300' : 'text-foreground hover:bg-gray-50 focus:ring-primary/30'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="truncate font-semibold">{label}</span>
              </button>
            )
          )}
        </nav>
      </aside>
    </div>
  );
}