ALTER TABLE "question" ADD COLUMN "uuid" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "red" integer DEFAULT 255 NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "green" integer DEFAULT 255 NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "blue" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "highlight" ADD COLUMN "red" integer DEFAULT 255 NOT NULL;--> statement-breakpoint
ALTER TABLE "highlight" ADD COLUMN "green" integer DEFAULT 255 NOT NULL;--> statement-breakpoint
ALTER TABLE "highlight" ADD COLUMN "blue" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "question" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "highlight" DROP COLUMN "color";--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "redMinCheck" CHECK ("bookmark"."red" >= 0);--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "redMaxCheck" CHECK ("bookmark"."red" <= 255);--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "greenMinCheck" CHECK ("bookmark"."green" >= 0);--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "greenMaxCheck" CHECK ("bookmark"."green" <= 255);--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "blueMinCheck" CHECK ("bookmark"."blue" >= 0);--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "blueMaxCheck" CHECK ("bookmark"."blue" <= 255);--> statement-breakpoint
ALTER TABLE "highlight" ADD CONSTRAINT "redMinCheck" CHECK ("highlight"."red" >= 0);--> statement-breakpoint
ALTER TABLE "highlight" ADD CONSTRAINT "redMaxCheck" CHECK ("highlight"."red" <= 255);--> statement-breakpoint
ALTER TABLE "highlight" ADD CONSTRAINT "greenMinCheck" CHECK ("highlight"."green" >= 0);--> statement-breakpoint
ALTER TABLE "highlight" ADD CONSTRAINT "greenMaxCheck" CHECK ("highlight"."green" <= 255);--> statement-breakpoint
ALTER TABLE "highlight" ADD CONSTRAINT "blueMinCheck" CHECK ("highlight"."blue" >= 0);--> statement-breakpoint
ALTER TABLE "highlight" ADD CONSTRAINT "blueMaxCheck" CHECK ("highlight"."blue" <= 255);