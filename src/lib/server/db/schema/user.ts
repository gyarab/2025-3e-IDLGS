import {
	pgTable,
	text,
	integer,
	timestamp,
	date,
	boolean,
} from 'drizzle-orm/pg-core';
import { school } from './commerce';

//TODO encrypt name, surname, parent emails, email, degree

export const user = pgTable('user', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	email: text('email').notNull().default('').unique(),
	parentEmail1: text('parentEmail1').notNull().default(''),
	parentEmail2: text('parentEmail2').notNull().default(''),
	password: text('password').notNull().default(''),
	iterations: integer('iterations').notNull().default(0),
	salt: text('salt').notNull().default(''),
	publicKey: text('publicKey').notNull().default(''),
	createdAt: timestamp('createdAt')
		.notNull()
		.$defaultFn(() => new Date()),
	birthday: date('birthday')
		.notNull()
		.$defaultFn(
			() =>
				`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
		),
	lang: text('lang').notNull().default('any'),
	streak: integer('streak').notNull().default(0),
	verified: boolean('verified').notNull().default(false),
	extended: boolean('extended').notNull().default(false),
	//website admin
	admin: boolean('admin').notNull().default(false),
	//student / teacher / director
	schoolTeacher: boolean('schoolTeacher').notNull().default(false),
	schoolDirector: boolean('schoolDirector').notNull().default(false),
	school: integer('school').references(() => school.id, {
		onDelete: 'set null',
	}),
	//API key - read only
	readOnlyKey: text('readOnlyKey')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	//API key - write access
	apiKey: text('apiKey')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	degree: text('degree').notNull(),
	//personalization: if 0 draw letters, otherwise images from array
	background: integer('background').notNull().default(1),
	canCreateTextbooks: boolean('canCreateTextbooks').notNull().default(false),
	canCreateCourses: boolean('canCreateCourses').notNull().default(false),
	canCreateResin: boolean('canCreateResin').notNull().default(false),
	//force good passwords
	setPassword: boolean('setPassword').notNull().default(false),
	//disable for teachers
	gamification: boolean('gamification').notNull().default(true),
	canEditGamification: boolean('canEditGamification').notNull().default(true),
	canChangeSettings: boolean('canChangeSettings').notNull().default(true),
	//when setting new popup message - set to id of that message
	lastMessage: integer('lastMessage').notNull(),
	//for gamification: which league the user is in, 0 for lowest, -1 opt out
	leagueId: integer('leagueId').notNull().default(0),
	//for league
	xpWeek: integer('xpWeek').notNull().default(0),
	//for stats
	xpTotal: integer('xpTotal').notNull().default(0),
});

export const userVerification = pgTable('userVerification', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	uuid: text('uuid')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	user: integer('user')
		.references(() => user.id)
		.notNull(),
});

export const userSession = pgTable('userSession', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().notNull(),
	token: text('token')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	user: integer('user')
		.references(() => user.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
});
