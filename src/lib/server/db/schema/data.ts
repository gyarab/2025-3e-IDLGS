import { pgTable, text, integer, customType } from 'drizzle-orm/pg-core';
import { article } from './textbook';

export const image = pgTable('image', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	link: text('link').notNull().default(''),
	alt: text('alt').notNull().default(''),
	name: text('name').notNull().default(''),
	article: integer('article')
		.references(() => article.id, {
			onDelete: 'cascade',
		})
		.notNull(),
});

export const audio = pgTable('audio', {
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

//until drizzle 1.0.0 there is no support for bytea
const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
	dataType() {
		return 'bytea';
	},
});

//3D model
export const model = pgTable('model', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	name: text('name').notNull().default(''),
	data: bytea('data').notNull(),
	article: integer('article')
		.references(() => article.id, {
			onDelete: 'cascade',
		})
		.notNull(),
});
