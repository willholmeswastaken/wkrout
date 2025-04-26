"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Play } from "lucide-react"
import Image from "next/image"

type Exercise = {
  id: string
  name: string
  category: string
}

type ExerciseSelectorProps = {
  exercises: Exercise[]
  selectedExercises: string[]
  onSelectExercise: (id: string) => void
}

export function ExerciseSelector({ exercises, selectedExercises, onSelectExercise }: ExerciseSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(exercises.map((e) => e.category)))

  // Filter exercises based on search term
  const filteredExercises = searchTerm
    ? exercises.filter(
        (e) =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : exercises

  const handleExerciseClick = (exerciseId: string) => {
    if (!selectedExercises.includes(exerciseId)) {
      onSelectExercise(exerciseId)
    }
  }

  const handleVideoClick = (e: React.MouseEvent, exerciseId: string) => {
    e.stopPropagation() // Prevent triggering the parent click handler
    setActiveVideoId(exerciseId === activeVideoId ? null : exerciseId)
    // In a real app, this would open a video player or modal with the exercise video
  }

  const renderExerciseItem = (exercise: Exercise) => {
    const isSelected = selectedExercises.includes(exercise.id)

    return (
      <div
        key={exercise.id}
        className={`flex justify-between items-center p-3 bg-secondary rounded-md cursor-pointer transition-colors hover:bg-secondary/80 ${isSelected ? "border border-orange-500/50" : ""}`}
        onClick={() => handleExerciseClick(exercise.id)}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-16 rounded overflow-hidden bg-gray-800 flex-shrink-0">
            <Image
              src="/placeholder.svg?height=48&width=64"
              alt={exercise.name}
              width={64}
              height={48}
              className="object-cover"
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
              onClick={(e) => handleVideoClick(e, exercise.id)}
            >
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <div>{exercise.name}</div>
            <div className="text-xs text-muted-foreground">{exercise.category}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            handleExerciseClick(exercise.id)
          }}
          disabled={isSelected}
          className="text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Add Exercises</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            {categories.slice(0, 3).map((category) => (
              <TabsTrigger key={category} value={category} className="flex-1">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-2">
            {filteredExercises.map(renderExerciseItem)}
          </TabsContent>

          {categories.slice(0, 3).map((category) => (
            <TabsContent key={category} value={category} className="mt-4 space-y-2">
              {filteredExercises.filter((e) => e.category === category).map(renderExerciseItem)}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
