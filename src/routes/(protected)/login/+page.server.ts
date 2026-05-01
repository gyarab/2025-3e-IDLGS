import { formRunner, type FormDataType } from '$lib/server/form/validation';
import type { UserTypeFull } from '$lib/types';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { verifyPassword } from '$lib/server/user/index.js';
import { page } from '$app/state';
import { resolve } from '$app/paths';

export const load = async (event) => {
	const pd = await event.parent();

	if (pd.user) redirect(303, '/profile/');
};

export const actions = {
	login: async (event) => {
		return await formRunner(
			event,
			['email', 'password', 'cap-token'],
			false,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				if (!process.env.IGNORE_CAPTCHA) {
					const captchaResponse = await event.fetch(
						'https://captcha.martinbykov.eu/5a4899a4b6/siteverify',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								secret: process.env.CAPTCHA_SECRET_KEY,
								response: data['cap-token'],
							}),
						},
					);
					if (!(await captchaResponse.json()).success) {
						return fail(400, {});
					}
				}

				const userData = (
					await event.locals.db
						.select({
							id: databaseSchema.user.id,
							salt: databaseSchema.user.salt,
							iterations: databaseSchema.user.iterations,
							password: databaseSchema.user.password,
						})
						.from(databaseSchema.user)
						.where(eq(databaseSchema.user.email, data.email))
						.limit(1)
				)[0];

				if (
					verifyPassword(
						data.password,
						userData.salt,
						userData.iterations,
						userData.password,
					)
				) {
					const sessionToken = crypto
						.randomUUID()
						.replaceAll('-', '');

					event.cookies.set('sessionTokenIDLGS', sessionToken, {
						path: '/',
					});

					await event.locals.db
						.insert(databaseSchema.session)
						.values({
							userId: userData.id,
							token: sessionToken,
						});

					return redirect(302, resolve('/(protected)/login'));
				} else return fail(401);
			},
		);
	},
	logout: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				const sessionToken = event.cookies.get(
					'sessionTokenIDLGS',
				) as string;

				await event.locals.db
					.delete(databaseSchema.session)
					.where(eq(databaseSchema.session.token, sessionToken));

				event.cookies.delete('sessionTokenIDLGS', {
					path: '/',
				});
			},
		);
	},
	logoutAll: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				await event.locals.db
					.delete(databaseSchema.session)
					.where(eq(databaseSchema.session.userId, user!.id));

				event.cookies.delete('sessionTokenIDLGS', {
					path: '/',
				});
			},
		);
	},
};
