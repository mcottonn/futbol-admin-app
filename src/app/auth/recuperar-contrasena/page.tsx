"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"

export default function RecuperarContrasenaPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulación de envío de email
    setTimeout(() => {
      if (email) {
        setSuccess(true)
        // Redirigir a verificar código después de 2 segundos
        setTimeout(() => {
          router.push(`/auth/verificar-codigo?email=${encodeURIComponent(email)}`)
        }, 2000)
      } else {
        setError("Por favor ingresa tu correo electrónico")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md border-primary/20">
      <CardHeader className="space-y-1">
        <Link 
          href="/auth/login" 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2"
        >
          <ArrowLeft size={16} />
          Volver al inicio de sesión
        </Link>
        <CardTitle className="text-2xl font-bold text-primary">Recuperar Contraseña</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y te enviaremos un código de verificación
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ¡Código Enviado!
            </h3>
            <p className="text-sm text-muted-foreground">
              Hemos enviado un código de verificación a <strong>{email}</strong>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Redirigiendo...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Código"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
