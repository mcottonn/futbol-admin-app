"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "../../components/layout/header"
import { Card, CardContent } from "../../components/ui/card"
import { Plus, MapPin } from "lucide-react"
import { BottomNav } from "../../components/layout/bottom-nav"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"

interface Complex {
  id: string
  name: string
  description: string
  totalCourts: number
  address: string
  phone: string
  email: string
  services: string[]
  image: string
  defaultTolerance: number // Tolerancia global en minutos
}

export default function ComplejosPage() {
  const [complexes, setComplexes] = useState<Complex[]>([
    {
      id: "1",
      name: "Complejo Deportivo García",
      description: "Complejo de canchas de fútbol con instalaciones de primera calidad",
      totalCourts: 4,
      address: "Calle Principal 123, Madrid",
      phone: "+34 612 345 678",
      email: "info@complejogarcía.com",
      services: ["Estacionamiento", "Vestuarios", "Duchas", "Cafetería"],
      image: "/sports-complex.jpg",
      defaultTolerance: 15, // 15 minutos por defecto
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalCourts: 0,
    address: "",
    phone: "",
    email: "",
    services: [] as string[],
    image: "",
    defaultTolerance: 15,
  })

  const availableServices = [
    "Estacionamiento",
    "Vestuarios",
    "Duchas",
    "Cafetería",
    "WiFi",
    "Iluminación",
    "Seguridad",
  ]

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleCreateComplex = () => {
    if (!formData.name || !formData.description || !formData.address) return

    const newComplex: Complex = {
      id: Date.now().toString(),
      ...formData,
    }

    setComplexes([...complexes, newComplex])
    setIsDialogOpen(false)
    setFormData({
      name: "",
      description: "",
      totalCourts: 0,
      address: "",
      phone: "",
      email: "",
      services: [],
      image: "",
      defaultTolerance: 15,
    })
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    setFormData({
      name: "",
      description: "",
      totalCourts: 0,
      address: "",
      phone: "",
      email: "",
      services: [],
      image: "",
      defaultTolerance: 15,
    })
  }

  return (
    <div className="min-h-screen bg-muted-light pb-24">
      <Header title="Tus Complejos" />

      <main className="px-4 py-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tarjetas de complejos existentes */}
          {complexes.map((complex) => (
            <Link key={complex.id} href={`/complejos/${complex.id}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={complex.image || "/placeholder.svg"}
                    alt={complex.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-2">{complex.name}</h3>
                  <p className="text-sm text-muted line-clamp-2 mb-3">{complex.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <MapPin size={14} className="text-primary" />
                    <span className="line-clamp-1">{complex.address}</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-primary">
                    {complex.totalCourts} {complex.totalCourts === 1 ? "cancha" : "canchas"}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Tarjeta para crear nuevo complejo */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow h-full border-2 border-dashed border-primary hover:border-solid"
            onClick={() => setIsDialogOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] p-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Plus size={32} className="text-primary" />
              </div>
              <h3 className="font-bold text-lg text-foreground text-center">Crear nuevo complejo</h3>
              <p className="text-sm text-muted text-center mt-2">
                Agrega un nuevo complejo deportivo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dialog para crear complejo */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Complejo</DialogTitle>
              <DialogDescription>
                Completa la información del complejo deportivo
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">Nombre del Complejo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Complejo Deportivo Central"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe tu complejo..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="address">Dirección *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Calle, número, ciudad"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="info@complejo.com"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">Imagen del Complejo</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setFormData({ ...formData, image: reader.result as string })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="cursor-pointer mt-2"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="defaultTolerance">Tolerancia Global (minutos)</Label>
                <Input
                  id="defaultTolerance"
                  type="number"
                  value={formData.defaultTolerance || 15}
                  onChange={(e) => setFormData({ ...formData, defaultTolerance: Number(e.target.value) })}
                  min="0"
                  className="mt-2"
                />
                <p className="text-xs text-slate-600 mt-1">
                  Tiempo de espera por defecto antes de marcar una reserva como "No asistió". Este valor se aplica a todas las canchas del complejo, a menos que se configure una tolerancia específica por cancha.
                </p>
              </div>

              <div>
                <Label>Servicios</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableServices.map((service) => (
                    <Badge
                      key={service}
                      variant={formData.services.includes(service) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleService(service)}
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleCancel} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleCreateComplex} className="flex-1">
                Crear Complejo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <BottomNav />
    </div>
  )
}
