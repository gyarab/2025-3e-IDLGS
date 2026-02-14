import {
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
} from 'drizzle-orm/pg-core';
import { user } from './user';

export const school = pgTable('school', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	name: text('name').notNull().default(''),
	address: text('address').notNull().default(''),
	note: text('note').notNull().default(''),
	descriptor: text('descriptor').notNull().default(''),
	responsiblePerson: text('responsiblePerson').notNull().default(''),
	//if not show OOBE
	setup: boolean('setup').notNull().default(false),
	publicKey: text('publicKey')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});

//lesson time
export const lessonPlanItem = pgTable('lessonPlanItem', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	startTime: timestamp('startTime')
		.notNull()
		.$defaultFn(() => new Date()),
	endTime: timestamp('endTime')
		.notNull()
		.$defaultFn(() => new Date()),
	additionalNote: text('additionalNote').notNull().default(''),
	subject: text('subject').notNull().default(''),
	teacher: integer('teacher').references(() => user.id, {
		onDelete: 'cascade',
	}).notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});