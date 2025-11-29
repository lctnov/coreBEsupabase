import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "../db";
import { sessions } from "../db/schema";
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
    const session = await db.query.sessions.findFirst({
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
        await db.delete(sessions).where(eq(sessions.token, token));
      } else {
        user = session.user;
      }
    }
  }

  return {
    user,
    sessionExpired,
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
