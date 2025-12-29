import { router, publicProcedure } from "../trpc/router";
import { z } from "zod";
import { userController } from "../controller/user.controller";

// router for user-related operations
export const userRouter = router({
  list: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ input }) => {
      return userController.getCurrentUser(input);
    }),
});
