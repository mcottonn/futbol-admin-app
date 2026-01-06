"use client"

import { useState } from "react"
import { Header } from "../../components/layout/header"
import { BottomNav } from "../../components/layout/bottom-nav"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Plus, Trash2, Calendar, Lock } from "lucide-react"

interface RecurringBlock {
  id: string
  courtId: string
  courtName: string
  dayOfWeek: number
  startTime: string
  endTime: string
  reason: string
}

interface ComplexEvent {
  id: string
  date: string
  startTime: string
  endTime: string
  title: string
  description: string
  blockedCourts: string[]
}

interface CourtAvailability {
  id: string
  courtId: string
  courtName: string
  date: string
  startTime: string
  endTime: string
  reason: string
  notes?: string
}

export default function DisponibilidadPage() {
  const [courts] = useState([
    { id: "1", name: "Cancha 1" },
    { id: "2", name: "Cancha 2" },
    { id: "3", name: "Cancha 3" },
  ])

  const [recurringBlocks, setRecurringBlocks] = useState<RecurringBlock[]>([
    {
      id: "1",
      courtId: "1",
      courtName: "Cancha 1",
      dayOfWeek: 1,
      startTime: "19:00",
      endTime: "21:00",
      reason: "Equipo fijo - Los Campeones",
    },
  ])

  const [courtAvailability, setCourtAvailability] = useState<CourtAvailability[]>([
    {
      id: "1",
      courtId: "1",
      courtName: "Cancha 1",
      date: "2025-11-20",
      startTime: "14:00",
      endTime: "16:00",
      reason: "Mantenimiento",
    },
  ])

  const [isRecurringOpen, setIsRecurringOpen] = useState(false)
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)

  const [recurringForm, setRecurringForm] = useState({
    courtId: "",
    dayOfWeek: "1",
    startTime: "19:00",
    endTime: "21:00",
    reason: "",
  })

  const [availabilityForm, setAvailabilityForm] = useState({
    date: "",
    startTime: "14:00",
    endTime: "16:00",
    blockedCourts: [] as string[],
    notes: "",
  })

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  const handleAddRecurring = () => {
    if (!recurringForm.courtId || !recurringForm.reason) return

    const court = courts.find((c) => c.id === recurringForm.courtId)
    setRecurringBlocks([
      ...recurringBlocks,
      {
        id: Date.now().toString(),
        courtId: recurringForm.courtId,
        courtName: court?.name || "",
        dayOfWeek: Number.parseInt(recurringForm.dayOfWeek),
        startTime: recurringForm.startTime,
        endTime: recurringForm.endTime,
        reason: recurringForm.reason,
      },
    ])
    setRecurringForm({ courtId: "", dayOfWeek: "1", startTime: "19:00", endTime: "21:00", reason: "" })
    setIsRecurringOpen(false)
  }

  const handleAddAvailability = () => {
    if (!availabilityForm.date || availabilityForm.blockedCourts.length === 0) return

    setCourtAvailability([
      ...courtAvailability,
      {
        id: Date.now().toString(),
        courtId: availabilityForm.blockedCourts[0],
        courtName: courts.find((c) => c.id === availabilityForm.blockedCourts[0])?.name || "",
        date: availabilityForm.date,
        startTime: availabilityForm.startTime,
        endTime: availabilityForm.endTime,
        reason: "Bloqueo específico",
        notes: availabilityForm.notes,
      },
    ])
    setAvailabilityForm({ date: "", startTime: "14:00", endTime: "16:00", blockedCourts: [], notes: "" })
    setIsAvailabilityOpen(false)
  }

  return (
    <div className="min-h-screen bg-muted-light pb-24">
      <Header title="Editar Disponibilidad" />

      <main className="px-4 py-6 max-w-6xl mx-auto">
        <Tabs defaultValue="recurring" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="recurring">Reservas Recurrentes</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidad Especifica</TabsTrigger>
          </TabsList>

          {/* RECURRING BLOCKS TAB */}
          <TabsContent value="recurring" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar size={20} className="text-cyan-600" />
                      Reservas Recurrentes
                    </CardTitle>
                    <CardDescription>Configura canchas que se reservan siempre el mismo día y horario</CardDescription>
                  </div>
                  <Dialog open={isRecurringOpen} onOpenChange={setIsRecurringOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus size={16} />
                        Agregar Reserva Recurrente
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nueva Reserva Recurrente</DialogTitle>
                        <DialogDescription>Configura una cancha que se reserva regularmente</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="court">Cancha</Label>
                          <Select
                            value={recurringForm.courtId}
                            onValueChange={(value) => setRecurringForm({ ...recurringForm, courtId: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una cancha" />
                            </SelectTrigger>
                            <SelectContent>
                              {courts.map((court) => (
                                <SelectItem key={court.id} value={court.id}>
                                  {court.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="day">Día de la Semana</Label>
                          <Select
                            value={recurringForm.dayOfWeek}
                            onValueChange={(value) => setRecurringForm({ ...recurringForm, dayOfWeek: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {daysOfWeek.map((day, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startTime">Hora Inicio</Label>
                            <Input
                              id="startTime"
                              type="time"
                              value={recurringForm.startTime}
                              onChange={(e) => setRecurringForm({ ...recurringForm, startTime: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="endTime">Hora Fin</Label>
                            <Input
                              id="endTime"
                              type="time"
                              value={recurringForm.endTime}
                              onChange={(e) => setRecurringForm({ ...recurringForm, endTime: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="reason">Razón/Equipo</Label>
                          <Input
                            id="reason"
                            placeholder="Ej: Equipo Los Campeones"
                            value={recurringForm.reason}
                            onChange={(e) => setRecurringForm({ ...recurringForm, reason: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleAddRecurring} className="w-full">
                          Agregar Reserva Recurrente
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recurringBlocks.length === 0 ? (
                    <p className="text-muted text-center py-8">No hay reservas recurrentes configuradas</p>
                  ) : (
                    recurringBlocks.map((block) => (
                      <div
                        key={block.id}
                        className="flex items-center justify-between p-4 border border-cyan-200 rounded-lg bg-cyan-50"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{block.courtName}</p>
                          <p className="text-sm text-slate-600">
                            {daysOfWeek[block.dayOfWeek]} • {block.startTime} - {block.endTime}
                          </p>
                          <p className="text-sm text-cyan-600 mt-1">{block.reason}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRecurringBlocks(recurringBlocks.filter((b) => b.id !== block.id))}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AVAILABILITY TAB */}
          <TabsContent value="availability" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Lock size={20} className="text-cyan-600" />
                      Disponibilidad Especifica
                    </CardTitle>
                    <CardDescription>
                      Gestiona la disponibilidad de canchas en fechas y horarios específicos
                    </CardDescription>
                  </div>
                  <Dialog open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus size={16} />
                        Gestionar Disponibilidad
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Gestionar Disponibilidad</DialogTitle>
                        <DialogDescription>Bloquea canchas en fechas y horarios específicos</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="availDate">Fecha (Calendario)</Label>
                          <Input
                            id="availDate"
                            type="date"
                            value={availabilityForm.date}
                            onChange={(e) => setAvailabilityForm({ ...availabilityForm, date: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="availStartTime">Hora Inicio</Label>
                            <Input
                              id="availStartTime"
                              type="time"
                              value={availabilityForm.startTime}
                              onChange={(e) => setAvailabilityForm({ ...availabilityForm, startTime: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="availEndTime">Hora Fin</Label>
                            <Input
                              id="availEndTime"
                              type="time"
                              value={availabilityForm.endTime}
                              onChange={(e) => setAvailabilityForm({ ...availabilityForm, endTime: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Canchas a Bloquear</Label>
                          <div className="space-y-2 mt-2">
                            {courts.map((court) => (
                              <div key={court.id} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`court-${court.id}`}
                                  checked={availabilityForm.blockedCourts?.includes(court.id) || false}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setAvailabilityForm({
                                        ...availabilityForm,
                                        blockedCourts: [...(availabilityForm.blockedCourts || []), court.id],
                                      })
                                    } else {
                                      setAvailabilityForm({
                                        ...availabilityForm,
                                        blockedCourts: (availabilityForm.blockedCourts || []).filter(
                                          (id) => id !== court.id,
                                        ),
                                      })
                                    }
                                  }}
                                  className="w-4 h-4 rounded border-cyan-300 text-cyan-600"
                                />
                                <label htmlFor={`court-${court.id}`} className="text-sm cursor-pointer">
                                  {court.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="availNotes">Notas</Label>
                          <textarea
                            id="availNotes"
                            placeholder="Escribe notas sobre este bloqueo (solo visible para ti)"
                            value={availabilityForm.notes || ""}
                            onChange={(e) => setAvailabilityForm({ ...availabilityForm, notes: e.target.value })}
                            className="w-full p-2 border border-cyan-300 rounded-lg text-sm"
                            rows={3}
                          />
                        </div>
                        <Button onClick={handleAddAvailability} className="w-full">
                          Guardar Disponibilidad
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courtAvailability.length === 0 ? (
                    <p className="text-muted text-center py-8">No hay bloqueos de disponibilidad configurados</p>
                  ) : (
                    courtAvailability.map((avail) => (
                      <div
                        key={avail.id}
                        className="flex items-center justify-between p-4 border border-cyan-200 rounded-lg bg-cyan-50"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{avail.courtName}</p>
                          <p className="text-sm text-slate-600">
                            {avail.date} • {avail.startTime} - {avail.endTime}
                          </p>
                          {avail.notes && <p className="text-sm text-cyan-600 mt-1">Notas: {avail.notes}</p>}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCourtAvailability(courtAvailability.filter((a) => a.id !== avail.id))}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  )
}
