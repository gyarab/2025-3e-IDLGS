import {
	pgTable,
	serial,
	integer,
	text,
	timestamp,
	boolean,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	middlename: text('middlename').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	iterations: integer('iterations').notNull(),
	salt: text('salt').notNull(),
	registeredAt: timestamp('registeredAt').notNull().defaultNow(),
	firstLogin: boolean('firstLogin').notNull().default(true),
	playedTextbookTutorial: boolean('playedTextbookTutorial')
		.notNull()
		.default(false),
	playedLibraryTutorial: boolean('playedLibraryTutorial')
		.notNull()
		.default(false),
	playedGalleryTutorial: boolean('playedGalleryTutorial')
		.notNull()
		.default(false),
	degree: text('degree').notNull().default('none'),
	institution: text('institution').notNull().default('none'),
	profilePicture: integer('profilePicture').references(() => resource.id),
	description: text('description').notNull().default(''),
	lastSeenAt: timestamp('lastSeenAt').notNull().defaultNow(),
	uuid: text('uuid')
		.notNull()
		.unique()
		.$defaultFn(() => crypto.randomUUID()),
});

export const resource = pgTable('resource', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	url: text('url').notNull(),
	//VID / IMG / PDF / TXT / LNK
	type: text('type').notNull(),
});
