import { pgTable, integer, boolean, numeric, text } from 'drizzle-orm/pg-core';
import { user } from './user';
import { course, courseLesson } from './course';
import {
	articleHistoryVersion,
	articleHistoryVersionEntry,
	textbook,
} from './textbook';
import { dailyChallenges } from './misc';

export const userCourseLinker = pgTable('userCourseLinker', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	teacher: boolean('teacher').notNull().default(false),
	owner: boolean('owner').notNull().default(false),
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
	dekEncrypted: text('dekEncrypted')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
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
	readProgress: numeric('readProgress').notNull().default('0'),
	dekEncrypted: text('dekEncrypted')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
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

export const userDailyChallengeLinker = pgTable('userDailyChallengeLinker', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	dailyChallenge: integer('dailyChallenge')
		.references(() => dailyChallenges.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	user: integer('user')
		.references(() => user.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	completed: boolean('completed').notNull().default(false),
});

export const articleHistoryVersionEntryLinker = pgTable(
	'articleHistoryVersionEntryLinker',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
		articleHistoryVersionEntry: integer('articleHistoryVersionEntry')
			.references(() => articleHistoryVersionEntry.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		articleHistoryVersion: integer('articleHistoryVersion')
			.references(() => articleHistoryVersion.id, {
				onDelete: 'cascade',
			})
			.notNull(),
	},
);

export const userCourseLessonLinker = pgTable('userCourseLessonLinker', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	courseLesson: integer('courseLesson')
		.references(() => courseLesson.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	user: integer('user')
		.references(() => user.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	present: boolean('present').notNull().default(false),
	late: boolean('late').notNull().default(false),
	earlyLeave: boolean('earlyLeave').notNull().default(false),
	excused: boolean('excused').notNull().default(false),
	locked: boolean('locked').notNull().default(false),
	uncountable: boolean('uncountable').notNull().default(false),
	distance: boolean('distance').notNull().default(false),
});
