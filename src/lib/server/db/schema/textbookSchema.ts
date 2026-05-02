import {
	pgTable,
	serial,
	integer,
	text,
	boolean,
	check,
	timestamp,
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
		//education level according to ISCED
		//https://iqa.international/isced-levels/
		educationLevel: integer().notNull().default(0),
		lastEditedAt: timestamp('lastEditedAt')
			.notNull()
			.$defaultFn(() => new Date()),
		description: text('description').notNull().default(''),
		uuid: text('uuid')
			.notNull()
			.unique()
			.$defaultFn(() => crypto.randomUUID()),
	},
	(table) => [
		check('r', sql`${table.r} >= 0 AND ${table.r} <= 255`),
		check('g', sql`${table.g} >= 0 AND ${table.g} <= 255`),
		check('b', sql`${table.b} >= 0 AND ${table.b} <= 255`),
		check(
			'isced',
			sql`${table.educationLevel} >= 0 AND ${table.educationLevel} <= 8`,
		),
	],
);

export const textbookResourceLinker = pgTable('textbookResourceLinker', {
	id: serial('id').primaryKey(),
	textbookId: integer('textbookId')
		.notNull()
		.references(() => textbook.id, { onDelete: 'cascade' }),
	resourceId: integer('resourceId')
		.notNull()
		.references(() => resource.id, { onDelete: 'cascade' }),
});

export const textbookUserLinker = pgTable('textbookUserLinker', {
	id: serial('id').primaryKey(),
	textbookId: integer('textbookId')
		.notNull()
		.references(() => textbook.id, { onDelete: 'cascade' }),
	userId: integer('userId')
		.notNull()
		.references(() => resource.id, { onDelete: 'cascade' }),
});

export const chapter = pgTable('chapter', {
	id: serial('id').primaryKey(),
	uuid: text('uuid')
		.notNull()
		.unique()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	order: integer('order').notNull().default(0),
	textbookId: integer('textbookId')
		.notNull()
		.references(() => textbook.id),
});

export const article = pgTable('article', {
	id: serial('id').primaryKey(),
	uuid: text('uuid')
		.notNull()
		.unique()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	order: integer('order').notNull().default(0),
	textCompressed: text('textCompressed').notNull(),
	chapterId: integer('chapterId')
		.notNull()
		.references(() => chapter.id),
	textbookId: integer('textbookId')
		.notNull()
		.references(() => textbook.id),
});

export const articleHistory = pgTable('articleHistory', {
	id: serial('id').primaryKey(),
	articleId: integer('articleId')
		.notNull()
		.references(() => article.id),
	userId: integer('userId')
		.notNull()
		.references(() => resource.id),
	textCompressed: text('textCompressed').notNull(),
	visitedAt: integer('visitedAt').notNull(),
});

export const question = pgTable('question', {
	id: serial('id').primaryKey(),
	articleId: integer('articleId')
		.notNull()
		.references(() => article.id),
});
