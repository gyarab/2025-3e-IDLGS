CREATE TABLE "articleHistoryVersionEntryLinker" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articleHistoryVersionEntryLinker_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"articleHistoryVersionEntry" integer NOT NULL,
	"articleHistoryVersion" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articleBkTreeEdge" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articleBkTreeEdge_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"parentNode" integer NOT NULL,
	"childNode" integer NOT NULL,
	"distance" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articleBkTreeNode" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articleBkTreeNode_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"article" integer NOT NULL,
	"word" text NOT NULL,
	"wordIndex" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articleHistoryVersion" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articleHistoryVersion_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"article" integer NOT NULL,
	"user" integer,
	"editedAt" timestamp NOT NULL,
	"uuid" text NOT NULL,
	"note" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articleHistoryVersionEntry" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articleHistoryVersionEntry_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"startIndex" integer DEFAULT 0 NOT NULL,
	"oldText" text DEFAULT '' NOT NULL,
	"newText" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assignment" DROP CONSTRAINT "assignment_author_user_id_fk";
--> statement-breakpoint
ALTER TABLE "assignmentComment" DROP CONSTRAINT "assignmentComment_author_user_id_fk";
--> statement-breakpoint
ALTER TABLE "courseMessage" DROP CONSTRAINT "courseMessage_author_user_id_fk";
--> statement-breakpoint
ALTER TABLE "courseMessageComment" DROP CONSTRAINT "courseMessageComment_author_user_id_fk";
--> statement-breakpoint
ALTER TABLE "assignment" ALTER COLUMN "author" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "assignmentComment" ALTER COLUMN "author" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courseMessage" ALTER COLUMN "author" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courseMessageComment" ALTER COLUMN "author" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "user" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articleHistoryVersionEntryLinker" ADD CONSTRAINT "articleHistoryVersionEntryLinker_articleHistoryVersionEntry_articleHistoryVersionEntry_id_fk" FOREIGN KEY ("articleHistoryVersionEntry") REFERENCES "public"."articleHistoryVersionEntry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleHistoryVersionEntryLinker" ADD CONSTRAINT "articleHistoryVersionEntryLinker_articleHistoryVersion_articleHistoryVersion_id_fk" FOREIGN KEY ("articleHistoryVersion") REFERENCES "public"."articleHistoryVersion"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleBkTreeEdge" ADD CONSTRAINT "articleBkTreeEdge_parentNode_articleBkTreeNode_id_fk" FOREIGN KEY ("parentNode") REFERENCES "public"."articleBkTreeNode"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleBkTreeEdge" ADD CONSTRAINT "articleBkTreeEdge_childNode_articleBkTreeNode_id_fk" FOREIGN KEY ("childNode") REFERENCES "public"."articleBkTreeNode"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleBkTreeNode" ADD CONSTRAINT "articleBkTreeNode_article_article_id_fk" FOREIGN KEY ("article") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleHistoryVersion" ADD CONSTRAINT "articleHistoryVersion_article_article_id_fk" FOREIGN KEY ("article") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleHistoryVersion" ADD CONSTRAINT "articleHistoryVersion_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignmentComment" ADD CONSTRAINT "assignmentComment_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courseMessage" ADD CONSTRAINT "courseMessage_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courseMessageComment" ADD CONSTRAINT "courseMessageComment_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;