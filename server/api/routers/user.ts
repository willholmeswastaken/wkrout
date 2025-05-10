import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { userWorkoutPlans } from "@/server/db/schema";
import { eq } from "drizzle-orm";

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

  saveWorkoutPlan: protectedProcedure
    .input(
      z.object({
        workoutPlanId: z.number(),
        daysPerWeek: z.number().min(1).max(7),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { workoutPlanId, daysPerWeek } = input;
      const [userWorkoutPlan] = await ctx.db
        .insert(userWorkoutPlans)
        .values({
          userId: ctx.session.user.id,
          workoutPlanId,
          daysPerWeek,
        })
        .returning();

      return userWorkoutPlan;
    }),

  abandonWorkoutPlan: protectedProcedure
    .input(
      z.object({
        userWorkoutPlanId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userWorkoutPlanId } = input;

      // Delete the user's workout plan
      await ctx.db
        .delete(userWorkoutPlans)
        .where(
          eq(userWorkoutPlans.id, userWorkoutPlanId) &&
            eq(userWorkoutPlans.userId, ctx.session.user.id)
        );

      return { success: true };
    }),
});

export type UserRouter = typeof userRouter;
