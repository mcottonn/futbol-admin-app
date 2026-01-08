"use client"

import { useState, useEffect } from "react"
import { Header } from "../../components/layout/header"
import { BottomNav } from "../../components/layout/bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import { ChevronDown, Filter, Phone, Mail, Edit2, X, Check, AlertTriangle, Calendar } from "lucide-react"

interface Reservation {
  id: string
  complexId: string
  complexName: string
  courtId: string
  courtName: string
  courtSize: string
  date: string
  startTime: string
  endTime: string
  playerName: string
  playerPhone: string
  playerEmail: string
  playerCount: number
  players: string[]
  totalPrice: number
  status: "pending" | "confirmed" | "waiting" | "delayed" | "completed" | "cancelled" | "no-show"
  checkInTime?: string
  toleranceMinutes?: number // Tolerancia específica de esta reserva (pisa la de cancha/complejo)
  extendedTolerance?: number // Extensión manual de tolerancia ("Botón de Piedad")
  waitingStartTime?: string // Hora de inicio del periodo de espera
  delayedSince?: string // Hora cuando entró en estado demorado
}

export default function ReservasPage() {
  const today = new Date().toISOString().split('T')[0]
  
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      complexId: "1",
      complexName: "Complejo Deportivo García",
      courtId: "1",
      courtName: "Cancha 1",
      courtSize: "F5",
      date: today,
      startTime: "14:00",
      endTime: "15:00",
      playerName: "Juan García",
      playerPhone: "+34 612 345 678",
      playerEmail: "juan@email.com",
      playerCount: 10,
      players: ["Juan García", "Carlos López", "Miguel Rodríguez", "Pedro Sánchez", "Luis Martínez", "Antonio Díaz", "Fernando Ruiz", "Roberto García", "Javier López", "Diego Martínez"],
      totalPrice: 50,
      status: "pending",
    },
    {
      id: "2",
      complexId: "1",
      complexName: "Complejo Deportivo García",
      courtId: "2",
      courtName: "Cancha 2",
      courtSize: "F11",
      date: today,
      startTime: "16:30",
      endTime: "17:30",
      playerName: "María López",
      playerPhone: "+34 623 456 789",
      playerEmail: "maria@email.com",
      playerCount: 8,
      players: ["María López", "Ana Martínez", "Carmen Rodríguez", "Isabel García", "Rosa López", "Teresa Sánchez", "Beatriz Díaz", "Francisca Ruiz"],
      totalPrice: 60,
      status: "confirmed",
    },
    {
      id: "3",
      complexId: "1",
      complexName: "Complejo Deportivo García",
      courtId: "3",
      courtName: "Cancha 3",
      courtSize: "F7",
      date: today,
      startTime: "18:00",
      endTime: "19:00",
      playerName: "Carlos Rodríguez",
      playerPhone: "+34 634 567 890",
      playerEmail: "carlos@email.com",
      playerCount: 12,
      players: ["Carlos Rodríguez", "Juan García", "Miguel López", "Pedro Sánchez", "Luis Martínez", "Antonio Díaz", "Fernando Ruiz", "Roberto García", "Javier López", "Diego Martínez", "Pablo Hernández", "Sergio García"],
      totalPrice: 50,
      status: "confirmed",
    },
    {
      id: "4",
      complexId: "2",
      complexName: "Complejo Central",
      courtId: "4",
      courtName: "Cancha 1",
      courtSize: "F5",
      date: "2026-01-10",
      startTime: "12:00",
      endTime: "13:00",
      playerName: "Roberto García",
      playerPhone: "+34 667 890 123",
      playerEmail: "roberto@email.com",
      playerCount: 7,
      players: ["Roberto García", "Juan García", "Carlos López", "Miguel Rodríguez", "Pedro Sánchez", "Luis Martínez", "Antonio Díaz"],
      totalPrice: 45,
      status: "cancelled",
    },
  ])

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAllReservations, setShowAllReservations] = useState(false)
  const [displayedCount, setDisplayedCount] = useState(10)
  
  // Filtros
  const [filterComplex, setFilterComplex] = useState<string>("all")
  const [filterCourt, setFilterCourt] = useState<string>("all")
  const [filterSize, setFilterSize] = useState<string>("all")
  const [filterDate, setFilterDate] = useState<string>("")
  const [filterPlayerName, setFilterPlayerName] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Diálogos
  const [contactDialog, setContactDialog] = useState<Reservation | null>(null)
  const [checkInDialog, setCheckInDialog] = useState<Reservation | null>(null)
  const [extendToleranceDialog, setExtendToleranceDialog] = useState<Reservation | null>(null)
  const [extendedMinutes, setExtendedMinutes] = useState(10)
  const [editDialog, setEditDialog] = useState<Reservation | null>(null)
  const [cancelDialog, setCancelDialog] = useState<string | null>(null)
  const [blockCourtDialog, setBlockCourtDialog] = useState<{ courtId: string, courtName: string } | null>(null)
  const [detailsDialog, setDetailsDialog] = useState<Reservation | null>(null)

  // Obtener reservas del día
  const todayReservations = reservations.filter(r => r.date === today)
  
  // Obtener todas las reservas filtradas
  const getFilteredReservations = () => {
    let filtered = showAllReservations ? reservations : todayReservations
    
    if (filterComplex !== "all") {
      filtered = filtered.filter(r => r.complexId === filterComplex)
    }
    if (filterCourt !== "all") {
      filtered = filtered.filter(r => r.courtId === filterCourt)
    }
    if (filterSize !== "all") {
      filtered = filtered.filter(r => r.courtSize === filterSize)
    }
    if (filterDate) {
      filtered = filtered.filter(r => r.date === filterDate)
    }
    if (filterPlayerName) {
      filtered = filtered.filter(r => r.playerName.toLowerCase().includes(filterPlayerName.toLowerCase()))
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter(r => r.status === filterStatus)
    }
    
    return filtered
  }

  const filteredReservations = getFilteredReservations()
  const displayedReservations = showAllReservations ? filteredReservations.slice(0, displayedCount) : filteredReservations

  // Scroll infinito
  useEffect(() => {
    if (!showAllReservations) return

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setDisplayedCount(prev => prev + 10)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAllReservations])

  // Obtener complejos únicos
  const complexes = Array.from(new Set(reservations.map(r => ({ id: r.complexId, name: r.complexName })).map(c => JSON.stringify(c)))).map(c => JSON.parse(c))
  
  // Obtener canchas según complejo seleccionado
  const courts = filterComplex === "all" 
    ? Array.from(new Set(reservations.map(r => ({ id: r.courtId, name: r.courtName })).map(c => JSON.stringify(c)))).map(c => JSON.parse(c))
    : Array.from(new Set(reservations.filter(r => r.complexId === filterComplex).map(r => ({ id: r.courtId, name: r.courtName })).map(c => JSON.stringify(c)))).map(c => JSON.parse(c))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "waiting":
        return "bg-cyan-100 text-cyan-800"
      case "delayed":
        return "bg-orange-100 text-orange-800 animate-pulse"
      case "completed":
        return "bg-emerald-100 text-emerald-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no-show":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "confirmed":
        return "Confirmada"
      case "waiting":
        return "En Espera"
      case "delayed":
        return "⚠️ Demorado"
      case "completed":
        return "Completada"
      case "cancelled":
        return "Cancelada"
      case "no-show":
        return "No asistió"
      default:
        return status
    }
  }

  const handleCheckIn = (reservationId: string) => {
    const now = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setReservations(reservations.map(r => 
      r.id === reservationId 
        ? { ...r, status: "completed", checkInTime: now } 
        : r
    ))
    setCheckInDialog(null)
  }

  const handleExtendTolerance = (reservationId: string, additionalMinutes: number) => {
    setReservations(reservations.map(r => 
      r.id === reservationId 
        ? { ...r, extendedTolerance: (r.extendedTolerance || 0) + additionalMinutes } 
        : r
    ))
    setExtendToleranceDialog(null)
  }

  // Calcular tolerancia efectiva de una reserva
  const getEffectiveTolerance = (reservation: Reservation, courts: any[], complexes: any[]) => {
    // 1. Si tiene tolerancia específica en la reserva, usar esa
    if (reservation.toleranceMinutes !== undefined) {
      return reservation.toleranceMinutes + (reservation.extendedTolerance || 0)
    }
    
    // 2. Si la cancha tiene tolerancia configurada, usar esa
    const court = courts.find(c => c.id === reservation.courtId)
    if (court?.toleranceMinutes !== undefined) {
      return court.toleranceMinutes + (reservation.extendedTolerance || 0)
    }
    
    // 3. Usar la tolerancia global del complejo
    const complex = complexes.find(c => c.id === reservation.complexId)
    return (complex?.defaultTolerance || 15) + (reservation.extendedTolerance || 0)
  }

  const handleCancelReservation = (reservationId: string) => {
    setReservations(reservations.map(r => 
      r.id === reservationId ? { ...r, status: "cancelled" } : r
    ))
    setCancelDialog(null)
  }

  const handleBlockCourt = (courtId: string) => {
    // Cancelar todas las reservas del día para esa cancha
    setReservations(reservations.map(r => 
      r.courtId === courtId && r.date === today && r.status !== "completed"
        ? { ...r, status: "cancelled" } 
        : r
    ))
    setBlockCourtDialog(null)
  }

  const handleEditReservation = () => {
    if (!editDialog) return
    setReservations(reservations.map(r => 
      r.id === editDialog.id ? editDialog : r
    ))
    setEditDialog(null)
  }

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
    const isCompleted = reservation.status === "completed"
    const canModify = !isCompleted

    // Verificar si ya es hora de hacer check-in
    const canCheckIn = () => {
      if (reservation.date !== today) return false
      const now = new Date()
      const [hours, minutes] = reservation.startTime.split(':').map(Number)
      const startTime = new Date()
      startTime.setHours(hours, minutes, 0, 0)
      return now >= startTime
    }

    const isCheckInTime = canCheckIn()

    return (
      <div className="border border-cyan-100 rounded-lg p-4 hover:border-cyan-400 transition-all bg-white">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-slate-900">{reservation.complexName} - {reservation.courtName}</h3>
              <Badge className="text-xs">{reservation.courtSize}</Badge>
              <Badge className={getStatusColor(reservation.status)}>{getStatusLabel(reservation.status)}</Badge>
            </div>
            <p className="text-sm text-slate-600">
              Reservado por: <span className="font-medium text-slate-900">{reservation.playerName}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-cyan-600">${reservation.totalPrice}</p>
            <p className="text-xs text-slate-600">Total</p>
          </div>
        </div>

        {/* Details Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-3 border-b border-cyan-100">
          <div>
            <p className="text-xs text-slate-600 font-medium">FECHA</p>
            <p className="text-sm font-medium text-slate-900">{reservation.date === today ? "Hoy" : reservation.date}</p>
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
          {isCompleted && reservation.checkInTime && (
            <div>
              <p className="text-xs text-slate-600 font-medium">CHECK-IN</p>
              <p className="text-sm font-medium text-emerald-600">{reservation.checkInTime}</p>
            </div>
          )}
        </div>

        {/* Alertas de estado de espera/demora */}
        {reservation.status === "waiting" && (
          <div className="mt-3 bg-cyan-50 border border-cyan-200 rounded p-3">
            <p className="text-sm font-medium text-cyan-800">
              ⏱️ En espera - Hora de inicio: {reservation.startTime}
            </p>
            <p className="text-xs text-cyan-700 mt-1">
              Tolerancia: {reservation.toleranceMinutes || reservation.extendedTolerance || 15} minutos
            </p>
          </div>
        )}

        {reservation.status === "delayed" && (
          <div className="mt-3 bg-orange-50 border border-orange-300 rounded p-3 animate-pulse">
            <p className="text-sm font-medium text-orange-800">
              ⚠️ DEMORADO - Tiempo de tolerancia cumplido
            </p>
            <p className="text-xs text-orange-700 mt-1">
              Se necesita check-in o se cancelará automáticamente
            </p>
            {reservation.delayedSince && (
              <p className="text-xs text-orange-600 mt-1">
                Demorado desde: {reservation.delayedSince}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setContactDialog(reservation)}
          >
            <Phone size={16} className="mr-2" />
            Contactar
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => setDetailsDialog(reservation)}
          >
            Más detalles
          </Button>

          {canModify && reservation.status !== "cancelled" && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditDialog(reservation)}
              >
                <Edit2 size={16} className="mr-2" />
                Modificar
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => setCancelDialog(reservation.id)}
              >
                <X size={16} className="mr-2" />
                Cancelar
              </Button>

              {(reservation.status === "pending" || reservation.status === "confirmed" || reservation.status === "waiting" || reservation.status === "delayed") && (
                <>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setCheckInDialog(reservation)}
                    disabled={!isCheckInTime}
                  >
                    <Check size={16} className="mr-2" />
                    {isCheckInTime ? "Check-in" : "Check-in (esperar hora)"}
                  </Button>

                  {/* Botón de Piedad - Extender Tolerancia */}
                  {(reservation.status === "waiting" || reservation.status === "delayed") && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-yellow-50 border-yellow-300 text-yellow-800 hover:bg-yellow-100"
                      onClick={() => setExtendToleranceDialog(reservation)}
                    >
                      ⏰ Extender Tolerancia
                    </Button>
                  )}
                </>
              )}
            </>
          )}

          {reservation.date === today && canModify && (
            <Button
              size="sm"
              variant="outline"
              className="text-orange-600 hover:text-orange-700"
              onClick={() => setBlockCourtDialog({ courtId: reservation.courtId, courtName: `${reservation.complexName} - ${reservation.courtName}` })}
            >
              <AlertTriangle size={16} className="mr-2" />
              Bloquear cancha
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header title="Gestión de Reservas" />

      <main className="px-4 py-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {showAllReservations ? "Todas las Reservas" : "Reservas de Hoy"}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {filteredReservations.length} reservas {showAllReservations ? "totales" : "hoy"}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            Filtros
          </Button>
        </div>

        {/* Panel de Filtros */}
        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtros de búsqueda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Complejo</Label>
                  <Select value={filterComplex} onValueChange={setFilterComplex}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {complexes.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Cancha</Label>
                  <Select value={filterCourt} onValueChange={setFilterCourt}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {courts.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tamaño</Label>
                  <Select value={filterSize} onValueChange={setFilterSize}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="F5">F5</SelectItem>
                      <SelectItem value="F7">F7</SelectItem>
                      <SelectItem value="F8">F8</SelectItem>
                      <SelectItem value="F11">F11</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Fecha</Label>
                  <Input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Nombre del jugador</Label>
                  <Input
                    placeholder="Buscar por nombre..."
                    value={filterPlayerName}
                    onChange={(e) => setFilterPlayerName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Estado</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="confirmed">Confirmada</SelectItem>
                      <SelectItem value="waiting">En Espera</SelectItem>
                      <SelectItem value="delayed">Demorado</SelectItem>
                      <SelectItem value="completed">Completada</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
                      <SelectItem value="no-show">No asistió</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setFilterComplex("all")
                  setFilterCourt("all")
                  setFilterSize("all")
                  setFilterDate("")
                  setFilterPlayerName("")
                  setFilterStatus("all")
                }}
              >
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Lista de Reservas */}
        <div className="space-y-4 mb-6">
          {displayedReservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
          {displayedReservations.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-slate-600">No hay reservas {showAllReservations ? "que coincidan con los filtros" : "para hoy"}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Botón Ver Todas las Reservas */}
        {!showAllReservations && (
          <div className="text-center">
            <Button
              onClick={() => {
                setShowAllReservations(true)
                setDisplayedCount(10)
              }}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              <Calendar size={18} className="mr-2" />
              Ver todas las reservas
            </Button>
          </div>
        )}

        {showAllReservations && displayedReservations.length < filteredReservations.length && (
          <div className="text-center py-4">
            <p className="text-sm text-slate-600">Cargando más reservas...</p>
          </div>
        )}
      </main>

      <BottomNav />

      {/* Dialog de Contacto */}
      <Dialog open={!!contactDialog} onOpenChange={() => setContactDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Datos de contacto</DialogTitle>
            <DialogDescription>Información del jugador que realizó la reserva</DialogDescription>
          </DialogHeader>
          {contactDialog && (
            <div className="space-y-4">
              <div>
                <Label>Nombre</Label>
                <p className="text-lg font-medium mt-1">{contactDialog.playerName}</p>
              </div>
              <div>
                <Label>Teléfono</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone size={18} className="text-cyan-600" />
                  <a href={`tel:${contactDialog.playerPhone}`} className="text-lg font-medium text-cyan-600 hover:underline">
                    {contactDialog.playerPhone}
                  </a>
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail size={18} className="text-cyan-600" />
                  <a href={`mailto:${contactDialog.playerEmail}`} className="text-lg font-medium text-cyan-600 hover:underline">
                    {contactDialog.playerEmail}
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Check-in */}
      <Dialog open={!!checkInDialog} onOpenChange={() => setCheckInDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check-in de jugadores</DialogTitle>
            <DialogDescription>Confirma la asistencia de los jugadores</DialogDescription>
          </DialogHeader>
          {checkInDialog && (
            <div className="space-y-4">
              <div>
                <Label>Reserva</Label>
                <p className="font-medium">{checkInDialog.complexName} - {checkInDialog.courtName}</p>
                <p className="text-sm text-slate-600">
                  {checkInDialog.startTime} - {checkInDialog.endTime} • {checkInDialog.playerName}
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
                <p className="text-sm text-emerald-800">
                  Al confirmar el check-in, la reserva se marcará como completada y no podrá ser modificada ni cancelada.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleCheckIn(checkInDialog.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Check size={18} className="mr-2" />
                  Confirmar Check-in
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCheckInDialog(null)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Extender Tolerancia - "Botón de Piedad" */}
      <Dialog open={!!extendToleranceDialog} onOpenChange={() => setExtendToleranceDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🙏 Extender Tolerancia</DialogTitle>
            <DialogDescription>Otorga tiempo adicional antes de marcar como "No asistió"</DialogDescription>
          </DialogHeader>
          {extendToleranceDialog && (
            <div className="space-y-4">
              <div>
                <Label>Reserva</Label>
                <p className="font-medium">{extendToleranceDialog.complexName} - {extendToleranceDialog.courtName}</p>
                <p className="text-sm text-slate-600">
                  {extendToleranceDialog.startTime} - {extendToleranceDialog.endTime} • {extendToleranceDialog.playerName}
                </p>
              </div>

              {extendToleranceDialog.extendedTolerance && extendToleranceDialog.extendedTolerance > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm text-blue-800">
                    Ya se extendió la tolerancia: +{extendToleranceDialog.extendedTolerance} minutos
                  </p>
                </div>
              )}

              <div>
                <Label>Minutos adicionales</Label>
                <Input
                  type="number"
                  value={extendedMinutes}
                  onChange={(e) => setExtendedMinutes(Number(e.target.value))}
                  min="1"
                  max="60"
                  className="mt-2"
                />
                <p className="text-xs text-slate-600 mt-1">
                  Útil cuando el cliente avisa de un retraso justificado (tráfico, emergencia, etc.)
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Caso de uso:</strong> Cliente habitual llama avisando que llegará tarde por un imprevisto.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleExtendTolerance(extendToleranceDialog.id, extendedMinutes)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                >
                  Extender {extendedMinutes} min
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setExtendToleranceDialog(null)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Edición */}
      <Dialog open={!!editDialog} onOpenChange={() => setEditDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modificar reserva</DialogTitle>
            <DialogDescription>Edita los detalles de la reserva</DialogDescription>
          </DialogHeader>
          {editDialog && (
            <div className="space-y-4">
              <div>
                <Label>Fecha</Label>
                <Input
                  type="date"
                  value={editDialog.date}
                  onChange={(e) => setEditDialog({ ...editDialog, date: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hora inicio</Label>
                  <Input
                    type="time"
                    value={editDialog.startTime}
                    onChange={(e) => setEditDialog({ ...editDialog, startTime: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Hora fin</Label>
                  <Input
                    type="time"
                    value={editDialog.endTime}
                    onChange={(e) => setEditDialog({ ...editDialog, endTime: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label>Precio</Label>
                <Input
                  type="number"
                  value={editDialog.totalPrice}
                  onChange={(e) => setEditDialog({ ...editDialog, totalPrice: Number(e.target.value) })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Tolerancia específica (minutos)</Label>
                <Input
                  type="number"
                  value={editDialog.toleranceMinutes ?? ""}
                  onChange={(e) => setEditDialog({ ...editDialog, toleranceMinutes: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="Dejar vacío para usar tolerancia de cancha/complejo"
                  min="0"
                  className="mt-2"
                />
                <p className="text-xs text-slate-600 mt-1">
                  Tolerancia personalizada para esta reserva específica. Si se configura, tiene prioridad sobre la tolerancia de la cancha y del complejo.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleEditReservation}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                >
                  Guardar cambios
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditDialog(null)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Cancelación */}
      <AlertDialog open={!!cancelDialog} onOpenChange={() => setCancelDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar reserva?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción marcará la reserva como cancelada. El jugador será notificado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel className="flex-1">No, mantener</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cancelDialog && handleCancelReservation(cancelDialog)}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Sí, cancelar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de Bloqueo de Cancha */}
      <AlertDialog open={!!blockCourtDialog} onOpenChange={() => setBlockCourtDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Bloquear cancha por el día?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto cancelará todas las reservas del día para <strong>{blockCourtDialog?.courtName}</strong>.
              Los jugadores serán notificados. Si deseas bloquear por tiempo indefinido, hazlo desde el panel de canchas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => blockCourtDialog && handleBlockCourt(blockCourtDialog.courtId)}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              Bloquear cancha
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de Detalles */}
      <Dialog open={!!detailsDialog} onOpenChange={() => setDetailsDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la reserva</DialogTitle>
          </DialogHeader>
          {detailsDialog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Complejo</Label>
                  <p className="font-medium">{detailsDialog.complexName}</p>
                </div>
                <div>
                  <Label>Cancha</Label>
                  <p className="font-medium">{detailsDialog.courtName} ({detailsDialog.courtSize})</p>
                </div>
                <div>
                  <Label>Fecha</Label>
                  <p className="font-medium">{detailsDialog.date === today ? "Hoy" : detailsDialog.date}</p>
                </div>
                <div>
                  <Label>Horario</Label>
                  <p className="font-medium">{detailsDialog.startTime} - {detailsDialog.endTime}</p>
                </div>
                <div>
                  <Label>Precio total</Label>
                  <p className="font-medium text-cyan-600">${detailsDialog.totalPrice}</p>
                </div>
                <div>
                  <Label>Estado</Label>
                  <Badge className={getStatusColor(detailsDialog.status)}>{getStatusLabel(detailsDialog.status)}</Badge>
                </div>
              </div>

              <div>
                <Label>Organizador</Label>
                <p className="font-medium">{detailsDialog.playerName}</p>
                <p className="text-sm text-slate-600">{detailsDialog.playerPhone} • {detailsDialog.playerEmail}</p>
              </div>

              <div>
                <Label>Jugadores participantes ({detailsDialog.players.length})</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {detailsDialog.players.map((player, idx) => (
                    <div key={idx} className="bg-cyan-50 border border-cyan-200 rounded px-3 py-2">
                      <p className="text-sm text-slate-900 font-medium">{player}</p>
                    </div>
                  ))}
                </div>
              </div>

              {detailsDialog.checkInTime && (
                <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
                  <p className="text-sm font-medium text-emerald-800">
                    ✅ Check-in realizado a las {detailsDialog.checkInTime}
                  </p>
                </div>
              )}

              {/* Información del sistema de tolerancia */}
              <div className="border-t pt-4">
                <Label className="text-base">Sistema de Tolerancia</Label>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="bg-slate-50 border border-slate-200 rounded p-3">
                    <p className="font-medium text-slate-800">📋 Configuración de Tolerancia (Jerarquía):</p>
                    <ol className="mt-2 space-y-1 text-slate-700 ml-4 list-decimal">
                      <li><strong>Nivel 1 - Complejo:</strong> Tolerancia global de {detailsDialog.complexName} (por defecto 15 min)</li>
                      <li><strong>Nivel 2 - Cancha:</strong> Si la cancha tiene configuración específica, pisa la del complejo</li>
                      <li><strong>Nivel 3 - Reserva:</strong> Extensiones manuales otorgadas por el encargado</li>
                    </ol>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="font-medium text-blue-800">⏰ Estados del Flujo de Tolerancia:</p>
                    <ul className="mt-2 space-y-1 text-blue-700 ml-4 list-disc">
                      <li><strong>Pendiente/Confirmada:</strong> Antes de la hora de inicio</li>
                      <li><strong>En Espera:</strong> Desde la hora de inicio hasta cumplir la tolerancia</li>
                      <li><strong>Demorado:</strong> Tolerancia cumplida, alerta visual al encargado</li>
                      <li><strong>No-Show:</strong> Tras demora adicional sin check-in, cancha liberada</li>
                    </ul>
                  </div>

                  {detailsDialog.toleranceMinutes !== undefined && (
                    <div className="bg-purple-50 border border-purple-200 rounded p-3">
                      <p className="text-sm text-purple-800">
                        🎯 Esta reserva tiene tolerancia específica: <strong>{detailsDialog.toleranceMinutes} minutos</strong>
                      </p>
                    </div>
                  )}

                  {detailsDialog.extendedTolerance && detailsDialog.extendedTolerance > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-sm text-yellow-800">
                        🙏 Extensión manual otorgada: <strong>+{detailsDialog.extendedTolerance} minutos</strong>
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        (Cliente avisó de un retraso justificado)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
