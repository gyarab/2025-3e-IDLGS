CREATE TABLE "dailyChallenges" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "dailyChallenges_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" text DEFAULT '' NOT NULL,
	"completedBy" integer DEFAULT 0 NOT NULL,
	"paramMin" integer DEFAULT 0 NOT NULL,
	"paramMax" integer DEFAULT 5 NOT NULL,
	CONSTRAINT "paramMinCheck" CHECK ("dailyChallenges"."paramMin" >= 0),
	CONSTRAINT "paramMaxCheck" CHECK ("dailyChallenges"."paramMax" <= 10),
	CONSTRAINT "paramSanityCheck" CHECK ("dailyChallenges"."paramMin" <= "dailyChallenges"."paramMax")
);
--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "redMinCheck" CHECK ("course"."red" >= 0);--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "redMaxCheck" CHECK ("course"."red" <= 255);--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "greenMinCheck" CHECK ("course"."green" >= 0);--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "greenMaxCheck" CHECK ("course"."green" <= 255);--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "blueMinCheck" CHECK ("course"."blue" >= 0);--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "blueMaxCheck" CHECK ("course"."blue" <= 255);--> statement-breakpoint
ALTER TABLE "textbook" ADD CONSTRAINT "redMinCheck" CHECK ("textbook"."red" >= 0);--> statement-breakpoint
ALTER TABLE "textbook" ADD CONSTRAINT "redMaxCheck" CHECK ("textbook"."red" <= 255);--> statement-breakpoint
ALTER TABLE "textbook" ADD CONSTRAINT "greenMinCheck" CHECK ("textbook"."green" >= 0);--> statement-breakpoint
ALTER TABLE "textbook" ADD CONSTRAINT "greenMaxCheck" CHECK ("textbook"."green" <= 255);--> statement-breakpoint
ALTER TABLE "textbook" ADD CONSTRAINT "blueMinCheck" CHECK ("textbook"."blue" >= 0);--> statement-breakpoint
ALTER TABLE "textbook" ADD CONSTRAINT "blueMaxCheck" CHECK ("textbook"."blue" <= 255);