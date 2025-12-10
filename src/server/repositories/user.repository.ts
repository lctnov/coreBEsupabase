import { DbsCasting } from "../database";
import { users } from "../database/schema";
import { asc, count } from "drizzle-orm";

class UserRepository {
  getUsers(offset: number, limit: number) {
    return DbsCasting
      .select()
      .from(users)
      .orderBy(asc(users.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async countUsers() {
    const countResult = await DbsCasting
      .select({ count: count() })
      .from(users);

    return countResult[0]?.count || 0;
  }
}

export const userRepository = new UserRepository();
