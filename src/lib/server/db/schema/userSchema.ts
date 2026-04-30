import {
	pgTable,
	serial,
	integer,
	text,
	timestamp,
	boolean,
	check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const user = pgTable(
	'user',
	{
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
		degree: text('degree'),
		institution: text('institution'),
		profilePicture: integer('profilePicture').references(
			() => resource.id,
			{ onDelete: 'set null' },
		),
		description: text('description').notNull().default(''),
		lastSeenAt: timestamp('lastSeenAt').notNull().defaultNow(),
		r: integer('r').notNull().default(0),
		g: integer('g').notNull().default(0),
		b: integer('b').notNull().default(0),
		uuid: text('uuid')
			.notNull()
			.unique()
			.$defaultFn(() => crypto.randomUUID()),
	},
	() => [
		check(
			'colorValues',
			sql`(r >= 0 AND r <= 255) AND
		(g >= 0 AND g <= 255) AND
		(b >= 0 AND b <= 255)`,
		),
	],
);

export const session = pgTable('session', {
	id: serial('id').primaryKey(),
	userId: integer('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	token: text('token').notNull().unique(),
	expiresAt: timestamp('expiresAt')
		.notNull()
		.$defaultFn(() => {
			const now = new Date();
			now.setDate(now.getDate() + 3); //3 day sessions
			return now;
		}),
});

export const resource = pgTable('resource', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	url: text('url').notNull().default(''),
	//VID / IMG / PDF / TXT / LNK
	type: text('type').notNull(),
});
