"use client"

import { Header } from "../../components/layout/header"
import { BottomNav } from "../../components/layout/bottom-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components//ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
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
  const stats = [
    {
      label: "Ingresos Totales",
      value: "$12,450",
      icon: <DollarSign size={24} />,
      trend: "up",
      trendValue: "+8% vs mes anterior",
    },
    {
      label: "Reservas Completadas",
      value: 145,
      icon: <Calendar size={24} />,
      trend: "up",
      trendValue: "+12 vs mes anterior",
    },
    {
      label: "Jugadores Totales",
      value: 87,
      icon: <Users size={24} />,
      trend: "up",
      trendValue: "+15 nuevos",
    },
    {
      label: "Jugadores Nuevos",
      value: 15,
      icon: <Users size={24} />,
      trend: "up",
      trendValue: "Este mes",
    },
    {
      label: "Tasa de Ocupación",
      value: "82%",
      icon: <TrendingUp size={24} />,
      trend: "up",
      trendValue: "+5%",
    },
  ]

  const monthlyRevenueData = [
    { month: "Ene", revenue: 2400, reservas: 24 },
    { month: "Feb", revenue: 2210, reservas: 22 },
    { month: "Mar", revenue: 2290, reservas: 25 },
    { month: "Abr", revenue: 2000, reservas: 20 },
    { month: "May", revenue: 2181, reservas: 23 },
    { month: "Jun", revenue: 2500, reservas: 28 },
    { month: "Jul", revenue: 2100, reservas: 21 },
  ]

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

  const historyData = [
    {
      id: "1",
      date: "2024-11-14",
      court: "Cancha 1",
      player: "Juan García",
      time: "14:00 - 15:00",
      players: 10,
      revenue: 50,
      status: "completed",
    },
    {
      id: "2",
      date: "2024-11-14",
      court: "Cancha 2",
      player: "María López",
      time: "16:30 - 17:30",
      players: 8,
      revenue: 60,
      status: "completed",
    },
    {
      id: "3",
      date: "2024-11-13",
      court: "Cancha 3",
      player: "Carlos Rodríguez",
      time: "18:00 - 19:00",
      players: 12,
      revenue: 50,
      status: "completed",
    },
    {
      id: "4",
      date: "2024-11-13",
      court: "Cancha 1",
      player: "Ana Martínez",
      time: "20:00 - 21:00",
      players: 10,
      revenue: 50,
      status: "completed",
    },
    {
      id: "5",
      date: "2024-11-12",
      court: "Cancha 2",
      player: "Pedro Sánchez",
      time: "14:00 - 15:00",
      players: 9,
      revenue: 60,
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Estadísticas" />

      <main className="px-4 py-6 max-w-6xl mx-auto">
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
          <TabsList className="grid w-full grid-cols-3 bg-primary/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Resumen
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Desempeño
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Historial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Monthly Revenue */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Ingresos Mensuales</CardTitle>
                <CardDescription>Ingresos y reservas por mes</CardDescription>
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
                    <LineChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
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

          <TabsContent value="history" className="mt-6">
            {/* Reservation History */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Historial de Reservas</CardTitle>
                <CardDescription>Últimas reservas completadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historyData.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex items-center justify-between p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium text-foreground">{reservation.court}</p>
                          <Badge className="bg-green-100 text-green-800">Completada</Badge>
                        </div>
                        <p className="text-sm text-muted">{reservation.player}</p>
                        <p className="text-xs text-muted mt-1">
                          {new Date(reservation.date).toLocaleDateString("es-ES")} • {reservation.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${reservation.revenue}</p>
                        <p className="text-sm text-muted">{reservation.players} jugadores</p>
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
