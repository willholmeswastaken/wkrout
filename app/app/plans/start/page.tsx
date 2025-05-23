import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WorkoutPlansList } from "@/components/workout-plans-list";
import { api } from "@/trpc/server";

export default async function StartPlanPage() {
  const workoutPlans = await api.workout.getWorkoutPlans();
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Choose a plan</h1>
          </div>
        </div>

        <div className="">
          <WorkoutPlansList plans={workoutPlans} />
        </div>
      </div>
    </main>
  );
}
