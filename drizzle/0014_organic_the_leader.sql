CREATE TABLE "privacyPolicy" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "privacyPolicy_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" text NOT NULL,
	"lang" text NOT NULL,
	"modifiedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "termsOfUse" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "termsOfUse_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" text NOT NULL,
	"lang" text NOT NULL,
	"modifiedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "textbookWordDefinition" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "textbookWordDefinition_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"word" text NOT NULL,
	"description" text NOT NULL
);
