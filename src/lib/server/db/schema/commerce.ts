import {
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
} from 'drizzle-orm/pg-core';
import { user } from './user';

export const productKey = pgTable('productKey', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	key: text('key')
		.notNull()
		.$defaultFn(() =>
			crypto.randomUUID().replaceAll('-', '').toLocaleUpperCase(),
		),
	used: boolean('used').notNull().default(false),
	expires: timestamp('expires').notNull(),
	school: integer('school').references(() => school.id, {
		onDelete: 'set null',
	}),
});

//user buys individually product, when school as a whole - 1 transaction per all users
export const purchase = pgTable('purchase', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	user: integer('user').references(() => user.id, {
		onDelete: 'set null',
	}),
	merchant: integer('merchant').references(() => company.id, {
		onDelete: 'set null',
	}),
	note: text('note').notNull().default(''),
	amount: integer('amount').notNull().default(0),
	currency: text('currency').notNull().default('CZK'),
	time: timestamp('time')
		.notNull()
		.$defaultFn(() => new Date()),
});

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

export const company = pgTable('company', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	name: text('name').notNull().default(''),
	address: text('address').notNull().default(''),
	note: text('note').notNull().default(''),
	descriptor: text('descriptor').notNull().default(''),
	responsiblePerson: text('responsiblePerson').notNull().default(''),
	publicKey: text('publicKey')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});
