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
import { Play, Calendar, CheckCircle, RotateCcw, X } from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UserWorkoutPlan = {
  id: number;
  workoutPlanId: number;
  customName: string | null;
  daysPerWeek: number;
  workoutPlan: {
    id: number;
    name: string;
    description: string | null;
    days: number;
  };
};

interface CurrentPlanOverviewProps {
  plan: UserWorkoutPlan;
}

export function CurrentPlanOverview({ plan }: CurrentPlanOverviewProps) {
  const router = useRouter();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showAbandonDialog, setShowAbandonDialog] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const abandonPlan = api.user.abandonWorkoutPlan.useMutation({
    onSuccess: () => {
      toast.success("Plan abandoned successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to abandon plan");
    },
  });

  const planName = plan.customName || plan.workoutPlan.name;
  const totalWorkouts = plan.daysPerWeek;
  const completedWorkouts = 0; // TODO: Calculate from userWorkouts
  const progressPercentage = Math.round(
    (completedWorkouts / totalWorkouts) * 100
  );

  const handleReset = () => {
    // TODO: Implement reset functionality
    setShowResetDialog(false);
    setResetSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setResetSuccess(false);
    }, 3000);
  };

  const handleAbandon = () => {
    abandonPlan.mutate({ userWorkoutPlanId: plan.id });
    setShowAbandonDialog(false);
  };

  return (
    <>
      <Card className="border-orange-500/20">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{planName}</CardTitle>
              <CardDescription>Current Plan</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-orange-500/10 text-orange-500 border-orange-500/20"
              >
                {completedWorkouts}/{totalWorkouts} completed
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
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-500/20"
                onClick={() => setShowAbandonDialog(true)}
                title="Abandon plan"
              >
                <X className="h-4 w-4" />
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
                <span className="font-medium">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* This week's workouts */}
            <div>
              <h3 className="text-sm font-medium mb-3">This Week's Workouts</h3>
              <div className="space-y-3">
                {/* TODO: Map through actual workout days */}
                <div className="rounded-lg p-3 bg-orange-500/10 border border-orange-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className="mr-2 bg-secondary/50 text-muted-foreground border-secondary"
                      >
                        Day 1
                      </Badge>
                      <h4 className="text-sm font-medium">
                        Start your workout
                      </h4>
                    </div>
                  </div>
                  <Link href={`/workout/start/${plan.id}/1`}>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      size="sm"
                    >
                      <Play className="mr-2 h-3 w-3" />
                      Start Next Workout
                    </Button>
                  </Link>
                </div>
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
              Are you sure you want to reset your weekly progress? This will
              clear all completed workouts for the current week.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              Reset Progress
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Abandon Plan Dialog */}
      <Dialog open={showAbandonDialog} onOpenChange={setShowAbandonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abandon Current Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to abandon this plan? This action cannot be
              undone. You will lose all progress associated with this plan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAbandonDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleAbandon}
              disabled={abandonPlan.isPending}
            >
              {abandonPlan.isPending ? "Abandoning..." : "Abandon Plan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
