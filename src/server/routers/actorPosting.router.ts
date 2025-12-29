import { z } from "zod";
import { router, publicProcedure } from "../trpc/router";
import { actorPostingController } from "../controller/actorPosting.controller";

export const actorPostingRouter = router({
  // CREATE / UPDATE PROFILE
  saveProfile: publicProcedure
    .input(
      z.object({
        fullName: z.string(),
        dob: z.string().optional(),
        gender: z.enum(["male", "female", "other"]),
        cmnd: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        height: z.number().optional(),
        job: z.string().optional(),
        applyRole: z.string().optional(),
        note: z.string().optional(),
        images: z.array(z.instanceof(File)).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return actorPostingController.saveProfile(ctx, input);
    }),

  // GET PROFILE
  getProfile: publicProcedure.query(async ({ ctx }) => {
    return actorPostingController.getProfile(ctx);
  }),
});
