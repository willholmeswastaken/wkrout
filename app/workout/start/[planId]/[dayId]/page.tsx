"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Play } from "lucide-react"
import { useRouter } from "next/navigation"
import { ExerciseSelector } from "@/components/exercise-selector"

// Mock data for exercises
const MOCK_EXERCISES = [
  { id: "1", name: "Bench Press", category: "Chest" },
  { id: "2", name: "Incline Dumbbell Press", category: "Chest" },
  { id: "3", name: "Seated DB Shoulder Press", category: "Shoulders" },
  { id: "4", name: "Barbell Curl", category: "Biceps" },
  { id: "5", name: "Dumbbell Curl", category: "Biceps" },
  { id: "6", name: "Leg Seated Curl", category: "Legs" },
  { id: "7", name: "Squat", category: "Legs" },
  { id: "8", name: "Deadlift", category: "Back" },
]

export default function StartWorkoutPage({ params }: { params: { planId: string; dayId: string } }) {
  const router = useRouter()
  const [selectedExercises, setSelectedExercises] = useState<string[]>([])
  const [dayName, setDayName] = useState("")

  useEffect(() => {
    // In a real app, you would fetch this data from your API or state management
    if (params.planId === "1" && params.dayId === "1") {
      setDayName("Day 1: Biceps & Chest")
      setSelectedExercises(["3", "4"]) // Pre-select some exercises
    } else {
      setDayName(`Day ${params.dayId}`)
    }
  }, [params.planId, params.dayId])

  const addExercise = (exerciseId: string) => {
    if (!selectedExercises.includes(exerciseId)) {
      setSelectedExercises([...selectedExercises, exerciseId])
    }
  }

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter((id) => id !== exerciseId))
  }

  const startWorkout = () => {
    if (selectedExercises.length > 0) {
      router.push(`/workout/active?plan=${params.planId}&day=${params.dayId}`)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/plans">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">{dayName}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-base">Selected Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedExercises.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">No exercises selected yet</div>
              ) : (
                <div className="space-y-2">
                  {selectedExercises.map((id) => {
                    const exercise = MOCK_EXERCISES.find((e) => e.id === id)
                    return exercise ? (
                      <div key={id} className="flex justify-between items-center p-3 bg-secondary rounded-md">
                        <div>
                          <div>{exercise.name}</div>
                          <div className="text-xs text-muted-foreground">{exercise.category}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExercise(id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : null
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <div>
            <ExerciseSelector
              exercises={MOCK_EXERCISES}
              selectedExercises={selectedExercises}
              onSelectExercise={addExercise}
            />

            <div className="mt-6">
              <Button
                onClick={startWorkout}
                disabled={selectedExercises.length === 0}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                <Play className="mr-2 h-4 w-4" />
                Start Workout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
