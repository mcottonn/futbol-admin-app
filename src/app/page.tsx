"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "../components/layout/header"
import { BottomNav } from "../components/layout/bottom-nav"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import Link from "next/link"
import { ChevronDown, Calendar, Users, DollarSign, TrendingUp } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const adminName = "Juan"

  const allReservations = [
    {
      id: "1",
      courtName: "Cancha 1 - Sintética",
      reservedBy: "Juan García",
      date: "Hoy",
      time: "14:00 - 15:00",
      playerCount: 10,
      players: [
        "Juan García",
        "Carlos López",
        "Miguel Rodríguez",
        "Pedro Sánchez",
        "Luis Martínez",
        "Antonio Díaz",
        "Fernando Ruiz",
        "Roberto García",
        "Javier López",
        "Diego Martínez",
      ],
      amount: "$50",
      status: "confirmed" as const,
    },
    {
      id: "2",
      courtName: "Cancha 2 - Natural",
      reservedBy: "María López",
      date: "Hoy",
      time: "16:30 - 17:30",
      playerCount: 8,
      players: [
        "María López",
        "Ana Martínez",
        "Carmen Rodríguez",
        "Isabel García",
        "Rosa López",
        "Teresa Sánchez",
        "Beatriz Díaz",
        "Francisca Ruiz",
      ],
      amount: "$60",
      status: "confirmed" as const,
    },
    {
      id: "3",
      courtName: "Cancha 3 - Sintética",
      reservedBy: "Carlos Rodríguez",
      date: "Hoy",
      time: "18:00 - 19:00",
      playerCount: 12,
      players: [
        "Carlos Rodríguez",
        "Juan García",
        "Miguel López",
        "Pedro Sánchez",
        "Luis Martínez",
        "Antonio Díaz",
        "Fernando Ruiz",
        "Roberto García",
        "Javier López",
        "Diego Martínez",
        "Pablo Hernández",
        "Sergio García",
      ],
      amount: "$50",
      status: "confirmed" as const,
    },
    {
      id: "4",
      courtName: "Cancha 1 - Sintética",
      reservedBy: "Ana Martínez",
      date: "Mañana",
      time: "10:00 - 11:00",
      playerCount: 10,
      players: [
        "Ana Martínez",
        "María López",
        "Carmen Rodríguez",
        "Isabel García",
        "Rosa López",
        "Teresa Sánchez",
        "Beatriz Díaz",
        "Francisca Ruiz",
        "Dolores García",
        "Montserrat López",
      ],
      amount: "$50",
      status: "confirmed" as const,
    },
    {
      id: "5",
      courtName: "Cancha 4 - Natural",
      reservedBy: "Pedro Sánchez",
      date: "Mañana",
      time: "15:00 - 16:00",
      playerCount: 9,
      players: [
        "Pedro Sánchez",
        "Juan García",
        "Carlos López",
        "Miguel Rodríguez",
        "Luis Martínez",
        "Antonio Díaz",
        "Fernando Ruiz",
        "Roberto García",
        "Javier López",
      ],
      amount: "$55",
      status: "confirmed" as const,
    },
  ]

  const todayReservations = allReservations.filter((r) => r.date === "Hoy")
  const summaryReservations = todayReservations.slice(0, 2)

  const todayStats = {
    totalReservations: todayReservations.length,
    totalPlayers: todayReservations.reduce((sum, r) => sum + r.playerCount, 0),
    totalRevenue: todayReservations.reduce((sum, r) => sum + Number.parseInt(r.amount.replace("$", "")), 0),
    occupiedSlots: 34,
    totalSlots: 50,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  useEffect(() => {
    // Verificar autenticación
    const auth = localStorage.getItem("isAuthenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
      setIsLoading(false)
    } else {
      router.push("/auth/login")
    }
  }, [router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header title="Inicio" />

      <main className="px-4 py-6 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">¡Bienvenido, {adminName}!</h1>
          <p className="text-slate-600 mt-2">Aquí está el resumen de tu día</p>
        </section>

        {/* Reservations Summary */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Resumen de Reservas</h2>
            <Link
              href="/reservas"
              className="text-white bg-cyan-600 hover:bg-cyan-700 font-medium text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Gestionar Reservas
            </Link>
          </div>

          <Card className="border-2 border-cyan-200 shadow-lg">
            <CardContent className="pt-6">
              {summaryReservations.length > 0 ? (
                <div className="space-y-3">
                  {summaryReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="border border-cyan-100 rounded-lg p-4 hover:border-cyan-400 hover:bg-cyan-50 transition-all cursor-pointer bg-white"
                      onClick={() => setExpandedId(expandedId === reservation.id ? null : reservation.id)}
                    >
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-slate-900">{reservation.courtName}</h3>
                            <Badge className={getStatusColor(reservation.status)}>
                              {getStatusLabel(reservation.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            Reservado por: <span className="font-medium text-slate-900">{reservation.reservedBy}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-cyan-600">{reservation.amount}</p>
                          <p className="text-xs text-slate-600">Monto pagado</p>
                        </div>
                      </div>

                      {/* Details Row */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-3 border-b border-cyan-100">
                        <div>
                          <p className="text-xs text-slate-600 font-medium">HORA</p>
                          <p className="text-sm font-medium text-slate-900">{reservation.time}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 font-medium">JUGADORES</p>
                          <p className="text-sm font-medium text-slate-900">{reservation.playerCount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 font-medium">ESTADO</p>
                          <p className="text-sm font-medium text-cyan-600">{getStatusLabel(reservation.status)}</p>
                        </div>
                        <div className="flex items-center justify-end">
                          <ChevronDown
                            size={20}
                            className={`text-cyan-600 transition-transform ${
                              expandedId === reservation.id ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {expandedId === reservation.id && (
                        <div className="pt-3 border-t border-cyan-100">
                          <p className="text-xs text-slate-600 font-medium mb-3">JUGADORES PARTICIPANTES:</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {reservation.players.map((player, idx) => (
                              <div key={idx} className="bg-cyan-50 border border-cyan-200 rounded px-3 py-2">
                                <p className="text-sm text-slate-900 font-medium">{player}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {todayReservations.length > 2 && (
                    <Link
                      href="/reservas"
                      className="block text-center text-cyan-600 hover:text-cyan-700 font-medium text-sm py-2"
                    >
                      Ver todas las reservas ({todayReservations.length})
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600">No hay reservas para hoy</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Estadísticas de Hoy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Reservas del día */}
            <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Reservas Hoy</p>
                    <p className="text-3xl font-bold text-cyan-600 mt-2">{todayStats.totalReservations}</p>
                  </div>
                  <Calendar size={32} className="text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            {/* Jugadores totales */}
            <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Jugadores Hoy</p>
                    <p className="text-3xl font-bold text-cyan-600 mt-2">{todayStats.totalPlayers}</p>
                  </div>
                  <Users size={32} className="text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            {/* Ingresos del día */}
            <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Ingresos Hoy</p>
                    <p className="text-3xl font-bold text-cyan-600 mt-2">${todayStats.totalRevenue}</p>
                  </div>
                  <DollarSign size={32} className="text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Turnos Ocupados</p>
                    <p className="text-3xl font-bold text-cyan-600 mt-2">
                      {todayStats.occupiedSlots}/{todayStats.totalSlots}
                    </p>
                  </div>
                  <TrendingUp size={32} className="text-cyan-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
