import {
	pgTable,
	serial,
	integer,
	text,
	timestamp,
	boolean,
	check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	username: text('username').notNull(),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	middlename: text('middlename').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	iterations: integer('iterations').notNull(),
	salt: text('salt').notNull(),
	registeredAt: timestamp('registeredAt').notNull().defaultNow(),
	firstLogin: boolean('firstLogin').notNull().default(true),
	playedTextbookTutorial: boolean('playedTextbookTutorial')
		.notNull()
		.default(false),
	playedLibraryTutorial: boolean('playedLibraryTutorial')
		.notNull()
		.default(false),
	playedGalleryTutorial: boolean('playedGalleryTutorial')
		.notNull()
		.default(false),
	degree: text('degree').notNull().default('none'),
	institution: text('institution').notNull().default('none'),
	profilePicture: integer('profilePicture').references(() => resource.id),
	description: text('description').notNull().default(''),
	lastSeenAt: timestamp('lastSeenAt').notNull().defaultNow(),
});

export const resource = pgTable('resource', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	url: text('url').notNull(),
	//VID / IMG / PDF / TXT / LNK
	type: text('type').notNull(),
});

export const textbook = pgTable(
	'textbook',
	{
		id: serial('id').primaryKey(),
		title: text('title').notNull(),
		r: integer('r').notNull().default(0),
		g: integer('g').notNull().default(0),
		b: integer('b').notNull().default(0),
		//TODO setting
		noAiQuestions: boolean('noAIQuestions').notNull().default(false),
	},
	(table) => [
		check('r', sql`${table.r} >= 0 AND ${table.r} <= 255`),
		check('g', sql`${table.g} >= 0 AND ${table.g} <= 255`),
		check('b', sql`${table.b} >= 0 AND ${table.b} <= 255`),
	],
);

export const chapter = pgTable('chapter', {
	id: serial('id').primaryKey(),
	textbookId: integer('textbookId')
		.notNull()
		.references(() => textbook.id),
});

export const article = pgTable('article', {
	id: serial('id').primaryKey(),
	chapterId: integer('chapterId')
		.notNull()
		.references(() => chapter.id),
});

export const question = pgTable('question', {
	id: serial('id').primaryKey(),
	articleId: integer('articleId')
		.notNull()
		.references(() => article.id),
});

export const exercise = pgTable('exercise', {
	id: serial('id').primaryKey(),
	/*
	- CRS crossword
	- IMG match in image
	- GRP graphs of functions, items
	- GEO geometry problems
	- PRG client-side programming problems
	*/
	type: text('type').notNull(),
	description: text('description').notNull(),
	attempts: integer('attempts').notNull().default(0),
	success: integer('success').notNull().default(0),
	image: integer('image').references(() => resource.id),
});
