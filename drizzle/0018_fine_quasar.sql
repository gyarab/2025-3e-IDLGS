ALTER TABLE "grade" RENAME COLUMN "percenage" TO "percentage";--> statement-breakpoint
ALTER TABLE "grade" DROP CONSTRAINT "percentageMin";--> statement-breakpoint
ALTER TABLE "grade" DROP CONSTRAINT "percentageMax";--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "percentageMin" CHECK ("grade"."percentage" > 0);--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "percentageMax" CHECK ("grade"."percentage" <= 100);