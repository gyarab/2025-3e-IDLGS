ALTER TABLE "user" ADD COLUMN "canCreateTextbooks" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "canCreateCourses" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "canCreateResin" boolean DEFAULT false NOT NULL;