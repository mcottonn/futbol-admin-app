"use client"

import { useState } from "react"
import { Header } from "../../components/layout/header"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Separator } from "../../components/ui/separator"
import { BottomNav } from "../../components/layout/bottom-nav"

export default function PerfilPage() {
  const [profileData, setProfileData] = useState({
    name: "Juan García",
    email: "juan@example.com",
    phone: "+34 612 345 678",
    address: "Calle Principal 123, Madrid",
    city: "Madrid",
    postalCode: "28001",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(profileData)

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
      <Header title="Tu Perfil" />

      <main className="px-4 py-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Tus datos privados (solo visible para ti)</CardDescription>
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
      </main>

      <BottomNav />
    </div>
  )
}
