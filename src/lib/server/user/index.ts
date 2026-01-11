import type { UserType } from '$lib/types';
import * as crypto from 'node:crypto';
import { schema } from '$lib/server/db/mainSchema';
import { eq } from 'drizzle-orm';
import { getRequestEvent } from '$app/server';

export const validateTurnstile = async (
	ip: string,
	token: string,
	secret: string,
): Promise<boolean> => {
	try {
		const response = await fetch(
			'https://challenges.cloudflare.com/turnstile/v0/siteverify',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ip, secret, response: token }),
			},
		);
		const outcome = await response.json();
		return outcome.success;
	} catch (e) {
		console.error('Turnstile validation error:', e);
		return false;
	}
};

export const EMAIL_REGEX = /(.+)@(.+)\.(.+)/su;

export const hashPassword = (
	password: string,
	amount?: number | undefined,
	salt?: string | undefined,
) => {
	const lsalt = salt ?? crypto.randomUUID();
	const lamount = amount ?? Math.trunc(10000 + Math.random() * 89000); //cloudflare limits to 100000

	return {
		password: crypto
			.pbkdf2Sync(Buffer.from(password), lsalt, lamount, 64, 'sha512')
			.toString('hex'),
		salt: lsalt,
		amount: lamount,
	};
};

export const createUser = async (
	email: string,
	name: string,
	surname: string,
	degree: string,
	password: string,
	birthday: Date,
	lang: string,
	admin: boolean,
	textbooks: boolean,
	courses: boolean,
	resin: boolean,
	settings: boolean,
	editgamification: boolean,
	gamification: boolean,
): Promise<UserType> => {
	const db = getRequestEvent().locals.db;

	const pass = hashPassword(password);

	return (
		await db
			.insert(schema.user)
			.values({
				name,
				surname,
				degree,
				email,
				password: pass.password,
				salt: pass.salt,
				iterations: pass.amount,
				admin: admin,
				lang: lang,
				birthday: `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`,
				canCreateCourses: courses,
				canCreateTextbooks: textbooks,
				canCreateResin: resin,
				canChangeSettings: settings,
				canEditGamification: editgamification,
				gamification: gamification,
			})
			.returning()
	)[0];
};

export const getUser = async (): Promise<UserType | undefined> => {
	const event = getRequestEvent();

	const cookie = event.cookies.get('session');
	if (!cookie) {
		return undefined;
	}

	const token = await event.locals.db
		.select()
		.from(schema.userSession)
		.where(eq(schema.userSession.token, cookie))
		.limit(1);
	if (token.length == 0) return undefined;

	if (token[0].expiresAt <= new Date()) {
		await event.locals.db
			.delete(schema.userSession)
			.where(eq(schema.userSession.token, cookie));
		return undefined;
	}

	return (
		await event.locals.db
			.select()
			.from(schema.user)
			.where(eq(schema.user.id, token[0].user))
	)[0];
};

export const USER_SESSION_LENGTH = 1000 * 60 * 15; //15 minutes if not remember me
export const USER_SESSION_LENGTH_REMEMBER = 1000 * 60 * 60 * 24 * 30; //month if yes
