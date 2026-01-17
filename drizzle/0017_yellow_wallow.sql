ALTER TABLE "userAssignmentLinker" DROP CONSTRAINT "userAssignmentLinker_courseAssignment_course_id_fk";
--> statement-breakpoint
ALTER TABLE "userAssignmentLinker" DROP CONSTRAINT "userAssignmentLinker_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "userCourseLinker" DROP CONSTRAINT "userCourseLinker_course_course_id_fk";
--> statement-breakpoint
ALTER TABLE "userCourseLinker" DROP CONSTRAINT "userCourseLinker_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "userTextbookLinker" DROP CONSTRAINT "userTextbookLinker_textbook_textbook_id_fk";
--> statement-breakpoint
ALTER TABLE "userTextbookLinker" DROP CONSTRAINT "userTextbookLinker_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "userAssignmentLinker" ADD CONSTRAINT "userAssignmentLinker_courseAssignment_course_id_fk" FOREIGN KEY ("courseAssignment") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userAssignmentLinker" ADD CONSTRAINT "userAssignmentLinker_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseLinker" ADD CONSTRAINT "userCourseLinker_course_course_id_fk" FOREIGN KEY ("course") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userCourseLinker" ADD CONSTRAINT "userCourseLinker_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userTextbookLinker" ADD CONSTRAINT "userTextbookLinker_textbook_textbook_id_fk" FOREIGN KEY ("textbook") REFERENCES "public"."textbook"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userTextbookLinker" ADD CONSTRAINT "userTextbookLinker_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;