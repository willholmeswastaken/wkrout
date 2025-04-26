"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for workout history
// In a real app, this would come from your database
const MOCK_WORKOUT_DATA = [
  // Generate some random workout data for the past year
  ...Array.from({ length: 365 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (365 - i))

    // Random intensity (0 = no workout, 1-4 = workout with different intensities)
    // Make more recent workouts more likely
    const recencyBoost = Math.min(1, i / 300) * 0.3
    const randomFactor = Math.random()

    let intensity = 0
    if (randomFactor < 0.2 + recencyBoost) {
      intensity = Math.floor(Math.random() * 4) + 1
    }

    return {
      date: date.toISOString().split("T")[0],
      intensity: intensity,
    }
  }),
]

export function WorkoutConsistencyGraph() {
  const [viewMode, setViewMode] = useState<"year" | "month">("year")
  const [currentDate, setCurrentDate] = useState(new Date())

  // Calculate the start date based on view mode
  const getStartDate = () => {
    const date = new Date(currentDate)
    if (viewMode === "year") {
      date.setDate(1)
      date.setMonth(date.getMonth() - 11)
    } else {
      date.setDate(1)
    }
    return date
  }

  // Calculate the end date based on view mode
  const getEndDate = () => {
    const date = new Date(currentDate)
    if (viewMode === "month") {
      date.setMonth(date.getMonth() + 1)
      date.setDate(0) // Last day of current month
    } else {
      date.setDate(31)
    }
    return date
  }

  const startDate = getStartDate()
  const endDate = getEndDate()

  // Filter data for the current view
  const filteredData = MOCK_WORKOUT_DATA.filter((item) => {
    const itemDate = new Date(item.date)
    return itemDate >= startDate && itemDate <= endDate
  })

  // Navigate to previous/next period
  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "year") {
      newDate.setFullYear(newDate.getFullYear() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "year") {
      newDate.setFullYear(newDate.getFullYear() + 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  // Format date for display
  const formatPeriod = () => {
    if (viewMode === "year") {
      return `${startDate.toLocaleString("default", { month: "short" })} ${startDate.getFullYear()} - ${endDate.toLocaleString("default", { month: "short" })} ${endDate.getFullYear()}`
    } else {
      return currentDate.toLocaleString("default", { month: "long", year: "numeric" })
    }
  }

  // Generate cells for the heatmap
  const generateCells = () => {
    if (viewMode === "year") {
      return generateYearView()
    } else {
      return generateMonthView()
    }
  }

  // Generate year view (similar to GitHub contribution graph)
  const generateYearView = () => {
    const weeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
    const days = ["Mon", "Wed", "Fri", "Sun"]

    // Create a map of date strings to intensity
    const dateMap = new Map()
    filteredData.forEach((item) => {
      dateMap.set(item.date, item.intensity)
    })

    return (
      <div className="flex flex-col">
        <div className="flex mb-1 text-xs text-muted-foreground justify-between px-1">
          {Array.from({ length: 12 }, (_, i) => {
            const date = new Date(startDate)
            date.setMonth(startDate.getMonth() + i)
            return <div key={i}>{date.toLocaleString("default", { month: "short" })}</div>
          })}
        </div>
        <div className="flex">
          <div className="flex flex-col mr-2 text-xs text-muted-foreground justify-between">
            {days.map((day) => (
              <div key={day} className="h-3">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-rows-7 grid-flow-col gap-1 overflow-x-auto max-h-[140px] w-full">
            {Array.from({ length: weeks * 7 }, (_, i) => {
              const date = new Date(startDate)
              date.setDate(date.getDate() + i)

              // Skip dates outside our range
              if (date > endDate || date < startDate) {
                return null
              }

              const dateStr = date.toISOString().split("T")[0]
              const intensity = dateMap.get(dateStr) || 0
              const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.

              // Get color based on intensity - using orange colors
              let bgColor = "bg-gray-800"
              if (intensity === 1) bgColor = "bg-orange-900/40"
              if (intensity === 2) bgColor = "bg-orange-700/60"
              if (intensity === 3) bgColor = "bg-orange-600/80"
              if (intensity === 4) bgColor = "bg-orange-500"

              return (
                <TooltipProvider key={dateStr}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-3 h-3 rounded-sm ${bgColor} cursor-pointer`}
                        style={{ gridRow: ((dayOfWeek + 6) % 7) + 1 }} // Adjust to start with Monday
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        <div>{new Date(dateStr).toLocaleDateString()}</div>
                        <div>{intensity === 0 ? "No workout" : `${intensity} workout${intensity > 1 ? "s" : ""}`}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Generate month view (calendar style)
  const generateMonthView = () => {
    const firstDay = new Date(startDate)
    const daysInMonth = endDate.getDate()
    const startDayOfWeek = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.

    // Create a map of date strings to intensity
    const dateMap = new Map()
    filteredData.forEach((item) => {
      dateMap.set(item.date, item.intensity)
    })

    // Create array for days of week
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    // Calculate total weeks needed
    const totalDays = startDayOfWeek + daysInMonth
    const totalWeeks = Math.ceil(totalDays / 7)

    return (
      <div className="w-full">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-xs text-center text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: totalWeeks * 7 }, (_, i) => {
            const dayIndex = i - startDayOfWeek + 1

            if (dayIndex < 1 || dayIndex > daysInMonth) {
              return <div key={`empty-${i}`} className="w-full aspect-square" />
            }

            const date = new Date(startDate)
            date.setDate(dayIndex)
            const dateStr = date.toISOString().split("T")[0]
            const intensity = dateMap.get(dateStr) || 0

            // Get color based on intensity - using orange colors
            let bgColor = "bg-gray-800"
            if (intensity === 1) bgColor = "bg-orange-900/40"
            if (intensity === 2) bgColor = "bg-orange-700/60"
            if (intensity === 3) bgColor = "bg-orange-600/80"
            if (intensity === 4) bgColor = "bg-orange-500"

            return (
              <TooltipProvider key={dateStr}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-full aspect-square rounded-sm flex items-center justify-center ${bgColor} cursor-pointer`}
                    >
                      <span className="text-xs">{dayIndex}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs">
                      <div>{new Date(dateStr).toLocaleDateString()}</div>
                      <div>{intensity === 0 ? "No workout" : `${intensity} workout${intensity > 1 ? "s" : ""}`}</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
      </div>
    )
  }

  // Calculate stats
  const calculateStats = () => {
    const totalWorkouts = filteredData.filter((item) => item.intensity > 0).length
    const totalDays = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000) + 1
    const consistencyRate = Math.round((totalWorkouts / totalDays) * 100)

    // Find the longest streak
    let currentStreak = 0
    let longestStreak = 0
    let lastWorkoutDate = null

    // Sort data by date
    const sortedData = [...filteredData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    sortedData.forEach((item) => {
      if (item.intensity > 0) {
        if (!lastWorkoutDate) {
          currentStreak = 1
        } else {
          const currentDate = new Date(item.date)
          const prevDate = new Date(lastWorkoutDate)
          prevDate.setDate(prevDate.getDate() + 1)

          if (currentDate.toISOString().split("T")[0] === prevDate.toISOString().split("T")[0]) {
            currentStreak++
          } else {
            currentStreak = 1
          }
        }

        lastWorkoutDate = item.date
        longestStreak = Math.max(longestStreak, currentStreak)
      }
    })

    return {
      totalWorkouts,
      consistencyRate,
      longestStreak,
    }
  }

  const stats = calculateStats()

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Workout Consistency</CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={viewMode === "year" ? "bg-secondary" : ""}
              onClick={() => setViewMode("year")}
            >
              Year
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={viewMode === "month" ? "bg-secondary" : ""}
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="icon" onClick={navigatePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">{formatPeriod()}</div>
          <Button variant="ghost" size="icon" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4">{generateCells()}</div>

        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <div>Less</div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
            <div className="w-3 h-3 bg-orange-900/40 rounded-sm"></div>
            <div className="w-3 h-3 bg-orange-700/60 rounded-sm"></div>
            <div className="w-3 h-3 bg-orange-600/80 rounded-sm"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
          </div>
          <div>More</div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="bg-secondary rounded-md p-2">
            <div className="text-xs text-muted-foreground">Workouts</div>
            <div className="text-lg font-bold">{stats.totalWorkouts}</div>
          </div>
          <div className="bg-secondary rounded-md p-2">
            <div className="text-xs text-muted-foreground">Consistency</div>
            <div className="text-lg font-bold">{stats.consistencyRate}%</div>
          </div>
          <div className="bg-secondary rounded-md p-2">
            <div className="text-xs text-muted-foreground">Best Streak</div>
            <div className="text-lg font-bold">{stats.longestStreak} days</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
