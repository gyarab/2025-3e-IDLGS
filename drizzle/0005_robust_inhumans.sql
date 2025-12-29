CREATE TABLE "userTextbookLinker" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userTextbookLinker_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"editor" boolean DEFAULT false NOT NULL,
	"owner" boolean DEFAULT false NOT NULL,
	"textbook" integer NOT NULL,
	"user" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subject" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subject_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "userCourseLinker" DROP CONSTRAINT "userCourseLinker_textbook_textbook_id_fk";
--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "uuid" text NOT NULL;--> statement-breakpoint
ALTER TABLE "userCourseLinker" ADD COLUMN "teacher" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "userCourseLinker" ADD COLUMN "course" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "userTextbookLinker" ADD CONSTRAINT "userTextbookLinker_textbook_textbook_id_fk" FOREIGN KEY ("textbook") REFERENCES "public"."textbook"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userTextbookLinker" ADD CONSTRAINT "userTextbookLinker_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseLinker" ADD CONSTRAINT "userCourseLinker_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseLinker" DROP COLUMN "editor";--> statement-breakpoint
ALTER TABLE "userCourseLinker" DROP COLUMN "owner";--> statement-breakpoint
ALTER TABLE "userCourseLinker" DROP COLUMN "textbook";