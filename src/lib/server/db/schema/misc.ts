import { pgTable, text, integer, check, timestamp } from 'drizzle-orm/pg-core';
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

//message shown to all logged in users (feature announcements, TOS updates, etc)
export const message = pgTable('message', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	name: text('name').notNull().default(''),
	content: text('content').notNull().default(''),
	lang: text('lang').notNull().default('en'),
});

export const passwordReset = pgTable('passwordReset', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	expiresAt: timestamp('expiresAt')
		.notNull()
		.$defaultFn(() => {
			return new Date(Date.now() + 1000 * 15 * 60); //15 minutes
		}),
	user: integer('user')
		.references(() => user.id, {
			onDelete: 'cascade',
		})
		.notNull(),
});
