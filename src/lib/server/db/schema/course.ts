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
			.references(() => course.id)
			.notNull(),
		user: integer('user')
			.references(() => user.id)
			.notNull(),
		assignment: integer('assignment').references(() => assignment.id),
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
			.references(() => course.id)
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
			.references(() => textbook.id),
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
	course: integer('course')
		.references(() => course.id)
		.notNull(),
	title: text('title').notNull().default(''),
	description: text('description').notNull().default(''),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});

export const assignmentComment = pgTable('assignmentComment', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	assignment: integer('assignment')
		.references(() => assignment.id)
		.notNull(),
	createdAt: timestamp('createdAt')
		.notNull()
		.$defaultFn(() => new Date()),
	comment: text('comment').notNull().default(''),
	author: integer('author')
		.notNull()
		.references(() => user.id),
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
	name: text('name').notNull().default(''),
	course: integer('course')
		.references(() => course.id)
		.notNull(),
	reportCount: integer('reportCount').notNull().default(0),
	ai: boolean('ai').notNull().default(false),
	//aiTextRepresentation
	aitr: text('aitr').notNull().default(''),
});

export const courseCodes = pgTable('courseCode', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	expiresAt: timestamp('expiresAt')
		.notNull()
		.$defaultFn(() => new Date()),
	usesRemaining: integer('usesRemaining').notNull().default(0),
	infinite: boolean('infinite').notNull().default(false),
	course: integer('course')
		.references(() => course.id)
		.notNull(),
});
