"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type LiftHistoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  exercise: {
    id: string
    name: string
    variant?: string
  }
}

// Mock data for lift history
const MOCK_HISTORY = [
  { date: "2025-04-01", weight: 12, reps: 12, sets: 4 },
  { date: "2025-03-25", weight: 10, reps: 12, sets: 4 },
  { date: "2025-03-18", weight: 10, reps: 10, sets: 4 },
  { date: "2025-03-11", weight: 8, reps: 12, sets: 4 },
  { date: "2025-03-04", weight: 8, reps: 10, sets: 3 },
  { date: "2025-02-25", weight: 6, reps: 12, sets: 3 },
]

export function LiftHistoryDialog({ open, onOpenChange, exercise }: LiftHistoryDialogProps) {
  // Format dates for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Calculate max weight and volume
  const maxWeight = Math.max(...MOCK_HISTORY.map((entry) => entry.weight))
  const maxVolume = Math.max(...MOCK_HISTORY.map((entry) => entry.weight * entry.reps * entry.sets))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{exercise.name} History</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chart">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Charts</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4 pt-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Weight Progress (kg)</h3>
              <div className="h-48 w-full bg-secondary/50 rounded-lg p-4">
                {/* Custom chart implementation since the chart components weren't rendering properly */}
                <div className="h-full flex items-end space-x-1">
                  {MOCK_HISTORY.slice()
                    .reverse()
                    .map((entry, index) => {
                      const heightPercentage = (entry.weight / maxWeight) * 100
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                          <div
                            className="w-full bg-orange-500 rounded-t-sm"
                            style={{ height: `${heightPercentage}%` }}
                          ></div>
                          <div className="text-xs mt-1 text-muted-foreground">{formatDate(entry.date)}</div>
                          <div className="text-xs font-medium">{entry.weight}kg</div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Volume Progress (kg × reps × sets)</h3>
              <div className="h-48 w-full bg-secondary/50 rounded-lg p-4">
                <div className="h-full flex items-end space-x-1">
                  {MOCK_HISTORY.slice()
                    .reverse()
                    .map((entry, index) => {
                      const volume = entry.weight * entry.reps * entry.sets
                      const heightPercentage = (volume / maxVolume) * 100
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                          <div
                            className="w-full bg-orange-500 rounded-t-sm"
                            style={{ height: `${heightPercentage}%` }}
                          ></div>
                          <div className="text-xs mt-1 text-muted-foreground">{formatDate(entry.date)}</div>
                          <div className="text-xs font-medium">{volume}</div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 pt-4">
              {MOCK_HISTORY.map((entry, index) => (
                <Card key={index} className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">{new Date(entry.date).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.sets} sets × {entry.reps} reps
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-orange-500">{entry.weight}kg</div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
