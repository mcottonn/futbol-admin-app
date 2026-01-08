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
  complexId: string
  name: string
  type: "synthetic" | "natural"
  size: "F5" | "F7" | "F8" | "F11"
  price: number
  status: "available" | "maintenance" | "reserved"
  timeSlots: { days: string[], from: string, to: string }[]
  toleranceMinutes?: number // Tolerancia específica de la cancha (pisa la del complejo)
}

interface Complex {
  id: string
  name: string
  description: string
  totalCourts: number
  address: string
  phone: string
  email: string
  image: string
}

export default function CanchasPage() {
  const [complexes] = useState<Complex[]>([
    {
      id: "1",
      name: "Complejo Deportivo García",
      description: "Complejo de canchas de fútbol con instalaciones de primera calidad",
      totalCourts: 4,
      address: "Calle Principal 123, Madrid",
      phone: "+34 612 345 678",
      email: "info@complejogarcía.com",
      image: "/sports-complex.jpg",
    },
    {
      id: "2",
      name: "Complejo Central",
      description: "Instalaciones deportivas en el centro de la ciudad",
      totalCourts: 2,
      address: "Avenida Central 456, Madrid",
      phone: "+34 612 345 679",
      email: "info@complejocentral.com",
      image: "/sports-complex-2.jpg",
    },
  ])

  const [selectedComplexId, setSelectedComplexId] = useState<string>("1")
  const selectedComplex = complexes.find(c => c.id === selectedComplexId)

  const [courts, setCourts] = useState<Court[]>([
    { id: "1", complexId: "1", name: "Cancha 1", type: "synthetic", size: "F5", price: 50, status: "available", timeSlots: [
      {
        days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
        from: "09:00",
        to: "23:59"
      }]},
    { id: "2", complexId: "1", name: "Cancha 2", type: "natural", size: "F11", price: 60, status: "available", timeSlots: [
      {
        days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
        from: "09:00",
        to: "23:59"
      }] },
    { id: "3", complexId: "1", name: "Cancha 3", type: "synthetic", size: "F7", price: 50, status: "maintenance", timeSlots: [
      {
        days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
        from: "09:00",
        to: "23:59"
      }] },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isCustomSize, setIsCustomSize] = useState(false)
  const [customSizeNumber, setCustomSizeNumber] = useState("")
  const filteredCourts = courts.filter(court => court.complexId === selectedComplexId)
  const [formData, setFormData] = useState<Omit<Court, "id" | "complexId">>({
    name: "",
    type: "synthetic",
    size: "F5",
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
      
      // Detectar si es un tamaño personalizado
      const standardSizes = ["F5", "F7", "F8", "F11"]
      if (!standardSizes.includes(court.size)) {
        setIsCustomSize(true)
        setCustomSizeNumber(court.size.replace("F", ""))
      } else {
        setIsCustomSize(false)
        setCustomSizeNumber("")
      }
      
      setFormData({
        name: court.name,
        type: court.type,
        size: court.size,
        price: court.price,
        status: court.status,
        timeSlots: [slot], 
      })
    } else {
      setEditingId(null)
      setIsCustomSize(false)
      setCustomSizeNumber("")
      setFormData({ 
        name: "", 
        type: "synthetic", 
        size: "F5", 
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
      complexId: selectedComplexId,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-300"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "reserved":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Disponible"
      case "maintenance":
        return "Mantenimiento"
      case "reserved":
        return "Reservada"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-muted-light pb-24">
      <Header title="Gestión de Canchas" />

      <main className="px-4 py-6 max-w-6xl mx-auto space-y-6">
        {/* Selector de Complejo */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-semibold whitespace-nowrap">Complejo:</Label>
              <Select value={selectedComplexId} onValueChange={setSelectedComplexId}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {complexes.map((complex) => (
                    <SelectItem key={complex.id} value={complex.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{complex.name}</span>
                        <span className="text-xs text-muted">({complex.totalCourts} canchas)</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Info del Complejo Seleccionado */}
        {selectedComplex && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedComplex.name}</CardTitle>
                  <CardDescription className="mt-2">{selectedComplex.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-muted">{selectedComplex.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-muted">{filteredCourts.length} canchas activas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sección de Canchas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Canchas</CardTitle>
                <CardDescription>Administra las canchas del complejo seleccionado</CardDescription>
              </div>
              <Button onClick={() => handleOpenDialog()}>
                <Plus size={18} className="mr-2" />
                Nueva Cancha
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourts.map((court) => (
                <Card key={court.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{court.name}</CardTitle>
                        <p className="text-sm text-muted mt-1">
                          {court.type === "synthetic" ? "Sintética" : "Natural"}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(court.status)} border`}>
                        {getStatusLabel(court.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={16} className="text-primary" />
                        <span>Tamaño: {court.size}</span>
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
                  <div className="flex border-t">
                    <button
                      onClick={() => handleOpenDialog(court)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-50 transition text-sm font-medium text-primary"
                    >
                      <Edit2 size={16} />
                      Editar
                    </button>
                    <div className="w-px bg-border" />
                    <button
                      onClick={() => setDeleteId(court.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-red-50 transition text-sm font-medium text-red-600"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredCourts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted mb-4">No hay canchas creadas para este complejo</p>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus size={18} className="mr-2" />
                  Crear Primera Cancha
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialog para crear/editar cancha */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Cancha" : "Nueva Cancha"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Actualiza los datos de la cancha" : "Crea una nueva cancha en " + selectedComplex?.name}
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
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as "synthetic" | "natural" })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="synthetic">Sintética</SelectItem>
                  <SelectItem value="natural">Natural</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="size">Tamaño de Cancha</Label>
              <Select
                value={isCustomSize ? "custom" : formData.size}
                onValueChange={(value) => {
                  if (value === "custom") {
                    setIsCustomSize(true)
                    setCustomSizeNumber("")
                  } else {
                    setIsCustomSize(false)
                    setFormData({ ...formData, size: value as Court["size"] })
                  }
                }}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F5">F5</SelectItem>
                  <SelectItem value="F7">F7</SelectItem>
                  <SelectItem value="F8">F8</SelectItem>
                  <SelectItem value="F11">F11</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
              {isCustomSize && (
                <div className="mt-2">
                  <Input
                    id="customSize"
                    type="number"
                    value={customSizeNumber}
                    onChange={(e) => {
                      const num = e.target.value
                      setCustomSizeNumber(num)
                      if (num) {
                        setFormData({ ...formData, size: `F${num}` as Court["size"] })
                      }
                    }}
                    placeholder="Ingrese el número (ej: 6 para F6)"
                    min="1"
                  />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="price">Precio por hora ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                min="1"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Court["status"] })}
              >
                <SelectTrigger className="mt-2">
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
              <Label htmlFor="tolerance">Tolerancia de espera (minutos)</Label>
              <Input
                id="tolerance"
                type="number"
                value={formData.toleranceMinutes ?? ""}
                onChange={(e) => setFormData({ ...formData, toleranceMinutes: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Dejar vacío para usar tolerancia del complejo"
                min="0"
                className="mt-2"
              />
              <p className="text-xs text-slate-600 mt-1">
                Configuración específica para esta cancha. Si se deja vacío, se usará la tolerancia del complejo.
                <br />
                <strong>Ejemplo:</strong> Fútbol 11 profesional = 0 min, Fútbol 5 = 15 min
              </p>
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
                  className="mt-2"
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
                  className="mt-2"
                />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              {editingId ? "Actualizar" : "Crear"} Cancha
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AlertDialog para confirmar eliminación */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cancha?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La cancha será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setCourts(courts.filter((c) => c.id !== deleteId))
              setDeleteId(null)
            }} className="flex-1 bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </div>
  )
}
