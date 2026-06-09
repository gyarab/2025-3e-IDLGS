import { m } from '$lib/paraglide/messages';
import { error, redirect } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.textbook) return error(404, m.textbookDoesntExist());
	if (!pd.chapter) return error(404, m.chapterDoesntExist());

	const { textbook: textbookUuid, chapter: chapterUuid, article: articleUuid } = event.params;
	if (!textbookUuid || !chapterUuid || !articleUuid)
		return error(404, m.articleDoesntExist());

	const article = (
		await event.locals.db
			.select({
				title: databaseSchema.article.title,
				uuid: databaseSchema.article.uuid,
				order: databaseSchema.article.order,
				textbookUuid: databaseSchema.textbook.uuid,
				chapterUuid: databaseSchema.chapter.uuid,
				text: databaseSchema.article.text,
			})
			.from(databaseSchema.article)
			.leftJoin(
				databaseSchema.chapter,
				eq(databaseSchema.chapter.id, databaseSchema.article.chapterId),
			)
			.leftJoin(
				databaseSchema.textbook,
				eq(
					databaseSchema.textbook.id,
					databaseSchema.article.textbookId,
				),
			)
			.where(eq(databaseSchema.article.uuid, articleUuid))
			.limit(1)
	)[0];

	if (article.textbookUuid !== textbookUuid)
		return error(404, m.articleDoesntExist());
	if (article.chapterUuid !== chapterUuid)
		return error(404, m.articleDoesntExist());

	if (!article) return error(404, m.articleDoesntExist());

	return {
		article: {
			...article,
			chapterUuid: undefined,
			textbookUuid: undefined,
		},
	};
};
