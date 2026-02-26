import {
	comparePassword,
	USER_SESSION_LENGTH,
	USER_SESSION_LENGTH_REMEMBER,
} from '$lib/server/user';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { schema } from '$lib/server/db/mainSchema';
import { eq } from 'drizzle-orm';
import { EMAIL_REGEX } from '$lib/server/user';
import { formRunner } from '$lib/server/form/runner';

export const load = async () => {};

export const actions = {
	login: async () => {
		return await formRunner(
			['email', 'password'],
			async (event, formData, _cookies, _user, formDataRaw) => {
				const email = formData['email'].toLowerCase().trim();
				const password = formData['password'];
				const remember =
					formDataRaw.get('remember')?.toString().trim() == 'on';

				if (!email || !password) {
					return fail(400, {});
				}
				if (!EMAIL_REGEX.test(email)) {
					return fail(400, {});
				}

				const captchaResponse = await event.fetch(
					'https://martinbykov.eu/645d6876bc/siteverify',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							secret: process.env.CAPTCHA,
							response: formDataRaw.get('captcha'),
						}),
					},
				);
				if (!(await captchaResponse.json()).success) {
					return fail(401, {});
				}

				const user = (
					await event.locals.db
						.select()
						.from(schema.user)
						.where(eq(schema.user.email, email))
						.limit(1)
				)[0];

				if (!user) {
					//no such user
					return fail(401, {});
				}

				if (
					!comparePassword(
						password,
						user.password,
						user.salt,
						user.iterations,
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
