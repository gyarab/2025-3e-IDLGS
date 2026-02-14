CREATE TABLE "schoolLessonPlanItemLinker" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "schoolLessonPlanItemLinker_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"lessonPlanItem" integer NOT NULL,
	"school" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lessonPlanItem" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lessonPlanItem_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"startTime" timestamp NOT NULL,
	"endTime" timestamp NOT NULL,
	"additionalNote" text DEFAULT '' NOT NULL,
	"subject" text DEFAULT '' NOT NULL,
	"teacher" integer NOT NULL,
	"uuid" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "courseLessonTemplate" CASCADE;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "modifiedAt" timestamp DEFAULT '2026-02-13 21:59:19.226' NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "createdAt" timestamp DEFAULT '2026-02-13 21:59:19.226' NOT NULL;--> statement-breakpoint
ALTER TABLE "schoolLessonPlanItemLinker" ADD CONSTRAINT "schoolLessonPlanItemLinker_lessonPlanItem_courseLesson_id_fk" FOREIGN KEY ("lessonPlanItem") REFERENCES "public"."courseLesson"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schoolLessonPlanItemLinker" ADD CONSTRAINT "schoolLessonPlanItemLinker_school_course_id_fk" FOREIGN KEY ("school") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessonPlanItem" ADD CONSTRAINT "lessonPlanItem_teacher_user_id_fk" FOREIGN KEY ("teacher") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;