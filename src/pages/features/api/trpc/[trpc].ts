import { appRouter } from "../../../../server/routers";
import { createContext } from "../../../../server/trpc/context";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
