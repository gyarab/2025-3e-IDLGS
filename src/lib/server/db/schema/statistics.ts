
import { pgTable, text, integer, timestamp, check } from 'drizzle-orm/pg-core';

export const statistics = pgTable('statistics', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	begin: timestamp('begin').notNull().$defaultFn(() => new Date()),
	end: timestamp('end').notNull().$defaultFn(() => new Date()),
	coursesCreated: integer('coursesCreated').notNull().default(0),
	coursesDeleted: integer('coursesDeleted').notNull().default(0),
	textbooksCreated: integer('textbooksCreated').notNull().default(0),
	textbooksDeleted: integer('textbooksDeleted').notNull().default(0),
	textbookQuestionsCreated: integer('textbookQuestionsCreated').notNull().default(0),
	textbookQuestionsReported: integer('textbookQuestionsReported').notNull().default(0),
	courseQuestionsCreated: integer('courseQuestionsCreated').notNull().default(0),
	// ai generated questions that got deleted by teachers
	courseQuestionsReported: integer('courseQuestionsReported').notNull().default(0),
	usersVerified: integer('usersVerified').notNull().default(0),
});