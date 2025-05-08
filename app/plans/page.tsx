import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { WorkoutPlansList } from "@/components/workout-plans-list";
import { api } from "@/trpc/server";

export default async function PlansPage() {
  const workoutPlans = await api.workout.getWorkoutPlans();
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold">My Plans</h2>
        <Link href="/plans/create">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-5 w-5 mr-2" />
            Create Plan
          </Button>
        </Link>
      </div>
      <div>
        {workoutPlans.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            You have no plans yet. <br />
            <Link
              href="/plans/create"
              className="text-orange-500 hover:underline"
            >
              Create your first plan
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            <WorkoutPlansList plans={workoutPlans} />
          </div>
        )}
      </div>
    </div>
  );
}
