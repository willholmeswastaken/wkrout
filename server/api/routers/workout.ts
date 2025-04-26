import { createTRPCRouter, publicProcedure } from "../trpc";

export const workoutRouter = createTRPCRouter({
  getWorkoutPlans: publicProcedure.query(({ ctx }) => {
    const plans = ctx.db.query.workoutPlans.findMany({
      with: {
        workoutPlanDays: {
          with: {
            workoutPlanExercises: {
              with: {
                exercise: true,
              },
            },
          },
        },
      },
    });
    return plans;
  }),
});

export type WorkoutRouter = typeof workoutRouter;
