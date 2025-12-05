import { router } from "../trpc/router";
import { authRouter } from "./auth";
import { uploadRouter } from "./uploadRouter";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;
