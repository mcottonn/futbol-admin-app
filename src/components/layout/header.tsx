"use client"

import { Menu } from "lucide-react"
import { useDrawer } from "../drawer/DrawerProvider"

interface HeaderProps {
  title: string
  onMenuClick?: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const { openDrawer } = useDrawer()

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-primary to-secondary text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Botón cuadrado con estados hover/focus/active */}
        <button
          onClick={onMenuClick ? onMenuClick : openDrawer}
          aria-label="Abrir menú lateral"
          className="w-9 h-9 rounded-md bg-white border border-white/20 inline-flex items-center justify-center text-primary hover:border-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.98] transition"
        >
          <Menu size={20} className="text-primary" />
        </button>

        <h1 className="text-xl font-bold text-center flex-1">{title}</h1>

        {/* Spacer para balancear el título centrado */}
        <div style={{ width: 36 }} />
      </div>
    </header>
  )
}
