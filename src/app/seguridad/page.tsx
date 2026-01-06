"use client"

import React, { useState } from 'react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog';
import { Lock, LogOut, Trash2 } from 'lucide-react';

export default function SeguridadPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <main className="p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Seguridad</h1>

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
                <h3 className="font-medium text-foreground">Sesiones Activas</h3>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Navegador Actual</p>
                      <p className="text-sm text-muted">Chrome en Windows</p>
                    </div>
                    <Badge variant="default">Activa</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Peligro</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent">
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
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Eliminar
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
