import {
	pgTable,
	text,
	integer,
	timestamp,
	check,
	boolean,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { user } from './user';

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
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});

export const bookmark = pgTable(
	'bookmark',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
		user: integer('user')
			.references(() => user.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		article: integer('article')
			.references(() => article.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		red: integer('red').notNull().default(255),
		green: integer('green').notNull().default(255),
		blue: integer('blue').notNull().default(0),
		//TODO move on article edit! (calc diff or something)
		textIndex: integer('textIndex').notNull().default(0),
		uuid: text('uuid')
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
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

export const highlight = pgTable(
	'highlight',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
		user: integer('user')
			.references(() => user.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		article: integer('article')
			.references(() => article.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		red: integer('red').notNull().default(255),
		green: integer('green').notNull().default(255),
		blue: integer('blue').notNull().default(0),
		//TODO move and resize on article edit! (calc diff or something)
		//if whole text between start/end deleted -> remove
		//if text between start/end modified -> shift end by amount of change
		//if text changed before highlight -> shift both start/end by that amount
		//if text changed after highlight -> do nothing
		//this can be combined, TODO
		startIndex: integer('startIndex').notNull().default(0),
		endIndex: integer('endIndex').notNull().default(0),
		uuid: text('uuid')
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
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

//article history
//rollback painful but not needed often
export const articleHistoryVersion = pgTable('articleHistoryVersion', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	article: integer('article')
		.references(() => article.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	user: integer('user').references(() => user.id, {
		onDelete: 'set null',
	}),
	editedAt: timestamp('editedAt')
		.notNull()
		.$defaultFn(() => new Date()),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	note: text('note').notNull().default(''),
});

export const articleHistoryVersionEntry = pgTable(
	'articleHistoryVersionEntry',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
		startIndex: integer('startIndex').notNull().default(0),
		oldText: text('oldText').notNull().default(''),
		newText: text('newText').notNull().default(''),
	},
);
