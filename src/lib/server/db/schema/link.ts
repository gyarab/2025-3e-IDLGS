import { pgTable, integer, boolean } from 'drizzle-orm/pg-core';
import { user } from './user';
import { course } from './course';
import { textbook } from './textbook';

export const userCourseLinker = pgTable('userCourseLinker', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	teacher: boolean('teacher').notNull().default(false),
	course: integer('course')
		.references(() => course.id)
		.notNull(),
	user: integer('user')
		.references(() => user.id)
		.notNull(),
});

export const userTextbookLinker = pgTable('userTextbookLinker', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	editor: boolean('editor').notNull().default(false),
	owner: boolean('owner').notNull().default(false),
	textbook: integer('textbook')
		.references(() => textbook.id)
		.notNull(),
	user: integer('user')
		.references(() => user.id)
		.notNull(),
});
