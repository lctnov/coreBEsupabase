import { router, publicProcedure } from "../trpc/router";
import { zod } from "zod";
import { userController } from "../controller/user.controller";

// router for user-related operations
export const userRouter = router({
  list: publicProcedure
    .input(
      zod.object({
        page: zod.number().min(1),
        limit: zod.number().min(1).max(100),
      })
    )
    .query(async ({ input }) => {
      return userController.getCurrentUser(input);
    }),
});
