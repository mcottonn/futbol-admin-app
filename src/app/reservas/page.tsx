"use client"

import { useState } from "react"
import { Header } from "../../components/layout/header"
import { BottomNav } from "../../components/layout/bottom-nav"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ChevronDown } from "lucide-react"

interface Reservation {
  id: string
  courtName: string
  date: string
  startTime: string
  endTime: string
  playerName: string
  playerPhone: string
  playerCount: number
  players: string[]
  totalPrice: number
  status: "confirmed" | "cancelled"
}

export default function ReservasPage() {
  const [reservations] = useState<Reservation[]>([
    {
      id: "1",
      courtName: "Cancha 1 - Sintética",
      date: "Hoy",
      startTime: "14:00",
      endTime: "15:00",
      playerName: "Juan García",
      playerPhone: "+34 612 345 678",
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
      totalPrice: 50,
      status: "confirmed",
    },
    {
      id: "2",
      courtName: "Cancha 2 - Natural",
      date: "Hoy",
      startTime: "16:30",
      endTime: "17:30",
      playerName: "María López",
      playerPhone: "+34 623 456 789",
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
      totalPrice: 60,
      status: "confirmed",
    },
    {
      id: "3",
      courtName: "Cancha 3 - Sintética",
      date: "Hoy",
      startTime: "18:00",
      endTime: "19:00",
      playerName: "Carlos Rodríguez",
      playerPhone: "+34 634 567 890",
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
      totalPrice: 50,
      status: "confirmed",
    },
    {
      id: "6",
      courtName: "Cancha 2 - Natural",
      date: "Hoy",
      startTime: "12:00",
      endTime: "13:00",
      playerName: "Roberto García",
      playerPhone: "+34 667 890 123",
      playerCount: 7,
      players: [
        "Roberto García",
        "Juan García",
        "Carlos López",
        "Miguel Rodríguez",
        "Pedro Sánchez",
        "Luis Martínez",
        "Antonio Díaz",
      ],
      totalPrice: 45,
      status: "cancelled",
    },
  ])

  const [expandedId, setExpandedId] = useState<string | null>(null)

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

  const confirmedReservations = reservations.filter((r) => r.status === "confirmed")
  const cancelledReservations = reservations.filter((r) => r.status === "cancelled")

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
    <div
      className="border border-cyan-100 rounded-lg p-4 hover:border-cyan-400 hover:bg-cyan-50 transition-all cursor-pointer bg-white"
      onClick={() => setExpandedId(expandedId === reservation.id ? null : reservation.id)}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-slate-900">{reservation.courtName}</h3>
            <Badge className={getStatusColor(reservation.status)}>{getStatusLabel(reservation.status)}</Badge>
          </div>
          <p className="text-sm text-slate-600">
            Reservado por: <span className="font-medium text-slate-900">{reservation.playerName}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-cyan-600">${reservation.totalPrice}</p>
          <p className="text-xs text-slate-600">Monto pagado</p>
        </div>
      </div>

      {/* Details Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pb-3 border-b border-cyan-100">
        <div>
          <p className="text-xs text-slate-600 font-medium">FECHA</p>
          <p className="text-sm font-medium text-slate-900">{reservation.date}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 font-medium">HORA</p>
          <p className="text-sm font-medium text-slate-900">
            {reservation.startTime} - {reservation.endTime}
          </p>
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
            className={`text-cyan-600 transition-transform ${expandedId === reservation.id ? "rotate-180" : ""}`}
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
  )

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header title="Gestión de Reservas" />

      <main className="px-4 py-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Reservas</h2>
            <p className="text-sm text-slate-600 mt-1">{reservations.length} reservas totales</p>
          </div>
        </div>

        <Tabs defaultValue="confirmed" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-cyan-100">
            <TabsTrigger value="confirmed" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Confirmadas ({confirmedReservations.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Canceladas ({cancelledReservations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="confirmed" className="mt-6">
            <Card className="border-2 border-cyan-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {confirmedReservations.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </div>
                {confirmedReservations.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-600">No hay reservas confirmadas</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <Card className="border-2 border-cyan-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {cancelledReservations.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </div>
                {cancelledReservations.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-600">No hay reservas canceladas</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  )
}
