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

  // Lấy token từ cookie hoặc header
  const token = opts?.req?.cookies?.sessionToken || opts?.req?.headers?.authorization?.replace("Bearer ", "");

  if (token) {
    // Tìm session trong database
    const session = await DbsCasting.query.sessions.findFirst({
      where: eq(sessions.token, token),
      with: {
        user: true,
      },
    });

    if (session) {
      // Kiểm tra session đã hết hạn hay chưa
      if (isSessionExpired(session.expiresAt)) {
        sessionExpired = true;
        // Xóa session cũ
        await DbsCasting.delete(sessions).where(eq(sessions.token, token));
      } else {
        user = session.user;
      }
    }
  }

  return {
    user,
    sessionExpired,
    DbsCasting,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
