CREATE TABLE "statistics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "statistics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"begin" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"coursesCreated" integer DEFAULT 0 NOT NULL,
	"coursesDeleted" integer DEFAULT 0 NOT NULL,
	"textbooksCreated" integer DEFAULT 0 NOT NULL,
	"textbooksDeleted" integer DEFAULT 0 NOT NULL,
	"textbookQuestionsCreated" integer DEFAULT 0 NOT NULL,
	"textbookQuestionsReported" integer DEFAULT 0 NOT NULL,
	"courseQuestionsCreated" integer DEFAULT 0 NOT NULL,
	"courseQuestionsReported" integer DEFAULT 0 NOT NULL,
	"usersVerified" integer DEFAULT 0 NOT NULL
);
