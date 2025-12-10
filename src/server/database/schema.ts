import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  integer,
  boolean,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const userRole = pgEnum("user_role", [
  "ACTOR",
  "RECRUITER",
  "ADMIN",
]);

export const userPlan = pgEnum("user_plan", [
  "BASIC",
  "STANDARD",
  "PRO",
  "PREMIUM",
]);

export const userStatus = pgEnum("user_status", [
  "ACTIVE",
  "SUSPENDED",
  "BLOCKED",
]);

// =====================
// USERS
// =====================
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  password: text("password").notNull(),

  role: userRole("role")
    .default("ACTOR")
    .notNull(),

  plan: userPlan("plan")
    .default("BASIC")
    .notNull(),

  // ⚠️ quota mua / được cấp từ plan
  castingQuota: integer("casting_quota")
    .default(0)
    .notNull(),

  // ✅ lượt miễn phí dùng 1 lần duy nhất
  freeCastingUsed: boolean("free_casting_used")
    .default(false)
    .notNull(),

  status: userStatus("status")
    .default("ACTIVE")
    .notNull(),

  emailVerifiedAt: timestamp("email_verified_at"),
  planExpiredAt: timestamp("plan_expired_at"),
  lastLoginAt: timestamp("last_login_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

// =====================
// SESSIONS
// =====================
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  token: text("token")
    .notNull()
    .unique(),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const actorProfiles = pgTable("actor_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),

  fullName: varchar("full_name", { length: 255 }).notNull(),

  dob: timestamp("dob"),

  gender: varchar("gender", { length: 10 })
    .$type<"male" | "female" | "other">()
    .default("male"),

  phone: varchar("phone", { length: 20 }),

  email: varchar("email", { length: 255 }), // optional (có thể khác user)

  address: varchar("address", { length: 255 }),

  height: integer("height"), // cm

  job: varchar("job", { length: 255 }),

  applyRole: varchar("apply_role", { length: 255 }),
  
  note: text("note"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const actorImages = pgTable("actor_images", {
  id: uuid("id").defaultRandom().primaryKey(),

  actorProfileId: uuid("actor_profile_id")
    .references(() => actorProfiles.id, { onDelete: "cascade" })
    .notNull(),

  s3Key: text("s3_key").notNull(),

  bucket: varchar("bucket", { length: 100 }).notNull(),

  region: varchar("region", { length: 50 }),

  isAvatar: boolean("is_avatar")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const actorProfilesRelations = relations(actorProfiles, ({ one, many }) => ({
  user: one(users, { fields: [actorProfiles.userId], references: [users.id] }),
  images: many(actorImages),
}));

export const recruiterCastings = pgTable("recruiter_castings", {
  id: uuid("id").defaultRandom().primaryKey(),

  recruiterId: uuid("recruiter_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  roleName: varchar("role_name", { length: 120 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // Loại: Phim, Quảng cáo, MV, Hài, Marketing
  location: varchar("location", { length: 255 }).notNull(), // Địa điểm casting
  ageRange: varchar("age_range", { length: 50 }),
  salary: varchar("salary", { length: 100 }),

  deadline: timestamp("deadline"),

  requirements: text("requirements"),
  education: varchar("education", { length: 120 }),
  talents: varchar("talents", { length: 120 }),
  languages: varchar("languages", { length: 120 }),

  status: varchar("status", { length: 50 })
    .default("OPEN")
    .$type<"OPEN" | "CLOSED" | "DRAFT">()
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
},
  (table) => ({
    unique_recruiter_casting: uniqueIndex("unique_recruiter_casting").on(
      table.recruiterId,
      table.roleName,
      table.type,
      table.location
    ),
  })  
);

export const recruiterCastingDetails = pgTable(
  "recruiter_casting_details",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    recruiterCastingId: uuid("recruiter_casting_id")
      .notNull()
      .references(() => recruiterCastings.id, {
        onDelete: "cascade",
      })
      .unique(), // ✅ 1 casting → 1 detail

    movieTitle: varchar("movie_title", { length: 255 })
      .notNull(),

    description: text("description"),

    // S3 PRIVATE IMAGE
    posterKey: text("poster_key").notNull(),
    posterMime: varchar("poster_mime", { length: 50 }),
    posterSize: integer("poster_size"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);

export const recruiterCastingsRelations = relations(
  recruiterCastings,
  ({ one }) => ({
    detail: one(recruiterCastingDetails),
    recruiter: one(users, {
      fields: [recruiterCastings.recruiterId],
      references: [users.id],
    }),
  })
);

export const recruiterCastingDetailsRelations = relations(
  recruiterCastingDetails,
  ({ one }) => ({
    casting: one(recruiterCastings, {
      fields: [recruiterCastingDetails.recruiterCastingId],
      references: [recruiterCastings.id],
    }),
  })
);
