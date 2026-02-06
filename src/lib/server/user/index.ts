import type { UserType } from '$lib/types';
import * as crypto from 'node:crypto';
import { schema } from '$lib/server/db/mainSchema';
import { eq, count } from 'drizzle-orm';
import { getRequestEvent } from '$app/server';
import { sendMail } from '../mail';
import { writeLog } from '$lib/log';
import { m } from '$lib/paraglide/messages';
import { renderMarkdown } from '$lib/markdown';
import type { Locale } from '$lib/paraglide/runtime';
import { checkPassword } from '$lib';

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

export const comparePassword = (
	password: string,
	hashedPassword: string,
	salt: string,
	amount: number,
): boolean => {
	const hashed = crypto
		.pbkdf2Sync(Buffer.from(password), salt, amount, 64, 'sha512')
		.toString('hex');

	return crypto.timingSafeEqual(
		Buffer.from(hashedPassword),
		Buffer.from(hashed),
	);
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
	let result: UserType;

	try {
		result = await db.transaction(async (tx) => {
			const messageAmount = await tx
				.select({ count: count() })
				.from(schema.message);

			return (
				await tx
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
						lastMessage: messageAmount[0].count,
					})
					.returning()
			)[0];
		});
	} catch (e) {
		writeLog(getRequestEvent(), 'ERROR', 'DB error when creating user');
		throw e;
	}

	if (
		!(await sendMail(
			m.welcomeToIDLGS({}, { locale: lang as Locale }),
			renderMarkdown(`
# ${m.welcomeToIDLGS({}, { locale: lang as Locale })}
${m.anAccountWasCreatedForThisEmailAddress({}, { locale: lang as Locale })}
${m.yourLoginInformation({}, { locale: lang as Locale })}
${m.password({}, { locale: lang as Locale })}: ${password}

${m.youCanLoginHere({}, { locale: lang as Locale })}: [IDLGS](https://ucebnice.martinbykov.eu/login)

${m.youWIllBeAskedToChangeYourPasswordAfterYourFirstLogin({}, { locale: lang as Locale })}
		`),
			email,
		))
	) {
		writeLog(
			getRequestEvent(),
			'ERROR',
			'Failed to send welcome email',
			result,
		);
		throw new Error('Failed to send welcome email');
	}

	return result;
};

export const getUser = async (): Promise<UserType | undefined> => {
	const event = getRequestEvent();

	const cookie = event.cookies.get('session');
	if (!cookie) {
		return undefined;
	}

	//all time comparisons in UTC!!!

	return await event.locals.db.transaction(async (tx) => {
		const token = await tx
			.select()
			.from(schema.userSession)
			.where(eq(schema.userSession.token, cookie))
			.limit(1);
		if (token.length == 0) return undefined;

		if (token[0].expiresAt.getTime() <= Date.now()) {
			await tx
				.delete(schema.userSession)
				.where(eq(schema.userSession.token, cookie));
			return undefined;
		}

		//only extend if less than normal session length remains (not remember me)
		if (token[0].expiresAt.getTime() - Date.now() < USER_SESSION_LENGTH) {
			await tx
				.update(schema.userSession)
				.set({
					expiresAt: new Date(Date.now() + USER_SESSION_LENGTH),
				})
				.where(eq(schema.userSession.token, cookie));
		}

		return (
			await tx
				.select()
				.from(schema.user)
				.where(eq(schema.user.id, token[0].user))
		)[0] as UserType;
	});
};

export const USER_SESSION_LENGTH = 1000 * 60 * 15; //15 minutes if not remember me
export const USER_SESSION_LENGTH_REMEMBER = 1000 * 60 * 60 * 24 * 30; //month if yes
