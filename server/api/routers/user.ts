import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserWorkoutPlans: protectedProcedure.query(({ ctx }) => {
    const plans = ctx.db.query.userWorkoutPlans.findMany({
      where: (userWorkoutPlans, { eq }) =>
        eq(userWorkoutPlans.userId, ctx.session.user.id),
      with: {
        workoutPlan: true,
      },
    });
    return plans;
  }),
});

export type UserRouter = typeof userRouter;
