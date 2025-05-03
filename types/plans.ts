import { WorkoutRouter } from "@/server/api/routers/workout";
import { inferProcedureOutput } from "@trpc/server";

export type WorkoutPlansResponse = inferProcedureOutput<
  WorkoutRouter["getWorkoutPlans"]
>;
export type WorkoutPlanDay =
  WorkoutPlansResponse[number]["workoutPlanDays"][number];
