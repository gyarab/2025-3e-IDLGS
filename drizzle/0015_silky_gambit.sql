CREATE TABLE "userAssignmentLinker" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userAssignmentLinker_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"completed" boolean DEFAULT false NOT NULL,
	"courseAssignment" integer NOT NULL,
	"user" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assignment" ADD COLUMN "createdAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment" ADD COLUMN "course" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment" ADD COLUMN "title" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment" ADD COLUMN "description" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment" ADD COLUMN "uuid" text NOT NULL;--> statement-breakpoint
ALTER TABLE "assignmentComment" ADD COLUMN "author" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "assignmentComment" ADD COLUMN "uuid" text NOT NULL;--> statement-breakpoint
ALTER TABLE "grade" ADD COLUMN "assignment" integer;--> statement-breakpoint
ALTER TABLE "userAssignmentLinker" ADD CONSTRAINT "userAssignmentLinker_courseAssignment_course_id_fk" FOREIGN KEY ("courseAssignment") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userAssignmentLinker" ADD CONSTRAINT "userAssignmentLinker_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignmentComment" ADD CONSTRAINT "assignmentComment_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "grade_assignment_assignment_id_fk" FOREIGN KEY ("assignment") REFERENCES "public"."assignment"("id") ON DELETE no action ON UPDATE no action;