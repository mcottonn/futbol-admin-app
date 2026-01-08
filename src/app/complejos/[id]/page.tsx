"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit } from "lucide-react"
import { Header } from "../../../components/layout/header"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { Button } from "../../../components/ui/button"
import { BottomNav } from "../../../components/layout/bottom-nav"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"

interface ComplexDetail {
  id: string
  name: string
  description: string
  totalCourts: number
  address: string
  phone: string
  email: string
  services: string[]
  image: string
}

export default function ComplejoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [complex, setComplex] = useState<ComplexDetail>({
    id: id,
    name: "Complejo Deportivo García",
    description: "Complejo de canchas de fútbol con instalaciones de primera calidad",
    totalCourts: 4,
    address: "Calle Principal 123, Madrid",
    phone: "+34 612 345 678",
    email: "info@complejogarcía.com",
    services: ["Estacionamiento", "Vestuarios", "Duchas", "Cafetería"],
    image: "/sports-complex.jpg",
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editData, setEditData] = useState(complex)

  const reviews = [
    {
      name: "Carlos Rodríguez",
      rating: 5,
      comment: "Excelente complejo, canchas en perfecto estado y muy buena atención del personal.",
    },
    {
      name: "Miguel Fernández",
      rating: 4,
      comment: "Muy buenas instalaciones. Solo faltaría mejorar un poco los vestuarios.",
    },
    {
      name: "Juan López",
      rating: 5,
      comment: "Perfecto para jugar con amigos. Recomendado 100%. Volveré pronto.",
    },
    {
      name: "Pedro García",
      rating: 4,
      comment: "Buen complejo, canchas bien mantenidas. La cafetería podría mejorar.",
    },
    {
      name: "Andrés Martínez",
      rating: 5,
      comment: "Increíble experiencia. El mejor complejo de la zona. Muy recomendado.",
    },
  ]

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

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
    setEditData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleEdit = () => {
    setEditData(complex)
    setIsEditDialogOpen(true)
  }

  const handleSave = () => {
    setComplex(editData)
    setIsEditDialogOpen(false)
  }

  const handleCancel = () => {
    setEditData(complex)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-muted-light pb-24">
      <Header title={complex.name} />

      <main className="px-4 py-6 max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 -ml-2"
        >
          <ArrowLeft size={18} className="mr-2" />
          Volver
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Información del Complejo</CardTitle>
            <CardDescription>Datos públicos visibles para los jugadores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg overflow-hidden">
              <img
                src={complex.image || "/placeholder.svg"}
                alt={complex.name}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted">Nombre del Complejo</Label>
                <p className="text-foreground font-medium mt-1">{complex.name}</p>
              </div>
              <div>
                <Label className="text-xs text-muted">Descripción</Label>
                <p className="text-foreground font-medium mt-1">{complex.description}</p>
              </div>
              <div>
                <Label className="text-xs text-muted">Cantidad de Canchas</Label>
                <p className="text-foreground font-medium mt-1">{complex.totalCourts}</p>
              </div>
              <div>
                <Label className="text-xs text-muted">Dirección</Label>
                <p className="text-foreground font-medium mt-1">{complex.address}</p>
              </div>
              <div>
                <Label className="text-xs text-muted">Teléfono</Label>
                <p className="text-foreground font-medium mt-1">{complex.phone}</p>
              </div>
              <div>
                <Label className="text-xs text-muted">Email</Label>
                <p className="text-foreground font-medium mt-1">{complex.email}</p>
              </div>
              <div>
                <Label className="text-xs text-muted">Servicios</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {complex.services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted">Ubicación</Label>
              <div className="rounded-lg overflow-hidden mt-2 h-64 bg-gray-200">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-3.7038!3d40.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAwLjUiTiAzwrA0MiczOC4zIlc!5e0!3m2!1ses!2ses!4v1234567890"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleEdit} size="sm" variant="outline">
                <Edit size={16} className="mr-2" />
                Editar Información
              </Button>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-xs text-muted">Reseñas</Label>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < Math.round(parseFloat(averageRating)) ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-bold text-foreground">{averageRating}</span>
                  <span className="text-sm text-muted">({reviews.length} reseñas)</span>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="p-4 border border-cyan-200 rounded-lg bg-cyan-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">{review.name}</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dialog para editar complejo */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Complejo</DialogTitle>
              <DialogDescription>
                Actualiza la información del complejo deportivo
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-name">Nombre del Complejo</Label>
                <Input
                  id="edit-name"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="edit-address">Dirección</Label>
                <Input
                  id="edit-address"
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-phone">Teléfono</Label>
                  <Input
                    id="edit-phone"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-image">Imagen del Complejo</Label>
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setEditData({ ...editData, image: reader.result as string })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="cursor-pointer mt-2"
                />
                {editData.image && (
                  <div className="mt-2">
                    <img src={editData.image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div>
                <Label>Servicios</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableServices.map((service) => (
                    <Badge
                      key={service}
                      variant={editData.services.includes(service) ? "default" : "outline"}
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
              <Button onClick={handleSave} className="flex-1">
                Guardar Cambios
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <BottomNav />
    </div>
  )
}
