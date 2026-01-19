import { pgTable, text, integer, check } from 'drizzle-orm/pg-core';
import { user } from './user';
import { sql } from 'drizzle-orm';

//only for admin
export const blog = pgTable('blog', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	text: text('text').notNull().default(''),
	author: integer('user')
		.references(() => user.id, {
			onDelete: 'set null',
		})
		.notNull(),
});

export const subject = pgTable('subject', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	name: text('name').notNull().default(''),
	description: text('description').notNull().default(''),
});

export const dailyChallenges = pgTable(
	'dailyChallenges',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
		text: text('text').notNull().default(''),
		//amount of users
		completedBy: integer('completedBy').notNull().default(0),
		//if daily challenge has parameter e.g. Complete X exercises - these are the limits
		paramMin: integer('paramMin').notNull().default(0),
		paramMax: integer('paramMax').notNull().default(5),
	},
	(table) => [
		check('paramMinCheck', sql`${table.paramMin} >= 0`),
		check('paramMaxCheck', sql`${table.paramMax} <= 10`),
		check('paramSanityCheck', sql`${table.paramMin} <= ${table.paramMax}`),
	],
);
