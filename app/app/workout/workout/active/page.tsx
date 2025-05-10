"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { WorkoutTimer } from "@/components/workout-timer";
import { WorkoutExercise } from "@/components/workout-exercise";
import { WorkoutRating } from "@/components/workout-rating";

interface Exercise {
  id: string;
  name: string;
  variant?: string;
  sets: number;
  originalId?: string;
  lastPerformance: {
    weight: number;
    reps: number;
    sets: number;
  };
}

// Mock data for the active workout
const MOCK_WORKOUT = {
  planId: "1",
  dayId: "1",
  name: "Day 1: Biceps & Chest",
  exercises: [
    {
      id: "3",
      name: "Seated DB Shoulder Press",
      variant: "Leg Seated Curl",
      sets: 4,
      lastPerformance: {
        weight: 14,
        reps: 12,
        sets: 4,
      },
    },
    {
      id: "4",
      name: "Barbell Curl",
      sets: 3,
      lastPerformance: {
        weight: 20,
        reps: 10,
        sets: 3,
      },
    },
  ] as Exercise[],
};

type AlternativeExercises = {
  [key: string]: Array<{ id: string; name: string }>;
};

// Mock data for alternative exercises
const ALTERNATIVE_EXERCISES: AlternativeExercises = {
  "3": [
    { id: "3a", name: "Standing DB Shoulder Press" },
    { id: "3b", name: "Machine Shoulder Press" },
    { id: "3c", name: "Arnold Press" },
  ],
  "4": [
    { id: "4a", name: "Dumbbell Curl" },
    { id: "4b", name: "Cable Curl" },
    { id: "4c", name: "Preacher Curl" },
  ],
};

export default function ActiveWorkoutPage() {
  const router = useRouter();
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>(
    MOCK_WORKOUT.exercises
  );

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const markExerciseCompleted = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
  };

  const finishWorkout = () => {
    setShowRatingDialog(true);
  };

  const handleRatingSubmit = () => {
    // Here you would save the workout data and rating
    router.push("/");
  };

  const replaceExercise = (
    originalId: string,
    newExercise: { id: string; name: string }
  ) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === originalId
          ? {
              ...ex,
              id: newExercise.id,
              name: newExercise.name,
              originalId: originalId, // Keep track of the original exercise
            }
          : ex
      )
    );
  };

  return (
    <main className="container mx-auto px-4 py-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">{MOCK_WORKOUT.name}</h1>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTimer}
              className="mr-2"
            >
              {isTimerRunning ? (
                <Pause className="h-5 w-5 text-orange-500" />
              ) : (
                <Play className="h-5 w-5 text-orange-500" />
              )}
            </Button>
            <WorkoutTimer isRunning={isTimerRunning} onTimeUpdate={() => {}} />
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Exercises</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Swipe left on the exercise tile to pick an alternative
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((exercise) => (
              <WorkoutExercise
                key={exercise.id}
                exercise={exercise}
                isCompleted={completedExercises.includes(exercise.id)}
                onComplete={() => markExerciseCompleted(exercise.id)}
                alternativeExercises={
                  ALTERNATIVE_EXERCISES[exercise.originalId || exercise.id] ||
                  []
                }
                onReplaceExercise={(newExercise) =>
                  replaceExercise(
                    exercise.originalId || exercise.id,
                    newExercise
                  )
                }
              />
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:static md:p-0 md:bg-transparent md:border-0">
          <div className="container mx-auto max-w-4xl">
            <Button
              onClick={finishWorkout}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Finish Workout
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Workout</DialogTitle>
            <DialogDescription>
              How was your workout today? This helps track your progress.
            </DialogDescription>
          </DialogHeader>
          <WorkoutRating rating={rating} onRatingChange={setRating} />
          <DialogFooter>
            <Button
              onClick={handleRatingSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Save & Finish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
