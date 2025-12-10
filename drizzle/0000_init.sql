CREATE TYPE "public"."user_plan" AS ENUM('BASIC', 'STANDARD', 'PRO', 'PREMIUM');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('ACTOR', 'RECRUITER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'SUSPENDED', 'BLOCKED');--> statement-breakpoint
CREATE TABLE "actor_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_profile_id" uuid NOT NULL,
	"s3_key" text NOT NULL,
	"bucket" varchar(100) NOT NULL,
	"region" varchar(50),
	"is_avatar" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "actor_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"dob" timestamp,
	"gender" varchar(10) DEFAULT 'male',
	"phone" varchar(20),
	"email" varchar(255),
	"address" varchar(255),
	"height" integer,
	"job" varchar(255),
	"apply_role" varchar(255),
	"note" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "actor_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "recruiter_casting_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recruiter_casting_id" uuid NOT NULL,
	"movie_title" varchar(255) NOT NULL,
	"description" text,
	"poster_key" text NOT NULL,
	"poster_mime" varchar(50),
	"poster_size" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "recruiter_casting_details_recruiter_casting_id_unique" UNIQUE("recruiter_casting_id")
);
--> statement-breakpoint
CREATE TABLE "recruiter_castings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recruiter_id" uuid NOT NULL,
	"role_name" varchar(120) NOT NULL,
	"type" varchar(50) NOT NULL,
	"location" varchar(255) NOT NULL,
	"age_range" varchar(50),
	"salary" varchar(100),
	"deadline" timestamp,
	"requirements" text,
	"education" varchar(120),
	"talents" varchar(120),
	"languages" varchar(120),
	"status" varchar(50) DEFAULT 'OPEN' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'ACTOR' NOT NULL,
	"plan" "user_plan" DEFAULT 'BASIC' NOT NULL,
	"casting_quota" integer DEFAULT 0 NOT NULL,
	"free_casting_used" boolean DEFAULT false NOT NULL,
	"status" "user_status" DEFAULT 'ACTIVE' NOT NULL,
	"email_verified_at" timestamp,
	"plan_expired_at" timestamp,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "actor_images" ADD CONSTRAINT "actor_images_actor_profile_id_actor_profiles_id_fk" FOREIGN KEY ("actor_profile_id") REFERENCES "public"."actor_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "actor_profiles" ADD CONSTRAINT "actor_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recruiter_casting_details" ADD CONSTRAINT "recruiter_casting_details_recruiter_casting_id_recruiter_castings_id_fk" FOREIGN KEY ("recruiter_casting_id") REFERENCES "public"."recruiter_castings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recruiter_castings" ADD CONSTRAINT "recruiter_castings_recruiter_id_users_id_fk" FOREIGN KEY ("recruiter_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_recruiter_casting" ON "recruiter_castings" USING btree ("recruiter_id","role_name","type","location");