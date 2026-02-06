import {
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
	check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { user } from './user';
import { textbook } from './textbook';

export const grade = pgTable(
	'grade',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
		percentage: integer('percentage').notNull().default(0),
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
		assignment: integer('assignment').references(() => assignment.id, {
			onDelete: 'cascade',
		}),
		// can be null
	},
	(table) => [
		check('percentageMin', sql`${table.percentage} > 0`),
		check('percentageMax', sql`${table.percentage} <= 100`),
	],
);

export const percentageGradeValue = pgTable(
	'percentageGradeValue',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
		course: integer('course')
			.references(() => course.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		min: integer('min').notNull().default(0),
		max: integer('max').notNull().default(0),
		name: text('name').notNull(),
	},
	(table) => [
		check('percentageMin', sql`${table.min} >= 0`),
		check('percentageMax', sql`${table.min} <= 100`),
	],
);

export const course = pgTable(
	'course',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
		name: text('name').notNull().default(''),
		description: text('description').notNull().default(''),
		subject: text('subject').notNull().default(''),
		textbook: integer('textbook')
			.notNull()
			.references(() => textbook.id, {
				onDelete: 'cascade',
			}),
		createdAt: timestamp('createdAt')
			.notNull()
			.$defaultFn(() => new Date()),
		modifiedAt: timestamp('modifiedAt')
			.notNull()
			.$defaultFn(() => new Date()),
		red: integer('red').notNull().default(255),
		green: integer('green').notNull().default(255),
		blue: integer('blue').notNull().default(255),
		uuid: text('uuid')
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
		archived: boolean('archived').notNull().default(false),
		treatLateAsAbsence: boolean('treatLateAsAbsence').notNull().default(false),
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

export const assignment = pgTable('assignment', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	deadline: timestamp('deadline')
		.notNull()
		.$defaultFn(() => new Date()),
	createdAt: timestamp('createdAt')
		.notNull()
		.$defaultFn(() => new Date()),
	modifiedAt: timestamp('modifiedAt')
		.notNull()
		.$defaultFn(() => new Date()),
	course: integer('course')
		.references(() => course.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	title: text('title').notNull().default(''),
	description: text('description').notNull().default(''),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	author: integer('author').references(() => user.id, {
		onDelete: 'set null',
	}),
});

export const assignmentComment = pgTable('assignmentComment', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	assignment: integer('assignment')
		.references(() => assignment.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	createdAt: timestamp('createdAt')
		.notNull()
		.$defaultFn(() => new Date()),
	comment: text('comment').notNull().default(''),
	author: integer('author').references(() => user.id, {
		onDelete: 'set null',
	}),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});

export const courseMessage = pgTable('courseMessage', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	course: integer('course')
		.references(() => course.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	createdAt: timestamp('createdAt')
		.notNull()
		.$defaultFn(() => new Date()),
	content: text('content').notNull().default(''),
	author: integer('author').references(() => user.id, {
		onDelete: 'set null',
	}),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});

export const courseMessageComment = pgTable('courseMessageComment', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	courseMessage: integer('courseMessage')
		.references(() => courseMessage.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	createdAt: timestamp('createdAt')
		.notNull()
		.$defaultFn(() => new Date()),
	comment: text('comment').notNull().default(''),
	author: integer('author').references(() => user.id, {
		onDelete: 'set null',
	}),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});

export const question = pgTable('question', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	//AIGenerationQuestionType
	type: text('type').notNull().default(''),
	question: text('answer').notNull().default(''),
	answer: text('answer').notNull().default(''),
	course: integer('course')
		.references(() => course.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	//allowed only if AI generated
	reportCount: integer('reportCount').notNull().default(0),
	ai: boolean('ai').notNull().default(false),
	//aiTextRepresentation - source text where AI took info from
	aitr: text('aitr').notNull().default(''),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});

export const courseCodes = pgTable('courseCode', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	expiresAt: timestamp('expiresAt')
		.notNull()
		.$defaultFn(() => new Date()),
	usesRemaining: integer('usesRemaining').notNull().default(0),
	infinite: boolean('infinite').notNull().default(false),
	course: integer('course')
		.references(() => course.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	code: text('code').notNull(),
});

//definition of lesson time
export const courseLessonTemplate = pgTable('courseLessonTemplate', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	startTime: timestamp('startTime')
		.notNull()
		.$defaultFn(() => new Date()),
	endTime: timestamp('endTime')
		.notNull()
		.$defaultFn(() => new Date()),
	additionalNote: text('additionalNote').notNull().default(''),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});

//single lesson in course
export const courseLesson = pgTable('courseLesson', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	course: integer('course')
		.references(() => course.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	title: text('title').notNull().default(''),
	note: text('note').notNull().default(''),
	order: integer('order').notNull().default(0),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});