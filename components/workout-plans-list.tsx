"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { WorkoutPlanDayList } from "@/components/workout-plan-day-list";
import { WorkoutPlansResponse } from "@/types/plans";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export function WorkoutPlansList({ plans }: { plans: WorkoutPlansResponse }) {
  const router = useRouter();
  const saveWorkoutPlan = api.user.saveWorkoutPlan.useMutation({
    onSuccess: () => {
      router.push("/app");
    },
    onError: () => {
      toast.error("Failed to save workout plan");
    },
  });

  const handleStartPlan = async (planId: number, daysPerWeek: number) => {
    saveWorkoutPlan.mutate({
      workoutPlanId: planId,
      daysPerWeek,
    });
  };

  return (
    <>
      {plans.map((plan) => (
        <Card key={plan.id} className="min-w-[300px] w-full mx-auto">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{plan.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="mb-4">
              <WorkoutPlanDayList days={plan.workoutPlanDays} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Button
              onClick={() => handleStartPlan(plan.id, plan.days)}
              disabled={saveWorkoutPlan.isPending}
            >
              {saveWorkoutPlan.isPending ? "Starting..." : "Start Plan"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
