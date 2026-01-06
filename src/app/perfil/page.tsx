"use client"

import { Badge } from "../../components/ui/badge"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "../../components/layout/header"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Separator } from "../../components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import { User } from "lucide-react"

export default function PerfilPage() {
  const [profileData, setProfileData] = useState({
    name: "Juan García",
    email: "juan@example.com",
    phone: "+34 612 345 678",
    businessName: "Complejo Deportivo García",
    address: "Calle Principal 123, Madrid",
    city: "Madrid",
    postalCode: "28001",
  })

  const [complexPublicData] = useState({
    name: "Complejo Deportivo García",
    description: "Complejo de canchas de fútbol con instalaciones de primera calidad",
    totalCourts: 4,
    address: "Calle Principal 123, Madrid",
    services: ["Estacionamiento", "Vestuarios", "Duchas", "Cafetería"],
    image: "/sports-complex.jpg",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editData, setEditData] = useState(profileData)

  const searchParams = useSearchParams();
  const tabParam = (searchParams.get('tab') as 'public' | 'profile') ?? 'public';
  const [tab, setTab] = useState<'public' | 'profile'>(tabParam);

  useEffect(() => {
    // Sincroniza cuando cambia ?tab en la URL
    setTab(tabParam);
  }, [tabParam]);

  const handleSaveProfile = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-muted-light pb-24">
      <Header title="Perfil" />

      <main className="px-4 py-6 max-w-4xl mx-auto">
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="public" className="gap-2">
              <User size={16} />
              Público
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User size={16} />
              Privado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="public" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfil Público del Complejo</CardTitle>
                <CardDescription>Información visible para los jugadores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={complexPublicData.image || "/placeholder.svg"}
                    alt={complexPublicData.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-muted">Nombre del Complejo</Label>
                    <p className="text-foreground font-medium mt-1">{complexPublicData.name}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted">Descripción</Label>
                    <p className="text-foreground font-medium mt-1">{complexPublicData.description}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted">Cantidad de Canchas</Label>
                    <p className="text-foreground font-medium mt-1">{complexPublicData.totalCourts}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted">Dirección</Label>
                    <p className="text-foreground font-medium mt-1">{complexPublicData.address}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted">Servicios</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {complexPublicData.services.map((service) => (
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
                      //llowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Label className="text-xs text-muted">Reseñas</Label>
                  <div className="space-y-4 mt-4">
                    {[
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
                    ].map((review, index) => (
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
          </TabsContent>

          {/* Profile Tab - Datos Privados */}
          <TabsContent value="profile" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Privada</CardTitle>
                <CardDescription>Tus datos personales (solo visible para ti)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Juan" />
                    <AvatarFallback>JG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{profileData.name}</p>
                    <p className="text-sm text-muted">{profileData.businessName}</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Cambiar foto
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Personal Information */}
                {!isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted">Nombre</Label>
                        <p className="text-foreground font-medium mt-1">{profileData.name}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted">Email</Label>
                        <p className="text-foreground font-medium mt-1">{profileData.email}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted">Teléfono</Label>
                        <p className="text-foreground font-medium mt-1">{profileData.phone}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted">Nombre del Negocio</Label>
                        <p className="text-foreground font-medium mt-1">{profileData.businessName}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Dirección</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted">Dirección</Label>
                          <p className="text-foreground font-medium mt-1">{profileData.address}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted">Ciudad</Label>
                          <p className="text-foreground font-medium mt-1">{profileData.city}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted">Código Postal</Label>
                          <p className="text-foreground font-medium mt-1">{profileData.postalCode}</p>
                        </div>
                      </div>
                    </div>

                    <Button onClick={() => setIsEditing(true)} className="w-full">
                      Editar Perfil
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessName">Nombre del Negocio</Label>
                        <Input
                          id="businessName"
                          value={editData.businessName}
                          onChange={(e) => setEditData({ ...editData, businessName: e.target.value })}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Dirección</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Dirección</Label>
                          <Input
                            id="address"
                            value={editData.address}
                            onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">Ciudad</Label>
                          <Input
                            id="city"
                            value={editData.city}
                            onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Código Postal</Label>
                          <Input
                            id="postalCode"
                            value={editData.postalCode}
                            onChange={(e) => setEditData({ ...editData, postalCode: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="flex-1">
                        Guardar Cambios
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="flex-1 bg-transparent">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* <BottomNav /> */}
    </div>
  )
}
