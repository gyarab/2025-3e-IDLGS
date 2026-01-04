ALTER TABLE "user" ADD COLUMN "setPassword" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "dailyChallenges" boolean DEFAULT true NOT NULL;