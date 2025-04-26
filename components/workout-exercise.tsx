"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronRight, FileText, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { LiftHistoryDialog } from "@/components/lift-history-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type ExerciseProps = {
  exercise: {
    id: string
    name: string
    variant?: string
    sets: number
    originalId?: string
    lastPerformance?: {
      weight: number
      reps: number
      sets: number
    }
  }
  isCompleted: boolean
  onComplete: () => void
  alternativeExercises: Array<{ id: string; name: string }>
  onReplaceExercise: (exercise: { id: string; name: string }) => void
}

export function WorkoutExercise({
  exercise,
  isCompleted,
  onComplete,
  alternativeExercises,
  onReplaceExercise,
}: ExerciseProps) {
  const [sets, setSets] = useState<Array<{ weight: string; reps: string }>>(() =>
    Array(exercise.sets)
      .fill(0)
      .map(() => ({ weight: "", reps: "" })),
  )
  const [currentRestTime, setCurrentRestTime] = useState(0)
  const [restInterval, setRestInterval] = useState<NodeJS.Timeout | null>(null)
  const [isResting, setIsResting] = useState(false)
  const [showLiftHistory, setShowLiftHistory] = useState(false)
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [showSwipeActions, setShowSwipeActions] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const startX = useRef<number | null>(null)
  const currentX = useRef<number>(0)

  const updateSet = (index: number, field: "weight" | "reps", value: string) => {
    const newSets = [...sets]
    newSets[index] = { ...newSets[index], [field]: value }
    setSets(newSets)

    // Check if all sets have at least some data entered
    const hasAnyData = newSets.some((set) => set.weight || set.reps)
    if (hasAnyData) {
      onComplete()
    }
  }

  const startRest = (seconds: number) => {
    if (restInterval) {
      clearInterval(restInterval)
    }

    setIsResting(true)
    setCurrentRestTime(seconds)

    const interval = setInterval(() => {
      setCurrentRestTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsResting(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setRestInterval(interval)
  }

  // Touch handlers for swipe actions
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    currentX.current = 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return

    const diffX = e.touches[0].clientX - startX.current
    if (diffX < 0) {
      // Only allow left swipe
      currentX.current = diffX
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(${diffX}px)`
      }

      // Show swipe actions if swiped far enough
      if (diffX < -50) {
        setShowSwipeActions(true)
      } else {
        setShowSwipeActions(false)
      }
    }
  }

  const handleTouchEnd = () => {
    startX.current = null

    // If swiped far enough, show alternatives dialog
    if (showSwipeActions) {
      setShowAlternatives(true)
    }

    // Reset position with animation
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.3s ease"
      cardRef.current.style.transform = "translateX(0)"
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = ""
        }
      }, 300)
    }

    setShowSwipeActions(false)
  }

  return (
    <>
      <div className="relative overflow-hidden">
        <Card
          className={`overflow-hidden ${isCompleted ? "border-orange-500/50" : ""}`}
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent className="p-0">
            <div className="relative">
              <div className="absolute right-2 top-2 z-10">
                <div className={`h-4 w-4 rounded-full ${isCompleted ? "bg-orange-500" : "bg-gray-600"}`} />
              </div>
              <div className="p-4 flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-800">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt={exercise.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{exercise.name}</h3>
                  {exercise.variant && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{exercise.variant}</span>
                      <div className="ml-1 p-0.5 rounded-full bg-orange-500/20">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="#F97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 16V12"
                            stroke="#F97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 8H12.01"
                            stroke="#F97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  <Button variant="ghost" size="sm" className="mt-1 h-6 px-2 text-xs text-orange-500">
                    <FileText className="h-3 w-3 mr-1" />
                    Notes
                  </Button>
                </div>
              </div>

              <div className="px-4 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs flex items-center text-orange-500"
                    onClick={() => setShowLiftHistory(true)}
                  >
                    Lift History
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>

                  {/* Alternative Exercise Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs flex items-center text-orange-500"
                    onClick={() => setShowAlternatives(true)}
                  >
                    <ChevronLeft className="h-3 w-3 mr-1" />
                    Alternative
                  </Button>
                </div>

                {exercise.lastPerformance && (
                  <div className="flex items-center mb-2 text-xs">
                    <div className="flex items-center text-orange-500 bg-orange-500/10 rounded-full px-2 py-0.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="#F97316"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 6V12L16 14"
                          stroke="#F97316"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {exercise.lastPerformance.sets}x{exercise.lastPerformance.weight}kg
                    </div>
                  </div>
                )}

                <div className="mb-2">
                  <h4 className="text-xs font-medium mb-2">Sets Tracking</h4>
                  <div className={`grid grid-cols-${exercise.sets} gap-2`}>
                    {/* Set headers */}
                    {Array(exercise.sets)
                      .fill(0)
                      .map((_, index) => (
                        <div key={`header-${index}`} className="text-center text-xs text-muted-foreground">
                          Set {index + 1}
                        </div>
                      ))}

                    {/* Interleaved inputs for proper tab order */}
                    {sets.map((set, index) => (
                      <div key={`set-${index}`} className="flex flex-col gap-2">
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder={`${exercise.lastPerformance?.reps || 0} reps`}
                          value={set.reps}
                          onChange={(e) => updateSet(index, "reps", e.target.value)}
                          className="h-8 text-center bg-orange-500/10 border-orange-500/20 focus:border-orange-500 text-orange-500"
                        />
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder={`${exercise.lastPerformance?.weight || 0}kg`}
                          value={set.weight}
                          onChange={(e) => updateSet(index, "weight", e.target.value)}
                          className="h-8 text-center bg-secondary border-orange-500/20 focus:border-orange-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  {/* Show PB badge when a personal best is achieved */}
                  <div className="flex items-center justify-center bg-orange-500/10 rounded-lg p-2 border border-orange-500/20">
                    <div className="mr-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          fill="#F97316"
                        />
                        <path d="M12 4V2" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 22V20" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                        <path d="M4 12H2" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                        <path d="M22 12H20" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                        <path
                          d="M19.7782 4.22266L17.5562 6.44466"
                          stroke="#F97316"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6.44365 17.5557L4.22165 19.7777"
                          stroke="#F97316"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M19.7782 19.7777L17.5562 17.5557"
                          stroke="#F97316"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6.44365 6.44466L4.22165 4.22266"
                          stroke="#F97316"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-orange-500">New Personal Best!</div>
                      <div className="text-xs text-muted-foreground">You've improved since your last workout</div>
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <h4 className="text-xs font-medium mb-2">Rest</h4>
                  <div className="flex gap-2">
                    <Button
                      variant={isResting && currentRestTime === 60 ? "default" : "outline"}
                      size="sm"
                      onClick={() => startRest(60)}
                      className={
                        isResting && currentRestTime === 60 ? "bg-orange-500" : "border-orange-500/20 text-orange-500"
                      }
                    >
                      {isResting && currentRestTime > 0 && currentRestTime <= 60 ? `${currentRestTime}s` : "60 secs"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => startRest(90)} className="border-gray-700">
                      90 secs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Swipe action indicator */}
        {showSwipeActions && (
          <div className="absolute top-0 right-0 bottom-0 flex items-center justify-center bg-orange-500 px-4">
            <span className="text-white font-medium">Alternatives</span>
          </div>
        )}
      </div>

      {/* Lift History Dialog */}
      <LiftHistoryDialog open={showLiftHistory} onOpenChange={setShowLiftHistory} exercise={exercise} />

      {/* Alternative Exercises Dialog */}
      <Dialog open={showAlternatives} onOpenChange={setShowAlternatives}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alternative Exercises</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            {alternativeExercises.map((alt) => (
              <Button
                key={alt.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => {
                  onReplaceExercise(alt)
                  setShowAlternatives(false)
                }}
              >
                {alt.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
