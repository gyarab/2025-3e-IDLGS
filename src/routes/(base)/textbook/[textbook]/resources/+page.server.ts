import { error, isHttpError, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));

	const value = await event.locals.db.transaction(async (tx) => {
		const textbookId = (
			await tx
				.select({ id: databaseSchema.textbook.id })
				.from(databaseSchema.textbook)
				.where(eq(databaseSchema.textbook.uuid, event.params.textbook))
				.limit(1)
		)[0]?.id;

		if (!textbookId) {
			return error(404);
		}
	});

	if (isHttpError(value)) throw value;

	return {};
};

export const actions = {
	addResource: async (event) => {},
	editResource: async (event) => {},
	deleteResource: async (event) => {},
};
