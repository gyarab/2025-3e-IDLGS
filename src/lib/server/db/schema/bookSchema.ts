import {
	pgTable,
	serial,
	integer,
	text,
	timestamp,
	boolean,
	check,
} from 'drizzle-orm/pg-core';

/*
	in accordance with teaching digital compentences and motivating students,
	some sources are marked as good and some as forbidden / bad
*/

export const bookList = pgTable(
	'bookList',
	{
		id: serial('id').primaryKey(),
		title: text('title').notNull(),
		author: text('author').notNull(),
		//both ISBN and urlHostname count when determining result
		isbn: text('isbn').notNull(),
		urlHostname: text('urlHostname').notNull(),
		isBad: boolean('isBad').notNull().default(false),
		isQuestionable: boolean('isQuestionable').notNull().default(false),
		isForbidden: boolean('isForbidden').notNull().default(false),
		isExcellent: boolean('isExcellent').notNull().default(false),
		uuid: text('uuid')
			.notNull()
			.unique()
			.$defaultFn(() => crypto.randomUUID()),
		note: text('note').notNull().default(''),
	});