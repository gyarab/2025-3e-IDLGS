/*
	db/schema.ts
	Martin Bykov
*/

import {
	pgTable,
	text,
	integer,
	timestamp,
	date,
	boolean,
	bigint,
	check
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	uuid: text("uuid").notNull().$defaultFn(() => crypto.randomUUID()),
	password: text("password").notNull().default(""),
	iterations: integer("iterations").notNull().default(0),
	salt: text("salt").notNull().default(""),
	createdAt: timestamp("createdAt").notNull().$defaultFn(() => new Date()),
	birthday: date("birthday").notNull().$defaultFn(() => `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`),
	lang: text("lang").notNull().default("en"),
	streak: integer("streak").notNull().default(0),
	verified: boolean("verified").notNull().default(false),
	extended: boolean("extended").notNull().default(false),
	admin: boolean("admin").notNull().default(false),
});

export const userVerification = pgTable("userVerification", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	uuid: text("uuid").notNull().$defaultFn(() => crypto.randomUUID()),
	user: integer("user").references(() => user.id).notNull()
});

export const userSession = pgTable("userSession", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	token: text("token").notNull().$defaultFn(() => crypto.randomUUID()),
	user: integer("user").references(() => user.id).notNull()
});

//only for admin
export const blog = pgTable("blog", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	text: text("text").notNull().default(""),
	author: integer("user").references(() => user.id).notNull(),
});

export const grade = pgTable("grade", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	percenage: integer("percenage").notNull().default(0),
	course: integer("course").references(() => course.id).notNull(),
	user: integer("user").references(() => user.id).notNull()
}, (table) => [
	check("percentageMin", sql`${table.percenage} > 0`),
	check("percentageMax", sql`${table.percenage} <= 100`),
]);

export const percentageGradeValue = pgTable("percentageGradeValue", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	course: integer("course").references(() => course.id).notNull(),
	min: integer("min").notNull().default(0),
	max: integer("max").notNull().default(0),
}, (table) => [
	check("percentageMin", sql`${table.min} >= 0`),
	check("percentageMax", sql`${table.min} <= 100`),
]);

export const course = pgTable("course", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: text("name").notNull().default(""),
	surname: text("surname").notNull().default(""),
	textbook: integer("textbook").notNull().references(() => textbook.id),
	createdAt: timestamp("createdAt").notNull().$defaultFn(() => new Date()),
	modifiedAt: timestamp("modifiedAt").notNull().$defaultFn(() => new Date()),
});

export const textbook = pgTable("textbook", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	uuid: text("uuid").notNull().$defaultFn(() => crypto.randomUUID()),
	description: text("description").notNull().default(""),
	summary: text("summary").notNull().default(""),
	createdAt: timestamp("createdAt").notNull().$defaultFn(() => new Date()),
	modifiedAt: timestamp("modifiedAt").notNull().$defaultFn(() => new Date()),
});

export const userCourseLinker = pgTable("userCourseLinker", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	teacher: boolean("teacher").notNull().default(false),
	course: integer("course").references(() => course.id).notNull(),
	user: integer("user").references(() => user.id).notNull(),
});

export const userTextbookLinker = pgTable("userCourseLinker", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	editor: boolean("editor").notNull().default(false),
	owner: boolean("owner").notNull().default(false),
	textbook: integer("textbook").references(() => textbook.id).notNull(),
	user: integer("user").references(() => user.id).notNull(),
});

export const assignment = pgTable("assignment", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	deadline: timestamp("deadline").notNull().$defaultFn(() => new Date()),
});

export const assignmentComment = pgTable("assignmentComment", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	assignment: integer("assignment").references(() => assignment.id).notNull(),
	createdAt: timestamp("createdAt").notNull().$defaultFn(() => new Date()),
	comment: text("comment").notNull().default("")
});

export const question = pgTable("question", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	//QuestionTypeEnum
	type: integer("type").notNull().default(-1),
	question: text("answer").notNull().default(""),
	answer: text("answer").notNull().default(""),
	name: text("name").notNull().default(""),
	course: integer("course").references(() => course.id).notNull(),
});

export const courseCodes = pgTable("courseCode", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	expiresAt: timestamp("expiresAt").notNull().$defaultFn(() => new Date()),
	usesRemaining: integer("usesRemaining").notNull().default(0),
	infinite: boolean("infinite").notNull().default(false),
	course: integer("course").references(() => course.id).notNull(),
});

export const image = pgTable("image", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	uuid: text("uuid").notNull().$defaultFn(() => crypto.randomUUID()),
	link: text("link").notNull().default(""),
	alt: text("alt").notNull().default(""),
});

export const chapter = pgTable("chapter", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	uuid: text("uuid").notNull().$defaultFn(() => crypto.randomUUID()),
	textbook: integer("textbook").references(() => textbook.id).notNull(),
});

export const article = pgTable("article", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	uuid: text("uuid").notNull().$defaultFn(() => crypto.randomUUID()),
	chapter: integer("chapter").references(() => chapter.id).notNull(),
});

export const audio = pgTable("article", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	uuid: text("uuid").notNull().$defaultFn(() => crypto.randomUUID()),
});

export const interactiveElement = pgTable("interactiveElement", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	uuid: text("uuid").notNull().$defaultFn(() => crypto.randomUUID()),
	rawData: text("rawData").notNull().default(""),
});

export const setting = pgTable("setting", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	key: text("key").notNull().default(""),
	value: text("value").notNull().default(""),
});