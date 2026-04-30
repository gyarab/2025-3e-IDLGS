ALTER TABLE "user" ADD COLUMN "r" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "g" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "b" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "colorValues" CHECK ((r >= 0 AND r <= 255) AND
		(g >= 0 AND g <= 255) AND
		(b >= 0 AND b <= 255));