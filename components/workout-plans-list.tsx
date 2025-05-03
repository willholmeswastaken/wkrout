"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { WorkoutPlanDayList } from "@/components/workout-plan-day-list";
import { WorkoutPlansResponse } from "@/types/plans";

export function WorkoutPlansList({ plans }: { plans: WorkoutPlansResponse }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {plans.map((plan) => (
        <Card key={plan.id}>
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
            <Link href={`/plans/start/${plan.id}`}>
              <Button>Start Plan</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
