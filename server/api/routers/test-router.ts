import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const testRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello, ${input.name ?? "world"}!`,
      };
    }),
});

export type TestRouter = typeof testRouter;
