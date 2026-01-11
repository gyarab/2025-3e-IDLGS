ALTER TABLE "user" RENAME COLUMN "dailyChallenges" TO "gamification";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "canEditGamification" boolean DEFAULT true NOT NULL;