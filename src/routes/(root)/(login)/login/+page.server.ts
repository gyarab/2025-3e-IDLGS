import {
	USER_SESSION_LENGTH,
	USER_SESSION_LENGTH_REMEMBER,
	validateTurnstile,
} from '$lib/server/user/index.js';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import * as dataSchema from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { EMAIL_REGEX } from '$lib/server/user/index.js';
import * as crypto from 'node:crypto';

export const load = async (event) => {
	if ((await event.parent()).user) {
		redirect(303, '/home');
	}
};

export const actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString().trim();
		const password = formData.get('password')?.toString().trim();
		const remember = formData.get('remember')?.toString().trim() == 'on';

		if (!email || !password) {
			return fail(400, {});
		}
		if (!EMAIL_REGEX.test(email)) {
			return fail(400, {});
		}

		if (
			!(await validateTurnstile(
				(event.request.headers.get('CF-Connecting-IP') as string) ||
					event.request.headers.get('X-Forwarded-For') ||
					'unknown',
				formData.get('cf-turnstile-response')?.toString() as string,
				env.CLOUDFLARE_SECRET,
			))
		) {
			return fail(401, {});
		}

		const user = (
			await event.locals.db
				.select()
				.from(dataSchema.user)
				.where(eq(dataSchema.user.email, email))
				.limit(1)
		)[0];

		const hashedPassword = crypto
			.pbkdf2Sync(password, user.salt, user.iterations, 64, 'sha512')
			.toString('hex');
		if (hashedPassword != user.password) {
			return fail(401, {});
		}

		const session = (
			await event.locals.db
				.insert(dataSchema.userSession)
				.values({
					user: user.id,
					expiresAt: new Date(
						Date.now() +
							(remember
								? USER_SESSION_LENGTH_REMEMBER
								: USER_SESSION_LENGTH),
					),
				})
				.returning()
		)[0];

		event.cookies.set('session', session.token, { path: '/' });
	},
};
