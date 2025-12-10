import { router } from "../trpc/router";
import { actorPostingRouter } from "./actorPosting.router";
import { authRouter } from "./auth.router";
import { recruiterCastingRouter } from "./recruiterCasting.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  actorCastingRouter: actorPostingRouter,
  recruiterCastingRouter: recruiterCastingRouter,
});

export type AppRouter = typeof appRouter;
