import { pgTable, serial, integer, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const resource = pgTable('resource', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	url: text('url').notNull(),
});

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
	registeredAt: timestamp('registered_at').notNull().defaultNow(),

});

export const textbook = pgTable('textbook', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	//TODO setting
	noAiQuestions: boolean('noAIQuestions').notNull().default(false),
});

export const chapter = pgTable('chapter', {
	id: serial('id').primaryKey(),
	textbookId: integer('textbookId').notNull().references(() => textbook.id),
});

export const article = pgTable('article', {
	id: serial('id').primaryKey(),
	chapterId: integer('chapterId').notNull().references(() => chapter.id),
});

export const questions = pgTable('questions', {
	id: serial('id').primaryKey(),
	articleId: integer('articleId').notNull().references(() => article.id),
});