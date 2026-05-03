import { m } from '$lib/paraglide/messages';
import { error, redirect } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { resolve } from '$app/paths';
import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type { UserTypeFull } from '$lib/types.js';

export const load = async (event) => { }

export const actions = {
	editText: async (event) => {
		return await formRunner(event, [], true, async (data: FormDataType, user: UserTypeFull | undefined) => {

		});
	},
	deleteArticle: async (event) => {
		return await formRunner(event, [], true, async (data: FormDataType, user: UserTypeFull | undefined) => {

		});
	},
};
