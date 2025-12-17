CREATE TABLE "article" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "article_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assignment" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "assignment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"deadline" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assignmentComment" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "assignmentComment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"assignment" integer NOT NULL,
	"createdAt" timestamp NOT NULL,
	"comment" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blog_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" text DEFAULT '' NOT NULL,
	"user" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chapter" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "chapter_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" text NOT NULL,
	"name" text NOT NULL,
	"summary" text NOT NULL,
	"textbook" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "course_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text DEFAULT '' NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"subject" text DEFAULT '' NOT NULL,
	"textbook" integer NOT NULL,
	"createdAt" timestamp NOT NULL,
	"modifiedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courseCode" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courseCode_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"expiresAt" timestamp NOT NULL,
	"usesRemaining" integer DEFAULT 0 NOT NULL,
	"infinite" boolean DEFAULT false NOT NULL,
	"course" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grade" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "grade_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"percenage" integer DEFAULT 0 NOT NULL,
	"course" integer NOT NULL,
	"user" integer NOT NULL,
	CONSTRAINT "percentageMin" CHECK ("grade"."percenage" > 0),
	CONSTRAINT "percentageMax" CHECK ("grade"."percenage" <= 100)
);
--> statement-breakpoint
CREATE TABLE "image" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "image_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" text NOT NULL,
	"link" text DEFAULT '' NOT NULL,
	"alt" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interactiveElement" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "interactiveElement_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" text NOT NULL,
	"rawData" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "percentageGradeValue" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "percentageGradeValue_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"course" integer NOT NULL,
	"min" integer DEFAULT 0 NOT NULL,
	"max" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "percentageMin" CHECK ("percentageGradeValue"."min" >= 0),
	CONSTRAINT "percentageMax" CHECK ("percentageGradeValue"."min" <= 100)
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "question_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" integer DEFAULT -1 NOT NULL,
	"answer" text DEFAULT '' NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"course" integer NOT NULL,
	"reportCount" integer DEFAULT 0 NOT NULL,
	"ai" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "school" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "school_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text DEFAULT '' NOT NULL,
	"productkey" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "setting" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "setting_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" text DEFAULT '' NOT NULL,
	"value" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "textbook" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "textbook_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"createdAt" timestamp NOT NULL,
	"modifiedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" text NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"password" text DEFAULT '' NOT NULL,
	"iterations" integer DEFAULT 0 NOT NULL,
	"salt" text DEFAULT '' NOT NULL,
	"createdAt" timestamp NOT NULL,
	"birthday" date NOT NULL,
	"lang" text DEFAULT 'en' NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"extended" boolean DEFAULT false NOT NULL,
	"admin" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userCourseLinker" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userCourseLinker_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"editor" boolean DEFAULT false NOT NULL,
	"owner" boolean DEFAULT false NOT NULL,
	"textbook" integer NOT NULL,
	"user" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userSession" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userSession_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"token" text NOT NULL,
	"user" integer NOT NULL,
	"expiresAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userVerification" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userVerification_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" text NOT NULL,
	"user" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assignmentComment" ADD CONSTRAINT "assignmentComment_assignment_assignment_id_fk" FOREIGN KEY ("assignment") REFERENCES "public"."assignment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog" ADD CONSTRAINT "blog_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_textbook_textbook_id_fk" FOREIGN KEY ("textbook") REFERENCES "public"."textbook"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_textbook_textbook_id_fk" FOREIGN KEY ("textbook") REFERENCES "public"."textbook"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courseCode" ADD CONSTRAINT "courseCode_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "grade_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "grade_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "percentageGradeValue" ADD CONSTRAINT "percentageGradeValue_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseLinker" ADD CONSTRAINT "userCourseLinker_textbook_textbook_id_fk" FOREIGN KEY ("textbook") REFERENCES "public"."textbook"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseLinker" ADD CONSTRAINT "userCourseLinker_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userSession" ADD CONSTRAINT "userSession_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userVerification" ADD CONSTRAINT "userVerification_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;