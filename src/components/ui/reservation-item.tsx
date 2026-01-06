import { Calendar, Clock } from "lucide-react"

interface ReservationItemProps {
  id: string
  courtName: string
  date: string
  time: string
  playerCount: number
  status: "confirmed" | "pending" | "completed"
}

export function ReservationItem({ id, courtName, date, time, playerCount, status }: ReservationItemProps) {
  const statusColors = {
    confirmed: "text-success",
    pending: "text-warning",
    completed: "text-muted",
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-border flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <div className="bg-primary/10 p-3 rounded-lg">
          <Calendar className="text-primary" size={20} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{courtName}</p>
          <p className="text-sm text-muted">{playerCount} jugadores</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 justify-end text-sm text-muted mb-1">
          <Clock size={16} />
          <span>{time}</span>
        </div>
        <p className={`text-xs font-medium ${statusColors[status]}`}>
          {status === "confirmed" && "Confirmada"}
          {status === "pending" && "Pendiente"}
          {status === "completed" && "Completada"}
        </p>
      </div>
    </div>
  )
}
