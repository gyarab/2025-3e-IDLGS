import { m } from '$lib/paraglide/messages';
import { error } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.textbook) return error(404, m.textbookDoesntExist());

	const chapter = (
		await event.locals.db
			.select({
				title: databaseSchema.chapter.title,
				uuid: databaseSchema.chapter.uuid,
				order: databaseSchema.chapter.order,
				textbookUuid: databaseSchema.textbook.uuid,
			})
			.from(databaseSchema.chapter)
			.leftJoin(
				databaseSchema.textbook,
				eq(
					databaseSchema.textbook.id,
					databaseSchema.chapter.textbookId,
				),
			)
			.where(eq(databaseSchema.chapter.uuid, event.params.chapter))
			.limit(1)
	)[0];

	if (!chapter) return error(404, m.chapterDoesntExist());
	if (chapter.textbookUuid !== event.params.textbook)
		return error(404, m.chapterDoesntExist());

	return {
		chapter,
	};
};
