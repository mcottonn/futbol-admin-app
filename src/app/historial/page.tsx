"use client"

import { Header } from "../../components/layout/header"
import { BottomNav } from "../../components/layout/bottom-nav"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const dailyData = [
  { day: "Lun", reservas: 8, ingresos: 1200 },
  { day: "Mar", reservas: 12, ingresos: 1800 },
  { day: "Mié", reservas: 10, ingresos: 1500 },
  { day: "Jue", reservas: 15, ingresos: 2250 },
  { day: "Vie", reservas: 18, ingresos: 2700 },
  { day: "Sab", reservas: 22, ingresos: 3300 },
  { day: "Dom", reservas: 16, ingresos: 2400 },
]

const monthlyData = [
  { month: "Enero", reservas: 240, ingresos: 36000 },
  { month: "Febrero", reservas: 280, ingresos: 42000 },
  { month: "Marzo", reservas: 320, ingresos: 48000 },
  { month: "Abril", reservas: 290, ingresos: 43500 },
  { month: "Mayo", reservas: 350, ingresos: 52500 },
  { month: "Junio", reservas: 380, ingresos: 57000 },
]

export default function HistorialPage() {
  return (
    <div className="min-h-screen bg-muted-light pb-24">
      <Header title="Historial" />

      <main className="px-4 py-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Estadísticas y Historial</h1>

        {/* Weekly Stats */}
        <section className="bg-white rounded-lg p-6 border border-border shadow-sm mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Reservas por Día (Esta Semana)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="reservas" fill="#0891b2" name="Reservas" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Monthly Revenue */}
        <section className="bg-white rounded-lg p-6 border border-border shadow-sm mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Ingresos Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ingresos" stroke="#1e40af" name="Ingresos ($)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* Summary Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-sm text-muted font-medium">Total Reservas (Mes)</p>
            <p className="text-3xl font-bold text-primary mt-2">1,860</p>
            <p className="text-xs text-success mt-2">↑ 12% vs mes anterior</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-sm text-muted font-medium">Ingresos Totales (Mes)</p>
            <p className="text-3xl font-bold text-secondary mt-2">$279,000</p>
            <p className="text-xs text-success mt-2">↑ 18% vs mes anterior</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
            <p className="text-sm text-muted font-medium">Jugadores Nuevos (Mes)</p>
            <p className="text-3xl font-bold text-primary mt-2">156</p>
            <p className="text-xs text-success mt-2">↑ 25% vs mes anterior</p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
