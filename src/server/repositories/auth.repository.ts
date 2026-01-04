import { DbsCasting } from "../database";
import { users, sessions } from "../database/schema";
import { eq } from "drizzle-orm";
import { generateToken, getSessionExpiry } from "../utils/session";
import type { UserRole } from "@/pages/features/register/register.type";

class AuthRepository {

  findUserByEmail(email: string) {
    console.log("Finding user by email:", email);
    
    return DbsCasting.query.users.findFirst({
      columns: {
        email: true,
      },
      where: eq(users.email, email),
    });
  }

  findUser(email: string) {
    console.log("Finding user by email:", email);
    
    return DbsCasting.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
      where: eq(users.email, email),
    });
  }

  async createUser(email: string, hashedPassword: string, role: UserRole) {
    console.log("Creating user with email:", email);
    
    const result = await DbsCasting
      .insert(users)
      .values({ email, password: hashedPassword, role })
      .returning();
      
    console.log("Created user:", result);
    
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
