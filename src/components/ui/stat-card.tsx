import type React from "react"
interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: "up" | "down"
  trendValue?: string
}

export function StatCard({ label, value, icon, trend, trendValue }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 border border-border shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted font-medium">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          {trendValue && (
            <p className={`text-xs mt-2 font-medium ${trend === "up" ? "text-success" : "text-error"}`}>
              {trend === "up" ? "↑" : "↓"} {trendValue}
            </p>
          )}
        </div>
        {icon && <div className="text-primary text-2xl">{icon}</div>}
      </div>
    </div>
  )
}
