import { formRunner } from '$lib/server/form/runner.js';
import { schema } from '$lib/server/db/mainSchema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '$lib/server/user/index.js';
import { fail, redirect } from '@sveltejs/kit';
import { checkPassword } from '$lib';

export const load = async (event) => {
	const user = (await event.parent()).user;
	if(!user) {
		redirect(303, '/login');
	}
	else if (user?.setPassword) {
		redirect(303, '/home');
	}
};

export const actions = {
	setPassword: async (event) => {
		return await formRunner(
			['password', 'rpassword'],
			async (event, formData, cookies, user) => {
				const password = formData.get('password')?.toString();
				if (
					password?.toString() !=
					formData.get('rpassword')?.toString()
				) {
					return fail(400);
				}

				const object = checkPassword(password as string);

				if (!object.all) {
					return fail(400);
				}

				const hashed = hashPassword(password as string);

				await event.locals.db
					.update(schema.user)
					.set({
						password: hashed.password,
						salt: hashed.salt,
						iterations: hashed.amount,
						setPassword: true,
					})
					.where(eq(schema.user.id, user.id));
			},
		);
	},
};
