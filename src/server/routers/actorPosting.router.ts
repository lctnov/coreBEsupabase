import { zod } from "zod";
import { router, publicProcedure } from "../trpc/router";
import { actorPostingController } from "../controller/actorPosting.controller";

export const actorPostingRouter = router({
  // CREATE / UPDATE PROFILE
  saveProfile: publicProcedure
    .input(
      zod.object({
        fullName: zod.string(),
        dob: zod.string().optional(),
        gender: zod.enum(["male", "female", "other"]),
        cmnd: zod.string().optional(),
        phone: zod.string().optional(),
        email: zod.string().optional(),
        address: zod.string().optional(),
        height: zod.number().optional(),
        job: zod.string().optional(),
        applyRole: zod.string().optional(),
        note: zod.string().optional(),
        images: zod.array(zod.instanceof(File)).optional(),
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
