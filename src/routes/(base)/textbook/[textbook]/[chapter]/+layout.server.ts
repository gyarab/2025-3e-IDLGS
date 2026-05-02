import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { m } from '$lib/paraglide/messages';
import { error } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

export const load = async (event) => {
	const chapter = (
		await event.locals.db
			.select({
				title: databaseSchema.chapter.title,
				uuid: databaseSchema.chapter.uuid,
				order: databaseSchema.chapter.order,
			})
			.from(databaseSchema.chapter)
			.where(eq(databaseSchema.chapter.uuid, event.params.chapter))
			.limit(1)
	)[0];

	if(!chapter) return error(404, m.chapterDoesntExist());

	return {
		chapter
	};
};