import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { m } from '$lib/paraglide/messages';
import { error } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));
	if (!pd.textbook) return error(404, m.textbookDoesntExist());

	const textbookId = (
		await event.locals.db
			.select({ id: databaseSchema.textbook.id })
			.from(databaseSchema.textbook)
			.where(eq(databaseSchema.textbook.uuid, pd.textbook.uuid))
			.limit(1)
	)[0];

	return {
		chapters: (
			await event.locals.db
				.select({
					title: databaseSchema.chapter.title,
					uuid: databaseSchema.chapter.uuid,
					order: databaseSchema.chapter.order,
					textbookId: databaseSchema.chapter.textbookId,
				})
				.from(databaseSchema.chapter)
				.where(eq(databaseSchema.chapter.textbookId, textbookId.id))
				.orderBy(asc(databaseSchema.chapter.order))
		).map((c) => ({
			...c,
			textbookId: undefined,
		})),
	};
};
