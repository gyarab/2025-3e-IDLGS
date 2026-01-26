import {
	USER_SESSION_LENGTH,
	USER_SESSION_LENGTH_REMEMBER,
	validateTurnstile,
} from '$lib/server/user';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { schema } from '$lib/server/db/mainSchema';
import { eq } from 'drizzle-orm';
import { EMAIL_REGEX } from '$lib/server/user';
import * as crypto from 'node:crypto';
import { formRunner } from '$lib/server/form/runner';

export const load = async () => {};

export const actions = {
	login: async () => {
		return await formRunner(
			['email', 'password', 'cf-turnstile-response'],
			async (event, formData, _cookies, _user, formDataRaw) => {
				const email = formData['email'].toLowerCase().trim();
				const password = formData['password'];
				const remember = formDataRaw.get('remember')?.toString().trim() == 'on';

				if (!email || !password) {
					return fail(400, {});
				}
				if (!EMAIL_REGEX.test(email)) {
					return fail(400, {});
				}

				if (
					!(await validateTurnstile(
						(event.request.headers.get(
							'CF-Connecting-IP',
						) as string) ||
							event.request.headers.get('X-Forwarded-For') ||
							'unknown',
						formData['cf-turnstile-response'],
						env.CLOUDFLARE_SECRET,
					))
				) {
					return fail(401, {});
				}

				const user = (
					await event.locals.db
						.select()
						.from(schema.user)
						.where(eq(schema.user.email, email))
						.limit(1)
				)[0];

				const hashedPassword = crypto
					.pbkdf2Sync(
						Buffer.from(password),
						user.salt,
						user.iterations,
						64,
						'sha512',
					)
					.toString('hex');

				if (
					!crypto.timingSafeEqual(
						Buffer.from(hashedPassword),
						Buffer.from(user.password),
					)
				) {
					return fail(401, {});
				}

				//UTC!!!
				const session = (
					await event.locals.db
						.insert(schema.userSession)
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
			true,
		);
	},
};
