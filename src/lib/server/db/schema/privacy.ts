import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const privacyPolicy = pgTable('privacyPolicy', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	text: text('text').notNull(),
	lang: text('lang').notNull(),
	modifiedAt: timestamp('modifiedAt')
		.notNull()
		.$defaultFn(() => new Date()),
});

export const termsOfUse = pgTable('termsOfUse', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	text: text('text').notNull(),
	lang: text('lang').notNull(),
	modifiedAt: timestamp('modifiedAt')
		.notNull()
		.$defaultFn(() => new Date()),
});
