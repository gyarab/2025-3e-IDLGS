CREATE TABLE "courseLesson" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courseLesson_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"course" integer NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"note" text DEFAULT '' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"uuid" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courseLessonTemplate" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courseLessonTemplate_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"startTime" timestamp NOT NULL,
	"endTime" timestamp NOT NULL,
	"additionalNote" text DEFAULT '' NOT NULL,
	"uuid" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userCourseLessonLinker" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userCourseLessonLinker_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseLesson" integer NOT NULL,
	"user" integer NOT NULL,
	"present" boolean DEFAULT false NOT NULL,
	"late" boolean DEFAULT false NOT NULL,
	"excused" boolean DEFAULT false NOT NULL,
	"locked" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DROP TABLE "articleBkTreeEdge" CASCADE;--> statement-breakpoint
DROP TABLE "articleBkTreeNode" CASCADE;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "treatLateAsAbsence" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "leagueId" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "xpWeek" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "xpTotal" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "courseLesson" ADD CONSTRAINT "courseLesson_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseLessonLinker" ADD CONSTRAINT "userCourseLessonLinker_courseLesson_courseLesson_id_fk" FOREIGN KEY ("courseLesson") REFERENCES "public"."courseLesson"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseLessonLinker" ADD CONSTRAINT "userCourseLessonLinker_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;