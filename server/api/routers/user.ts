import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserWorkoutPlans: publicProcedure.query(({ ctx }) => {
    const plans = ctx.db.query.userWorkoutPlans.findMany({
      with: {
        workoutPlan: true,
      },
    });
    return plans;
  }),
});

export type UserRouter = typeof userRouter;
