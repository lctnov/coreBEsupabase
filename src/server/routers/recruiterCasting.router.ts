import { z } from "zod";
import { router, publicProcedure } from "../trpc/router";
import { recruiterCastingController } from "../controller/recruiterCasting.controller";

export const recruiterCastingRouter = router({
  createCasting: publicProcedure
    .input(
      z.object({
        movieTitle: z.string(),
        roleName: z.string(),
        type: z.string(),
        location: z.string(),
        ageRange: z.string().optional(),
        salary: z.string().optional(),
        deadline: z.string().optional(),
        requirements: z.string().optional(),
        education: z.string().optional(),
        talents: z.string().optional(),
        languages: z.string().optional(),
        description: z.string().optional(),
        posterFile: z.instanceof(File),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return recruiterCastingController.createCasting(ctx, input);
    }),
});
