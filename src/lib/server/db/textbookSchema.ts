import {
	pgTable,
	serial,
	integer,
	text,
	boolean,
	check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { resource } from './userSchema';

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

export const articleResource = pgTable('articleResource', {
	id: serial('id').primaryKey(),
	articleId: integer('articleId')
		.notNull()
		.references(() => article.id),
	resourceId: integer('resourceId')
		.notNull()
		.references(() => resource.id),
});

export const question = pgTable('question', {
	id: serial('id').primaryKey(),
	articleId: integer('articleId')
		.notNull()
		.references(() => article.id),
});
