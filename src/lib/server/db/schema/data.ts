import {
	pgTable,
	text,
	integer,
} from 'drizzle-orm/pg-core';

export const image = pgTable('image', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	link: text('link').notNull().default(''),
	alt: text('alt').notNull().default(''),
	refCount: integer('refCount').notNull().default(1),
});

export const audio = pgTable('article', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
});

export const interactiveElement = pgTable('interactiveElement', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	rawData: text('rawData').notNull().default(''),
});

export const setting = pgTable('setting', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	key: text('key').notNull().default(''),
	value: text('value').notNull().default(''),
});

export const school = pgTable('school', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	name: text('name').notNull().default(''),
	productkey: text('productkey').notNull().default(''),
});
