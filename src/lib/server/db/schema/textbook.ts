import {
	pgTable,
	text,
	integer,
	timestamp,
	check,
	boolean,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const textbook = pgTable(
	'textbook',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
		uuid: text('uuid')
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
		name: text('name').notNull().default(''),
		description: text('description').notNull().default(''),
		summary: text('summary').notNull().default(''),
		red: integer('red').notNull().default(255),
		green: integer('green').notNull().default(255),
		blue: integer('blue').notNull().default(255),
		createdAt: timestamp('createdAt')
			.notNull()
			.$defaultFn(() => new Date()),
		modifiedAt: timestamp('modifiedAt')
			.notNull()
			.$defaultFn(() => new Date()),
		subject: text('subject').notNull(),
		public: boolean('public').notNull().default(false),
		archived: boolean('archived').notNull().default(false),
	},
	(table) => [
		check('redMinCheck', sql`${table.red} >= 0`),
		check('redMaxCheck', sql`${table.red} <= 255`),
		check('greenMinCheck', sql`${table.green} >= 0`),
		check('greenMaxCheck', sql`${table.green} <= 255`),
		check('blueMinCheck', sql`${table.blue} >= 0`),
		check('blueMaxCheck', sql`${table.blue} <= 255`),
	],
);

export const chapter = pgTable('chapter', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	summary: text('summary').notNull(),
	textbook: integer('textbook')
		.references(() => textbook.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	order: integer('order').notNull().default(0),
});

export const article = pgTable('article', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	chapter: integer('chapter')
		.references(() => chapter.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	name: text('name').notNull(),
	text: text('text').notNull(),
	order: integer('order').notNull().default(0),
});

export const textbookWordDefinition = pgTable('textbookWordDefinition', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	word: text('word').notNull(),
	description: text('description').notNull(),
	textbook: integer('textbook')
		.references(() => textbook.id, { onDelete: 'cascade' })
		.notNull(),
});
