import { DbsCasting } from "../database";
import { users, sessions } from "../database/schema";
import { eq } from "drizzle-orm";
import { generateToken, getSessionExpiry } from "../utils/session";

class AuthRepository {

  findUserByEmail(email: string) {
    return DbsCasting.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async createUser(email: string, hashedPassword: string) {
    const result = await DbsCasting
      .insert(users)
      .values({ email, password: hashedPassword })
      .returning();

    return result[0];
  }

  deleteSessionsByUserId(userId: string) {
    return DbsCasting.delete(sessions).where(eq(sessions.userId, userId));
  }

  async createSession(userId: string) {
    const token = generateToken();
    const expiresAt = getSessionExpiry();

    const result = await DbsCasting
      .insert(sessions)
      .values({ userId, token, expiresAt })
      .returning();

    return result[0];
  }

  deleteSessionByToken(token: string) {
    return DbsCasting.delete(sessions).where(eq(sessions.token, token));
  }
}

export const authRepository = new AuthRepository();
