import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type { UserTypeInfo } from '$lib/types.js';
import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));
};

export const actions = {
	makeTextbook: async (event) => {
		return await formRunner(
			event,
			[
				'name',
				'description',
				'educationLevel',
				'color',
				'chapters',
				'articles',
				'authors',
			],
			true,
			async (data: FormDataType, user: UserTypeInfo | undefined) => {
				console.log(data, 'FORM DATA');
			},
		);
	},
};
