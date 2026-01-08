import React from 'react';
import {
  User,
  CalendarCheck2,
  BarChart3,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  Home,
  MapPin,
} from 'lucide-react';
import LeftDrawer, { DrawerItem } from './LeftDrawer';

export interface DrawerOverlayProps {
  open: boolean;
  onClose: () => void;
  profile?: { name: string; subtitle?: string; photoUri?: string };
}

export default function DrawerOverlay({
  open,
  onClose,
  profile = { name: 'Admin del Complejo', subtitle: 'admin@complejo.com' },
}: DrawerOverlayProps) {
  // Opciones admin con rutas como el bottom nav
  const items: DrawerItem[] = [
    { key: 'home', label: 'Inicio', Icon: Home, href: '/' },
    { key: 'complejos', label: 'Complejos', Icon: User, href: '/complejos' },
    { key: 'canchas', label: 'Canchas', Icon: MapPin, href: '/canchas' },
    { key: 'reservas', label: 'Gestionar reservas', Icon: CalendarCheck2, href: '/reservas' },
    { key: 'stats', label: 'Estadísticas', Icon: BarChart3, href: '/estadisticas' },
    { key: 'notif', label: 'Notificaciones', Icon: Bell, href: '/notificaciones' },
    { key: 'help', label: 'Ayuda y soporte', Icon: HelpCircle, href: '/ayuda' },
    { key: 'settings', label: 'Seguridad', Icon: Settings, href: '/seguridad' },
    { key: 'logout', label: 'Cerrar sesión', Icon: LogOut, danger: true, href: '/auth/login' },
  ];

  return <LeftDrawer open={open} onClose={onClose} items={items} profile={profile} />;
}