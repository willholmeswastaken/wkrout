"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for completed workouts
const COMPLETED_WORKOUTS = [
  { date: "2025-04-01", name: "Day 1: Biceps & Chest", rating: 4 },
  { date: "2025-04-03", name: "Day 2: Back & Triceps", rating: 5 },
  { date: "2025-04-05", name: "Day 3: Shoulders", rating: 3 },
  { date: "2025-04-08", name: "Day 4: Legs", rating: 4 },
  { date: "2025-04-10", name: "Day 5: Core & Cardio", rating: 5 },
  { date: "2025-04-12", name: "Day 1: Biceps & Chest", rating: 4 },
  { date: "2025-04-15", name: "Day 2: Back & Triceps", rating: 4 },
]

export function WorkoutCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Create calendar days array
  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: 0, isCurrentMonth: false })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const workout = COMPLETED_WORKOUTS.find((w) => w.date === dateStr)
    days.push({
      day,
      isCurrentMonth: true,
      workout,
    })
  }

  // Fill remaining cells
  const remainingCells = 42 - days.length
  for (let i = 0; i < remainingCells; i++) {
    days.push({ day: 0, isCurrentMonth: false })
  }

  // Format month name
  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-medium">
          {monthName} {year}
        </h2>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={i} className="text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <div key={i} className={`aspect-square p-1 ${!day.isCurrentMonth ? "opacity-30" : ""}`}>
            {day.day > 0 && (
              <div
                className={`h-full w-full rounded-md flex flex-col items-center justify-center text-xs ${
                  day.workout ? "bg-orange-500/20 text-orange-500" : "bg-secondary"
                }`}
              >
                <span>{day.day}</span>
                {day.workout && (
                  <div className="mt-1 flex">
                    {Array(day.workout.rating)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i} className="text-[8px]">
                          ★
                        </span>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium">Recent Workouts</h3>
        {COMPLETED_WORKOUTS.slice(0, 3).map((workout, i) => (
          <Card key={i} className="p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">{workout.name}</div>
                <div className="text-xs text-muted-foreground">{new Date(workout.date).toLocaleDateString()}</div>
              </div>
              <div className="flex text-orange-500">
                {Array(workout.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
