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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import { Badge } from "../../components/ui/badge"
import { Plus, Edit2, Trash2, MapPin, Users, Settings, Calendar } from "lucide-react"

interface Court {
  id: string
  name: string
  type: "synthetic" | "natural"
  capacity: number
  price: number
  status: "available" | "maintenance" | "reserved"
  timeSlots: { days: string[], from: string, to: string }[]
}

interface Complex {
  name: string
  description: string
  totalCourts: number
  address: string
  phone: string
  email: string
  image: string
}

export default function CanchasPage() {
  const [complex, setComplex] = useState<Complex>({
    name: "Complejo Deportivo García",
    description: "Complejo de canchas de fútbol con instalaciones de primera calidad",
    totalCourts: 4,
    address: "Calle Principal 123, Madrid",
    phone: "+34 612 345 678",
    email: "info@complejogarcía.com",
    image: "/sports-complex.jpg",
  })

  const [courts, setCourts] = useState<Court[]>([
    { id: "1", name: "Cancha 1", type: "synthetic", capacity: 10, price: 50, status: "available", timeSlots: [
      {
        days: [
          "monday", 
          "tuesday", 
          "wednesday", 
          "thursday", 
          "friday", 
          "saturday"
        ],
        from: "09:00",
        to: "23:59"
      }]},
    { id: "2", name: "Cancha 2", type: "natural", capacity: 12, price: 60, status: "available", timeSlots: [
      {
        days: [
          "monday", 
          "tuesday", 
          "wednesday", 
          "thursday", 
          "friday", 
          "saturday"
        ],
        from: "09:00",
        to: "23:59"
      }] },
    { id: "3", name: "Cancha 3", type: "synthetic", capacity: 10, price: 50, status: "maintenance", timeSlots: [
      {
        days: [
          "monday", 
          "tuesday", 
          "wednesday", 
          "thursday", 
          "friday", 
          "saturday"
        ],
        from: "09:00",
        to: "23:59"
      }] },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [isComplexOpen, setIsComplexOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editingComplex, setEditingComplex] = useState(false)
  const [complexData, setComplexData] = useState(complex)
  const [formData, setFormData] = useState<Omit<Court, "id">>({
    name: "",
    type: "synthetic",
    capacity: 10,
    price: 50,
    status: "available",
    timeSlots: [
      {
        days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
        from: "09:00",
        to: "23:59",
      },
    ],
  })

  const dayLabels: Record<string, string> = {
    monday: "Lun",
    tuesday: "Mar",
    wednesday: "Mié",
    thursday: "Jue",
    friday: "Vie",
    saturday: "Sáb",
    sunday: "Dom",
  }



  const handleOpenDialog = (court?: Court) => {
    if (court) {
      setEditingId(court.id)
      const slot = court.timeSlots?.[0] ?? formData.timeSlots![0]
      setFormData({
        name: court.name,
        type: court.type,
        capacity: court.capacity,
        price: court.price,
        status: court.status,
        timeSlots: [slot], 
      })
    } else {
      setEditingId(null)
      setFormData({ 
        name: "", 
        type: "synthetic", 
        capacity: 10, 
        price: 50, 
        status: "available",
        timeSlots: [
          {
            days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
            from: "09:00",
            to: "23:59",
          },
        ],
      })
    }
    setIsOpen(true)
  }

  const handleSave = () => {
    if (!formData.name) return
    const payload: Court = {
      id: editingId ?? Date.now().toString(),
      ...formData,
    }

    if (editingId) {
      setCourts(courts.map((c) => (c.id === editingId ? payload : c)))
    } else {
      setCourts([...courts, payload])
    }

    setIsOpen(false)
    setEditingId(null)
  }

  const getStatusBadge = (status: Court["status"]) => {
    const variants: Record<Court["status"], "default" | "secondary" | "destructive"> = {
      available: "default",
      maintenance: "secondary",
      reserved: "destructive",
    }
    const labels: Record<Court["status"], string> = {
      available: "Disponible",
      maintenance: "Mantenimiento",
      reserved: "Reservada",
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  return (
    <div className="min-h-screen bg-muted-light pb-24">
      <Header title="Gestión de Canchas" />

      <main className="px-4 py-6 max-w-6xl mx-auto">
        <section className="mb-8">
          <Card className="border-2 border-cyan-200 shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-cyan-400 to-blue-600 relative">
              <img
                src={complex.image || "/placeholder.svg"}
                alt={complex.name}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900">{complex.name}</h2>
                  <p className="text-slate-600 mt-2">{complex.description}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} className="text-cyan-600" />
                      {complex.address}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} className="text-cyan-600" />
                      {complex.totalCourts} canchas
                    </span>
                  </div>
                </div>
                <Dialog open={isComplexOpen} onOpenChange={setIsComplexOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditingComplex(true)
                        setComplexData(complex)
                      }}
                      className="gap-2"
                    >
                      <Settings size={16} />
                      Editar Complejo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Editar Complejo</DialogTitle>
                      <DialogDescription>Actualiza la información de tu complejo deportivo</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="complexName">Nombre del Complejo</Label>
                        <Input
                          id="complexName"
                          value={complexData.name}
                          onChange={(e) => setComplexData({ ...complexData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Descripción</Label>
                        <Input
                          id="description"
                          value={complexData.description}
                          onChange={(e) => setComplexData({ ...complexData, description: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          id="address"
                          value={complexData.address}
                          onChange={(e) => setComplexData({ ...complexData, address: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={complexData.phone}
                          onChange={(e) => setComplexData({ ...complexData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={complexData.email}
                          onChange={(e) => setComplexData({ ...complexData, email: e.target.value })}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          setComplex(complexData)
                          setIsComplexOpen(false)
                        }}
                        className="w-full"
                      >
                        Guardar Cambios
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Mis Canchas</h2>
            <p className="text-sm text-muted mt-1">{courts.length} canchas registradas</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => (window.location.href = "/disponibilidad")} variant="outline" className="gap-2">
              <Calendar size={20} />
              Editar Disponibilidad
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus size={20} />
                  Nueva Cancha
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingId ? "Editar Cancha" : "Nueva Cancha"}</DialogTitle>
                  <DialogDescription>
                    {editingId ? "Actualiza los datos de la cancha" : "Crea una nueva cancha en tu complejo"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Cancha 1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value as "synthetic" | "natural" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="synthetic">Sintética</SelectItem>
                        <SelectItem value="natural">Natural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="capacity">Cantidad de Jugadores</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Precio por hora ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Estado</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value as Court["status"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="maintenance">Mantenimiento</SelectItem>
                        <SelectItem value="reserved">Reservada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Días habilitados</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.keys(dayLabels).map((day) => {
                        const active = formData.timeSlots?.[0].days.includes(day)
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => {
                              const current = formData.timeSlots?.[0]!
                              const exists = current.days.includes(day)
                              const days = exists
                                ? current.days.filter((d) => d !== day)
                                : [...current.days, day]
                              setFormData({
                                ...formData,
                                timeSlots: [{ ...current, days }],
                              })
                            }}
                            className={`px-3 py-1 rounded border text-sm ${
                              active ? "bg-cyan-100 border-cyan-300" : "bg-white border-border"
                            }`}
                          >
                            {dayLabels[day]}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="from">Hora desde</Label>
                      <Input
                        id="from"
                        type="time"
                        value={formData.timeSlots?.[0].from || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            timeSlots: [{ ...formData.timeSlots?.[0]!, from: e.target.value }],
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="to">Hora hasta</Label>
                      <Input
                        id="to"
                        type="time"
                        value={formData.timeSlots?.[0].to || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            timeSlots: [{ ...formData.timeSlots?.[0]!, to: e.target.value }],
                          })
                        }
                      />
                    </div>
                  </div>



                  <Button onClick={handleSave} className="w-full">
                    {editingId ? "Actualizar" : "Crear"} Cancha
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courts.map((court) => (
            <Card key={court.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{court.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {court.type === "synthetic" ? "Sintética" : "Natural"}
                    </CardDescription>
                  </div>
                  {getStatusBadge(court.status)}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-primary" />
                    <span>Capacidad: {court.capacity} jugadores</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-primary" />
                    <span>${court.price} por hora</span>
                  </div>
                </div>
              </CardContent>

              <CardContent className="flex-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-primary" />
                    <span>Capacidad: {court.capacity} jugadores</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-primary" />
                    <span>${court.price} por hora</span>
                  </div>
                  {court.timeSlots?.[0] && (
                    <div className="space-y-1 text-sm pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">Días:</span>
                        <span className="text-slate-600">
                          {court.timeSlots[0].days.map((d) => dayLabels[d]).join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">Horario:</span>
                        <span className="text-slate-600">
                          {court.timeSlots[0].from} - {court.timeSlots[0].to}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>


              <div className="px-6 pb-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => handleOpenDialog(court)}
                >
                  <Edit2 size={16} />
                  Editar
                </Button>
                <Button variant="destructive" size="sm" className="flex-1 gap-2" onClick={() => setDeleteId(court.id)}>
                  <Trash2 size={16} />
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {courts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted mb-4">No hay canchas registradas</p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenDialog()}>Crear primera cancha</Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar cancha</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar esta cancha? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setCourts(courts.filter((c) => c.id !== deleteId))
                setDeleteId(null)
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </div>
  )
}
