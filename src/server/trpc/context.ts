import { type NextApiRequest, type NextApiResponse } from "next";
import { DbsCasting } from "../database";
import { sessions } from "../database/schema";
import { eq } from "drizzle-orm";
import { isSessionExpired } from "../utils/session";

export async function createContext(opts?: {
  req?: NextApiRequest;
  res?: NextApiResponse;
}) {
  let user: any = null;
  let sessionExpired = false;
  let session: {
    token: string;
    userId: string;
  } | null = null;

  const token =
    opts?.req?.cookies?.sessionToken ||
    opts?.req?.headers?.authorization?.replace("Bearer ", "");

  if (token) {
    const foundSession = await DbsCasting.query.sessions.findFirst({
      where: eq(sessions.token, token),
      with: {
        user: true,
      },
    });

    if (foundSession) {
      if (isSessionExpired(foundSession.expiresAt)) {
        sessionExpired = true;
        await DbsCasting.delete(sessions).where(eq(sessions.token, token));
      } else {
        user = foundSession.user;
        session = {
          token: foundSession.token,
          userId: foundSession.userId,
        };
      }
    }
  }

  return {
    user,
    session, // ✅ QUAN TRỌNG
    sessionExpired,
    DbsCasting,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
