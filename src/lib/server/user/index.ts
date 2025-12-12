import type { UserType } from '$lib/types';
import { checkSetting } from '../settings';
import * as crypto from 'node:crypto';
import { db } from '$lib/server/db/index.js';
import * as dataSchema from '$lib/server/db/schema.js';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const setPassword = async (password: string): Promise<void> => {
	const salt = crypto.randomUUID();
	//cloudflare workers has 100000 iteration limit
	const iterations = Math.trunc(9000 + Math.random() * 90000);

	await checkSetting(
		'password',
		crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex')
	);

	await checkSetting('salt', salt);
	await checkSetting('iterations', String(iterations));
};

export const validateTurnstile = async (
	ip: string,
	token: string,
	secret: string
): Promise<boolean> => {
	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ip, secret, response: token })
		});
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
	salt?: string | undefined
) => {
	const lsalt = salt ?? crypto.randomUUID();
	const lamount = amount ?? Math.trunc(10000 + Math.random() * 89000); //cloudflare limits to 100000

	return {
		password: crypto.pbkdf2Sync(password, lsalt, lamount, 64, 'sha512').toString('hex'),
		salt: lsalt,
		amount: lamount
	};
};

export const createUser = async (
	email: string,
	password: string,
	birthday: Date,
	lang: string,
	admin: boolean
): Promise<UserType> => {
	const pass = hashPassword(password);

	return (
		await db
			.insert(dataSchema.user)
			.values({
				email: email,
				password: pass.password,
				salt: pass.salt,
				iterations: pass.amount,
				admin: admin,
				lang: lang,
				birthday: `${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`
			})
			.returning()
	)[0];
};

export const getUser = async (event: RequestEvent): Promise<UserType | undefined> => {
	let cookie = event.cookies.get('session');
	if (!cookie) {
		return undefined;
	}

	const token = await db
		.select()
		.from(dataSchema.userSession)
		.where(eq(dataSchema.userSession.token, cookie))
		.limit(1);
	if (token.length == 0) return undefined;

	if (token[0].expiresAt <= new Date()) {
		await db.delete(dataSchema.userSession).where(eq(dataSchema.userSession.token, cookie));
		return undefined;
	}

	return (await db.select().from(dataSchema.user).where(eq(dataSchema.user.id, token[0].user)))[0];
};

export const USER_SESSION_LENGTH = 1000 * 60 * 15; //15 minutes if not remember me
export const USER_SESSION_LENGTH_REMEMBER = 1000 * 60 * 60 * 24 * 30; //month if yes
