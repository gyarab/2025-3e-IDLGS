CREATE TABLE "company" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "company_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text DEFAULT '' NOT NULL,
	"address" text DEFAULT '' NOT NULL,
	"note" text DEFAULT '' NOT NULL,
	"descriptor" text DEFAULT '' NOT NULL,
	"responsiblePerson" text DEFAULT '' NOT NULL,
	"publicKey" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "productKey" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "productKey_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" text NOT NULL,
	"used" boolean DEFAULT false NOT NULL,
	"expires" timestamp NOT NULL,
	"school" integer
);
--> statement-breakpoint
CREATE TABLE "purchase" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "purchase_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user" integer,
	"merchant" integer,
	"note" text DEFAULT '' NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"currency" text DEFAULT 'CZK' NOT NULL,
	"time" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "setting" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "setting" CASCADE;--> statement-breakpoint
ALTER TABLE "school" ADD COLUMN "address" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "school" ADD COLUMN "note" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "school" ADD COLUMN "descriptor" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "school" ADD COLUMN "responsiblePerson" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "school" ADD COLUMN "setup" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "school" ADD COLUMN "publicKey" text NOT NULL;--> statement-breakpoint
ALTER TABLE "userCourseLinker" ADD COLUMN "dekEncrypted" text NOT NULL;--> statement-breakpoint
ALTER TABLE "userTextbookLinker" ADD COLUMN "dekEncrypted" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "parentEmail1" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "parentEmail2" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "publicKey" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "schoolTeacher" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "schoolDirector" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "school" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "productKey" ADD CONSTRAINT "productKey_school_school_id_fk" FOREIGN KEY ("school") REFERENCES "public"."school"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_merchant_company_id_fk" FOREIGN KEY ("merchant") REFERENCES "public"."company"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_school_school_id_fk" FOREIGN KEY ("school") REFERENCES "public"."school"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school" DROP COLUMN "productkey";