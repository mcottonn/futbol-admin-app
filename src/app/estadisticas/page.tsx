"use client"

import { useState } from "react"
import { Header } from "../../components/layout/header"
import { BottomNav } from "../../components/layout/bottom-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components//ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Calendar, TrendingUp, Users, DollarSign } from "lucide-react"

export default function EstadisticasPage() {
  const [timePeriod, setTimePeriod] = useState<"week" | "month" | "year">("month")

  // Data que cambia según el período seleccionado
  const getStatsData = () => {
    if (timePeriod === "week") {
      return {
        ingresos: "$2,850",
        reservas: 32,
        jugadores: 87,
        nuevos: 3,
        ocupacion: "78%",
        trendText: "vs semana anterior",
      }
    } else if (timePeriod === "month") {
      return {
        ingresos: "$12,450",
        reservas: 145,
        jugadores: 87,
        nuevos: 15,
        ocupacion: "82%",
        trendText: "vs mes anterior",
      }
    } else {
      return {
        ingresos: "$156,300",
        reservas: 1842,
        jugadores: 324,
        nuevos: 89,
        ocupacion: "85%",
        trendText: "vs año anterior",
      }
    }
  }

  const statsData = getStatsData()

  const stats = [
    {
      label: "Ingresos Totales",
      value: statsData.ingresos,
      icon: <DollarSign size={24} />,
      trend: "up",
      trendValue: `+8% ${statsData.trendText}`,
    },
    {
      label: "Reservas Completadas",
      value: statsData.reservas,
      icon: <Calendar size={24} />,
      trend: "up",
      trendValue: `+12 ${statsData.trendText}`,
    },
    {
      label: "Jugadores Totales",
      value: statsData.jugadores,
      icon: <Users size={24} />,
      trend: "up",
      trendValue: `+${statsData.nuevos} nuevos`,
    },
    {
      label: "Jugadores Nuevos",
      value: statsData.nuevos,
      icon: <Users size={24} />,
      trend: "up",
      trendValue: timePeriod === "week" ? "Esta semana" : timePeriod === "month" ? "Este mes" : "Este año",
    },
    {
      label: "Tasa de Ocupación",
      value: statsData.ocupacion,
      icon: <TrendingUp size={24} />,
      trend: "up",
      trendValue: "+5%",
    },
  ]

  // Data de gráficos que cambia según el período
  const getRevenueData = () => {
    if (timePeriod === "week") {
      return [
        { period: "Lun", revenue: 350, reservas: 4 },
        { period: "Mar", revenue: 420, reservas: 5 },
        { period: "Mié", revenue: 380, reservas: 4 },
        { period: "Jue", revenue: 450, reservas: 6 },
        { period: "Vie", revenue: 520, reservas: 7 },
        { period: "Sáb", revenue: 580, reservas: 8 },
        { period: "Dom", revenue: 450, reservas: 6 },
      ]
    } else if (timePeriod === "month") {
      return [
        { period: "Sem 1", revenue: 2400, reservas: 24 },
        { period: "Sem 2", revenue: 2210, reservas: 22 },
        { period: "Sem 3", revenue: 2290, reservas: 25 },
        { period: "Sem 4", revenue: 2000, reservas: 20 },
      ]
    } else {
      return [
        { period: "2022", revenue: 142000, reservas: 1654 },
        { period: "2023", revenue: 148500, reservas: 1723 },
        { period: "2024", revenue: 152200, reservas: 1789 },
        { period: "2025", revenue: 156300, reservas: 1842 },
      ]
    }
  }

  const revenueData = getRevenueData()

  const courtPerformanceData = [
    { cancha: "Cancha 1", reservas: 45, ingresos: 2250 },
    { cancha: "Cancha 2", reservas: 38, ingresos: 2280 },
    { cancha: "Cancha 3", reservas: 52, ingresos: 2600 },
    { cancha: "Cancha 4", reservas: 35, ingresos: 1750 },
  ]

  const reservationStatusData = [
    { name: "Confirmadas", value: 145, color: "#10b981" },
    { name: "Pendientes", value: 23, color: "#f59e0b" },
    { name: "Canceladas", value: 12, color: "#ef4444" },
  ]

  const peakHoursData = [
    { hora: "08:00", reservas: 2 },
    { hora: "10:00", reservas: 5 },
    { hora: "12:00", reservas: 8 },
    { hora: "14:00", reservas: 12 },
    { hora: "16:00", reservas: 15 },
    { hora: "18:00", reservas: 18 },
    { hora: "20:00", reservas: 14 },
    { hora: "22:00", reservas: 6 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Estadísticas" />

      <main className="px-4 py-6 max-w-6xl mx-auto">
        {/* Time Period Filter */}
        <section className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Período de Tiempo</h2>
            <Select value={timePeriod} onValueChange={(value: "week" | "month" | "year") => setTimePeriod(value)}>
              <SelectTrigger className="w-[180px] bg-white border-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mes</SelectItem>
                <SelectItem value="year">Este Año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <Card key={idx} className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                      <p
                        className={`text-xs mt-2 font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.trend === "up" ? "↑" : "↓"} {stat.trendValue}
                      </p>
                    </div>
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-primary/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Resumen
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Desempeño
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Revenue Chart */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>
                  {timePeriod === "week"
                    ? "Ingresos Semanales"
                    : timePeriod === "month"
                      ? "Ingresos Mensuales"
                      : "Ingresos Anuales"}
                </CardTitle>
                <CardDescription>
                  {timePeriod === "week"
                    ? "Ingresos y reservas por día"
                    : timePeriod === "month"
                      ? "Ingresos y reservas por semana"
                      : "Ingresos y reservas por año"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Ingresos ($)",
                      color: "hsl(var(--chart-1))",
                    },
                    reservas: {
                      label: "Reservas",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#0891b2" name="Ingresos ($)" strokeWidth={2} />
                      <Line type="monotone" dataKey="reservas" stroke="#1e40af" name="Reservas" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Reservation Status */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Estado de Reservas</CardTitle>
                <CardDescription>Distribución de reservas por estado</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    confirmadas: { label: "Confirmadas", color: "hsl(var(--chart-1))" },
                    pendientes: { label: "Pendientes", color: "hsl(var(--chart-2))" },
                    canceladas: { label: "Canceladas", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reservationStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reservationStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Peak Hours */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Horas Pico</CardTitle>
                <CardDescription>Reservas por hora del día</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    reservas: {
                      label: "Reservas",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={peakHoursData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hora" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="reservas" fill="#0891b2" name="Reservas" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            {/* Court Performance */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Desempeño por Cancha</CardTitle>
                <CardDescription>Reservas e ingresos por cancha</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    reservas: {
                      label: "Reservas",
                      color: "hsl(var(--chart-1))",
                    },
                    ingresos: {
                      label: "Ingresos ($)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={courtPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="cancha" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="reservas" fill="#0891b2" name="Reservas" />
                      <Bar dataKey="ingresos" fill="#1e40af" name="Ingresos ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Court Details Table */}
            <Card className="mt-6 border-primary/20">
              <CardHeader>
                <CardTitle>Detalles por Cancha</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courtPerformanceData.map((court) => (
                    <div
                      key={court.cancha}
                      className="flex items-center justify-between p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">{court.cancha}</p>
                        <p className="text-sm text-muted">{court.reservas} reservas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${court.ingresos}</p>
                        <p className="text-sm text-muted">Ingresos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  )
}
