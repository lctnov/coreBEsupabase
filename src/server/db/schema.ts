import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  bigint,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// =====================
// USERS
// =====================
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  password: text("password").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  castingMedia: many(castingMedia),
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

// =====================
// CASTINGS
// (Casting Job / Project)
// =====================
export const castings = pgTable("castings", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),

  description: text("description").default(""),

  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // ngày mở casting
  startAt: timestamp("start_at").defaultNow(),

  // ngày đóng casting
  endAt: timestamp("end_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const castingsRelations = relations(castings, ({ one, many }) => ({
  creator: one(users, {
    fields: [castings.createdBy],
    references: [users.id],
  }),
  media: many(castingMedia),
}));

// =====================
// CASTING MEDIA
// AWS S3 multipart upload result
// =====================
export const castingMedia = pgTable("casting_media", {
  id: uuid("id").defaultRandom().primaryKey(),

  castingId: uuid("casting_id")
    .notNull()
    .references(() => castings.id, { onDelete: "cascade" }),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  url: text("url") // CDN URL
    .notNull(),

  key: text("key") // S3 key
    .notNull(),

  filename: text("filename").notNull(),

  contentType: text("content_type")
    .notNull(),

  type: varchar("type", { length: 20 })
    .notNull()
    .$type<"image" | "video" | "document">(),

  size: bigint("size", { mode: "number" }).notNull(),

  duration: bigint("duration", { mode: "number" })
    .default(0)
    .notNull(), // seconds (video only)

  status: varchar("status", { length: 20 })
    .default("completed")
    .$type<"processing" | "completed" | "failed">(),

  metadata: jsonb("metadata")
    .default({})
    .notNull(),

  storageConfig: jsonb("storage_config")
    .default({})
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const castingMediaRelations = relations(
  castingMedia,
  ({ one }) => ({
    user: one(users, {
      fields: [castingMedia.userId],
      references: [users.id],
    }),
    casting: one(castings, {
      fields: [castingMedia.castingId],
      references: [castings.id],
    }),
  })
);
