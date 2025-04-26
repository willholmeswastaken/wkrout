"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import {
  Play,
  Calendar,
  ChevronRight,
  CheckCircle,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";

// Mock data for the current plan
const INITIAL_PLAN_DATA = {
  id: "1",
  name: "5-Day Split",
  progress: {
    completed: 2,
    total: 5,
    percentage: 40,
  },
  weekWorkouts: [
    {
      id: "1",
      day: "1",
      name: "Day 1: Biceps & Chest",
      completed: true,
      date: "2025-04-15",
    },
    {
      id: "2",
      day: "2",
      name: "Day 2: Back & Triceps",
      completed: true,
      date: "2025-04-13",
    },
    {
      id: "3",
      day: "3",
      name: "Day 3: Shoulders",
      completed: false,
      isNext: true,
    },
    {
      id: "4",
      day: "4",
      name: "Day 4: Legs",
      completed: false,
    },
    {
      id: "5",
      day: "5",
      name: "Day 5: Core & Cardio",
      completed: false,
    },
  ],
  recentWorkouts: [
    {
      id: "1",
      day: "1",
      name: "Day 1: Biceps & Chest",
      date: "2025-04-15",
      rating: 4,
    },
    {
      id: "2",
      day: "2",
      name: "Day 2: Back & Triceps",
      date: "2025-04-13",
      rating: 5,
    },
  ],
};

export function CurrentPlanOverview() {
  const [currentPlan, setCurrentPlan] = useState(INITIAL_PLAN_DATA);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    // Reset the current plan's progress
    const resetPlan = {
      ...currentPlan,
      progress: {
        completed: 0,
        total: currentPlan.progress.total,
        percentage: 0,
      },
      weekWorkouts: currentPlan.weekWorkouts.map((workout) => {
        if (workout.day === "1") {
          // This is the "next" workout, so remove `date` and set `isNext`
          const { date, ...rest } = workout;
          return {
            ...rest,
            completed: false,
            isNext: true,
          };
        } else {
          // All others, remove `isNext` and `date`
          const { isNext, date, ...rest } = workout;
          return {
            ...rest,
            completed: false,
          };
        }
      }),
      // Keep recent workouts history
    };

    setCurrentPlan(resetPlan);
    setShowResetDialog(false);
    setResetSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setResetSuccess(false);
    }, 3000);
  };

  return (
    <>
      <Card className="border-orange-500/20">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{currentPlan.name}</CardTitle>
              <CardDescription>Current Plan</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-orange-500/10 text-orange-500 border-orange-500/20"
              >
                {currentPlan.progress.completed}/{currentPlan.progress.total}{" "}
                completed
              </Badge>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-orange-500 hover:border-orange-500/20"
                onClick={() => setShowResetDialog(true)}
                title="Reset weekly progress"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            {/* Success message */}
            {resetSuccess && (
              <Alert className="bg-green-500/10 text-green-500 border-green-500/20 mb-2">
                <AlertDescription className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Weekly progress has been reset successfully
                </AlertDescription>
              </Alert>
            )}

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Weekly progress</span>
                <span className="font-medium">
                  {currentPlan.progress.percentage}%
                </span>
              </div>
              <Progress
                value={currentPlan.progress.percentage}
                className="h-2"
              />
            </div>

            {/* This week's workouts */}
            <div>
              <h3 className="text-sm font-medium mb-3">This Week's Workouts</h3>
              <div className="space-y-3">
                {currentPlan.weekWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className={`rounded-lg p-3 ${
                      workout.completed
                        ? "bg-secondary/30"
                        : workout.isNext
                        ? "bg-orange-500/10 border border-orange-500/20"
                        : "bg-secondary/50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        {workout.completed ? (
                          <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                        ) : (
                          <Badge
                            variant="outline"
                            className="mr-2 bg-secondary/50 text-muted-foreground border-secondary"
                          >
                            Day {workout.day}
                          </Badge>
                        )}
                        <h4 className="text-sm font-medium">{workout.name}</h4>
                      </div>
                      {workout.completed && (
                        <span className="text-xs text-muted-foreground">
                          {workout.date &&
                            new Date(workout.date).toLocaleDateString("en-GB")}
                        </span>
                      )}
                    </div>

                    {!workout.completed && (
                      <Link
                        href={`/workout/start/${currentPlan.id}/${workout.day}`}
                      >
                        <Button
                          className={`w-full ${
                            workout.isNext
                              ? "bg-orange-500 hover:bg-orange-600"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                          size="sm"
                        >
                          <Play className="mr-2 h-3 w-3" />
                          {workout.isNext
                            ? "Start Next Workout"
                            : "Start Workout"}
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent workouts */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Recent Workouts</h3>
                <Link
                  href="/history"
                  className="text-xs text-orange-500 flex items-center"
                >
                  View All
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
              <div className="space-y-2">
                {currentPlan.recentWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex justify-between items-center p-3 bg-secondary/30 rounded-md"
                  >
                    <div>
                      <div className="text-sm">{workout.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(workout.date).toLocaleDateString("en-GB")}
                      </div>
                    </div>
                    <div className="flex text-orange-500">
                      {Array(workout.rating)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Link href="/plans" className="w-full">
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              View All Plans
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Weekly Progress</DialogTitle>
            <DialogDescription>
              Are you sure you want to reset your weekly workout progress? This
              will mark all workouts as incomplete.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-md p-3 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              This action cannot be undone. Your workout history will be
              preserved, but your current week's progress will be reset.
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              Reset Progress
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
