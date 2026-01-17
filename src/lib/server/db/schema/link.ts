import { pgTable, integer, boolean } from 'drizzle-orm/pg-core';
import { user } from './user';
import { course } from './course';
import { textbook } from './textbook';

export const userCourseLinker = pgTable('userCourseLinker', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	teacher: boolean('teacher').notNull().default(false),
	course: integer('course')
		.references(() => course.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	user: integer('user')
		.references(() => user.id, {
			onDelete: 'cascade',
		})
		.notNull(),
});

export const userTextbookLinker = pgTable('userTextbookLinker', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	editor: boolean('editor').notNull().default(false),
	owner: boolean('owner').notNull().default(false),
	textbook: integer('textbook')
		.references(() => textbook.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	user: integer('user')
		.references(() => user.id, {
			onDelete: 'cascade',
		})
		.notNull(),
});

export const userAssignmentLinker = pgTable('userAssignmentLinker', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	completed: boolean('completed').notNull().default(false),
	courseAssignment: integer('courseAssignment')
		.references(() => course.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	user: integer('user')
		.references(() => user.id, {
			onDelete: 'cascade',
		})
		.notNull(),
});
