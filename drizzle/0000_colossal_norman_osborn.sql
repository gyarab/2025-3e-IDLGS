CREATE TABLE "exercise" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"success" integer DEFAULT 0 NOT NULL,
	"thumbnail" integer,
	"crosswordDataId" integer,
	"crs" integer,
	"crw" integer,
	"def" integer,
	"grp" integer,
	"geo" integer,
	"ext" integer,
	"backgroundColorR" integer DEFAULT 255 NOT NULL,
	"backgroundColorG" integer DEFAULT 255 NOT NULL,
	"backgroundColorB" integer DEFAULT 255 NOT NULL,
	"foregroundColorR" integer DEFAULT 0 NOT NULL,
	"foregroundColorG" integer DEFAULT 0 NOT NULL,
	"foregroundColorB" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "exercise_id_unique" UNIQUE("id"),
	CONSTRAINT "type" CHECK ("exercise"."type" IN ('CRS', 'CRW', 'DEF', 'GRP', 'GEO', 'EXT')),
	CONSTRAINT "exerciseTypeData" CHECK ((type = 'CRS' AND crs IS NOT NULL AND crosswordDataId IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'CRW' AND crw IS NOT NULL AND crosswordDataId IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'DEF' AND def IS NOT NULL AND crosswordDataId IS NULL AND crs IS NULL AND crw IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'GRP' AND grp IS NOT NULL AND crosswordDataId IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND geo IS NULL AND ext IS NULL) OR
			(type = 'GEO' AND geo IS NOT NULL AND crosswordDataId IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND grp IS NULL AND ext IS NULL) OR
			(type = 'EXT' AND ext IS NOT NULL AND crosswordDataId IS NULL AND crs IS NULL AND crw IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL) OR
			(type = 'CRW' AND crosswordDataId IS NOT NULL AND crs IS NULL AND def IS NULL AND grp IS NULL AND geo IS NULL AND ext IS NULL)
			),
	CONSTRAINT "colorValues" CHECK ((backgroundColorR >= 0 AND backgroundColorR <= 255) AND
			(backgroundColorG >= 0 AND backgroundColorG <= 255) AND
			(backgroundColorB >= 0 AND backgroundColorB <= 255) AND
			(foregroundColorR >= 0 AND foregroundColorR <= 255) AND
			(foregroundColorG >= 0 AND foregroundColorG <= 255) AND
			(foregroundColorB >= 0 AND foregroundColorB <= 255))
);
--> statement-breakpoint
CREATE TABLE "exerciseCRS" (
	"id" serial PRIMARY KEY NOT NULL,
	"offsets" integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
	"columnId" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "exerciseCRS_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exerciseCRW" (
	"id" serial PRIMARY KEY NOT NULL,
	"xStarts" integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
	"yStarts" integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
	"directions" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"xIds" integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
	"yIds" integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
	CONSTRAINT "exerciseCRW_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exerciseCrossword" (
	"id" serial PRIMARY KEY NOT NULL,
	"solution" text,
	"words" text[] DEFAULT ARRAY[]::text[],
	"descriptions" text[] DEFAULT ARRAY[]::text[],
	"clue" text[] DEFAULT ARRAY[]::text[],
	CONSTRAINT "exerciseCrossword_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exerciseDefinitions" (
	"id" serial PRIMARY KEY NOT NULL,
	CONSTRAINT "exerciseDefinitions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exerciseEmbed" (
	"id" serial PRIMARY KEY NOT NULL,
	"link" text NOT NULL,
	CONSTRAINT "exerciseEmbed_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exerciseGeometry" (
	"id" serial PRIMARY KEY NOT NULL,
	CONSTRAINT "exerciseGeometry_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exerciseGraph" (
	"id" serial PRIMARY KEY NOT NULL,
	CONSTRAINT "exerciseGraph_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exerciseGraphFunction" (
	"id" serial PRIMARY KEY NOT NULL,
	"latex" text NOT NULL,
	CONSTRAINT "exerciseGraphFunction_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exerciseResource" (
	"id" serial PRIMARY KEY NOT NULL,
	"exerciseId" integer NOT NULL,
	"resourceId" integer NOT NULL,
	CONSTRAINT "exerciseResource_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "article" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" text NOT NULL,
	"textCompressed" text NOT NULL,
	"chapterId" integer NOT NULL,
	"textbookId" integer NOT NULL,
	CONSTRAINT "article_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "articleHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"articleId" integer NOT NULL,
	"userId" integer NOT NULL,
	"textCompressed" text NOT NULL,
	"visitedAt" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articleResource" (
	"id" serial PRIMARY KEY NOT NULL,
	"articleId" integer NOT NULL,
	"resourceId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chapter" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" text NOT NULL,
	"textbookId" integer NOT NULL,
	CONSTRAINT "chapter_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"articleId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "textbook" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"r" integer DEFAULT 0 NOT NULL,
	"g" integer DEFAULT 0 NOT NULL,
	"b" integer DEFAULT 0 NOT NULL,
	"educationLevel" integer DEFAULT 0 NOT NULL,
	"lastEditedAt" timestamp NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"uuid" text NOT NULL,
	CONSTRAINT "textbook_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "r" CHECK ("textbook"."r" >= 0 AND "textbook"."r" <= 255),
	CONSTRAINT "g" CHECK ("textbook"."g" >= 0 AND "textbook"."g" <= 255),
	CONSTRAINT "b" CHECK ("textbook"."b" >= 0 AND "textbook"."b" <= 255)
);
--> statement-breakpoint
CREATE TABLE "textbookUserLinker" (
	"id" serial PRIMARY KEY NOT NULL,
	"textbookId" integer NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text DEFAULT '' NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"surname" text NOT NULL,
	"middlename" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"iterations" integer NOT NULL,
	"salt" text NOT NULL,
	"registeredAt" timestamp DEFAULT now() NOT NULL,
	"firstLogin" boolean DEFAULT true NOT NULL,
	"playedTextbookTutorial" boolean DEFAULT false NOT NULL,
	"playedLibraryTutorial" boolean DEFAULT false NOT NULL,
	"playedGalleryTutorial" boolean DEFAULT false NOT NULL,
	"degree" text,
	"institution" text,
	"profilePicture" integer,
	"description" text DEFAULT '' NOT NULL,
	"lastSeenAt" timestamp DEFAULT now() NOT NULL,
	"uuid" text NOT NULL,
	CONSTRAINT "user_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_thumbnail_resource_id_fk" FOREIGN KEY ("thumbnail") REFERENCES "public"."resource"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_crosswordDataId_exerciseCrossword_id_fk" FOREIGN KEY ("crosswordDataId") REFERENCES "public"."exerciseCrossword"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_crs_exerciseCRS_id_fk" FOREIGN KEY ("crs") REFERENCES "public"."exerciseCRS"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_crw_exerciseCRW_id_fk" FOREIGN KEY ("crw") REFERENCES "public"."exerciseCRW"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_def_exerciseDefinitions_id_fk" FOREIGN KEY ("def") REFERENCES "public"."exerciseDefinitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_grp_exerciseGraph_id_fk" FOREIGN KEY ("grp") REFERENCES "public"."exerciseGraph"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_geo_exerciseGeometry_id_fk" FOREIGN KEY ("geo") REFERENCES "public"."exerciseGeometry"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_ext_exerciseEmbed_id_fk" FOREIGN KEY ("ext") REFERENCES "public"."exerciseEmbed"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exerciseResource" ADD CONSTRAINT "exerciseResource_exerciseId_exercise_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exerciseResource" ADD CONSTRAINT "exerciseResource_resourceId_resource_id_fk" FOREIGN KEY ("resourceId") REFERENCES "public"."resource"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_chapterId_chapter_id_fk" FOREIGN KEY ("chapterId") REFERENCES "public"."chapter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_textbookId_textbook_id_fk" FOREIGN KEY ("textbookId") REFERENCES "public"."textbook"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleHistory" ADD CONSTRAINT "articleHistory_articleId_article_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."article"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleHistory" ADD CONSTRAINT "articleHistory_userId_resource_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."resource"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleResource" ADD CONSTRAINT "articleResource_articleId_article_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."article"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articleResource" ADD CONSTRAINT "articleResource_resourceId_resource_id_fk" FOREIGN KEY ("resourceId") REFERENCES "public"."resource"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_textbookId_textbook_id_fk" FOREIGN KEY ("textbookId") REFERENCES "public"."textbook"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_articleId_article_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."article"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "textbookUserLinker" ADD CONSTRAINT "textbookUserLinker_textbookId_textbook_id_fk" FOREIGN KEY ("textbookId") REFERENCES "public"."textbook"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "textbookUserLinker" ADD CONSTRAINT "textbookUserLinker_userId_resource_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."resource"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_profilePicture_resource_id_fk" FOREIGN KEY ("profilePicture") REFERENCES "public"."resource"("id") ON DELETE set null ON UPDATE no action;