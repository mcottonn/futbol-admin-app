"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

export default function VerificarCodigoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus en el primer input al montar
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    // Solo permitir números
    if (value && !/^\d$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus al siguiente input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Retroceder con Backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newCode = [...code]
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i]
      }
    }
    
    setCode(newCode)
    const lastFilledIndex = Math.min(pastedData.length, 5)
    inputRefs.current[lastFilledIndex]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const fullCode = code.join("")
    if (fullCode.length !== 6) {
      setError("Por favor ingresa el código completo")
      return
    }

    setIsLoading(true)

    // Simulación de verificación
    setTimeout(() => {
      // En producción, aquí verificarías el código con el backend
      if (fullCode === "123456") {
        router.push(`/auth/nueva-contrasena?email=${encodeURIComponent(email)}&code=${fullCode}`)
      } else {
        setError("Código incorrecto. Inténtalo de nuevo")
        setCode(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleResendCode = () => {
    setError("")
    setCode(["", "", "", "", "", ""])
    // Aquí iría la lógica para reenviar el código
    alert("Código reenviado a " + email)
  }

  return (
    <Card className="w-full max-w-md border-primary/20">
      <CardHeader className="space-y-1">
        <Link 
          href="/auth/recuperar-contrasena" 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2"
        >
          <ArrowLeft size={16} />
          Volver
        </Link>
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-primary text-center">
          Verificar Código
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa el código de 6 dígitos que enviamos a<br />
          <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-xl font-semibold"
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || code.some(d => !d)}
          >
            {isLoading ? "Verificando..." : "Verificar Código"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              className="text-sm text-primary hover:underline"
            >
              ¿No recibiste el código? Reenviar
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
