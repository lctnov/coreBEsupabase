import { zod } from "zod";
import { router, publicProcedure } from "../trpc/router";
import { recruiterCastingController } from "../controller/recruiterCasting.controller";

export const recruiterCastingRouter = router({
  createCasting: publicProcedure
    .input(
      zod.object({
        movieTitle: zod.string(),
        roleName: zod.string(),
        type: zod.string(),
        location: zod.string(),
        ageRange: zod.string().optional(),
        salary: zod.string().optional(),
        deadline: zod.string().optional(),
        requirements: zod.string().optional(),
        education: zod.string().optional(),
        talents: zod.string().optional(),
        languages: zod.string().optional(),
        description: zod.string().optional(),
        posterFile: zod.instanceof(File),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return recruiterCastingController.createCasting(ctx, input);
    }),
});
