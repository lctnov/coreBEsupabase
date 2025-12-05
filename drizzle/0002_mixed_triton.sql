CREATE TABLE "casting_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"casting_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"url" text NOT NULL,
	"key" text NOT NULL,
	"filename" text NOT NULL,
	"content_type" text NOT NULL,
	"type" varchar(20) NOT NULL,
	"size" bigint NOT NULL,
	"duration" bigint DEFAULT 0 NOT NULL,
	"status" varchar(20) DEFAULT 'completed',
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"storage_config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "castings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '',
	"created_by" uuid NOT NULL,
	"start_at" timestamp DEFAULT now(),
	"end_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "casting_media" ADD CONSTRAINT "casting_media_casting_id_castings_id_fk" FOREIGN KEY ("casting_id") REFERENCES "public"."castings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "casting_media" ADD CONSTRAINT "casting_media_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "castings" ADD CONSTRAINT "castings_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;