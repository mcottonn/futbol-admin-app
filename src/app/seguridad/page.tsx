"use client"

import React, { useState } from 'react';
import { Header } from '../../components/layout/header';
import { BottomNav } from '../../components/layout/bottom-nav';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog';
import { Switch } from '../../components/ui/switch';
import { Lock, LogOut, Trash2, User, Bell, Mail, Eye, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SeguridadPage() {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reservationReminders, setReservationReminders] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    router.push("/auth/login");
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    router.push("/auth/login");
  };
  

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Configuración" />

      <main className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Botón para ir al perfil */}
          <Link href="/perfil" className="mb-6 block">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <User size={16} />
              Ir a tu Perfil
            </Button>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
            </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Lock size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Cambiar Contraseña</p>
                      <p className="text-sm text-muted">Actualiza tu contraseña regularmente</p>
                    </div>
                  </div>
                  <Button variant="outline" className="bg-transparent">Cambiar</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Notificaciones</h3>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Bell size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Notificaciones Push</p>
                        <p className="text-sm text-muted">Recibe notificaciones en tu dispositivo</p>
                      </div>
                    </div>
                    <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Mail size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Notificaciones por Email</p>
                        <p className="text-sm text-muted">Recibe actualizaciones por correo electrónico</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Bell size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Recordatorios de Reservas</p>
                        <p className="text-sm text-muted">Recibe recordatorios antes de tus reservas</p>
                      </div>
                    </div>
                    <Switch checked={reservationReminders} onCheckedChange={setReservationReminders} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Privacidad</h3>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Globe size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Idioma</p>
                        <p className="text-sm text-muted">Español (Argentina)</p>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-transparent">Cambiar</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Peligro</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={handleLogout}>
                    <LogOut size={16} />
                    Cerrar Sesión
                  </Button>
                  <Button variant="destructive" className="flex-1 gap-2" onClick={() => setShowDeleteDialog(true)}>
                    <Trash2 size={16} />
                    Eliminar Cuenta
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar Cuenta</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible y se perderán todos tus datos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDeleteAccount}
              >
                Eliminar
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
