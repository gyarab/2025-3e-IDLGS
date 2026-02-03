CREATE TABLE "model" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "model_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text DEFAULT '' NOT NULL,
	"data" "bytea" NOT NULL,
	"article" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "model" ADD CONSTRAINT "model_article_article_id_fk" FOREIGN KEY ("article") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;