"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, Calendar, BarChart3, User } from "lucide-react"

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/canchas", label: "Canchas", icon: MapPin },
  { href: "/reservas", label: "Reservas", icon: Calendar },
  { href: "/estadisticas", label: "Estadísticas", icon: BarChart3 },
  { href: "/perfil", label: "Perfil", icon: User },
]

export function BottomNav() {
  // Oculto la barra inferior por redundante con el drawer
  return null;
}
