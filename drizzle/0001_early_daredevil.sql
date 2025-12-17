ALTER TABLE "course" ADD COLUMN "red" integer DEFAULT 255 NOT NULL;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "green" integer DEFAULT 255 NOT NULL;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "blue" integer DEFAULT 255 NOT NULL;--> statement-breakpoint
ALTER TABLE "textbook" ADD COLUMN "name" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "textbook" ADD COLUMN "red" integer DEFAULT 255 NOT NULL;--> statement-breakpoint
ALTER TABLE "textbook" ADD COLUMN "green" integer DEFAULT 255 NOT NULL;--> statement-breakpoint
ALTER TABLE "textbook" ADD COLUMN "blue" integer DEFAULT 255 NOT NULL;