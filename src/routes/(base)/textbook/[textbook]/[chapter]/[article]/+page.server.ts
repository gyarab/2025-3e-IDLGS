import { fail, type RequestEvent } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type { UserTypeFull } from '$lib/types';

export const actions: Record<string, unknown> = {
	deleteArticle: async (event: RequestEvent) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				const {
					textbook: textbookUuid,
					chapter: chapterUuid,
					article: articleUuid,
				} = event.params;

				if (!textbookUuid || !chapterUuid || !articleUuid)
					return fail(400);

				const textbookRow = (
					await event.locals.db
						.select({ id: databaseSchema.textbook.id })
						.from(databaseSchema.textbook)
						.where(eq(databaseSchema.textbook.uuid, textbookUuid))
						.limit(1)
				)[0];

				const chapterRow = (
					await event.locals.db
						.select({
							id: databaseSchema.chapter.id,
							textbookId: databaseSchema.chapter.textbookId,
						})
						.from(databaseSchema.chapter)
						.where(eq(databaseSchema.chapter.uuid, chapterUuid))
						.limit(1)
				)[0];

				if (
					!textbookRow ||
					!chapterRow ||
					chapterRow.textbookId !== textbookRow.id
				)
					return fail(404);

				const articleRow = (
					await event.locals.db
						.select({
							id: databaseSchema.article.id,
							order: databaseSchema.article.order,
						})
						.from(databaseSchema.article)
						.where(eq(databaseSchema.article.uuid, articleUuid))
						.limit(1)
				)[0];

				if (!articleRow) return fail(404);

				// ensure article belongs to chapter
				const belongs = (
					await event.locals.db
						.select({ id: databaseSchema.article.id })
						.from(databaseSchema.article)
						.where(eq(databaseSchema.article.id, articleRow.id))
						.limit(1)
				)[0];

				if (!belongs) return fail(404);

				await event.locals.db.transaction(async (tx: any) => {
					// delete history
					await tx
						.delete(databaseSchema.articleHistory)
						.where(
							eq(
								databaseSchema.articleHistory.articleId,
								articleRow.id,
							),
						);

					// delete article
					await tx
						.delete(databaseSchema.article)
						.where(eq(databaseSchema.article.id, articleRow.id));

					// decrement order for following articles
					const following = (await tx
						.select({
							id: databaseSchema.article.id,
							order: databaseSchema.article.order,
						})
						.from(databaseSchema.article)
						.where(
							eq(databaseSchema.article.chapterId, chapterRow.id),
						)
						.orderBy(asc(databaseSchema.article.order))) as Array<{
						id: number;
						order: number;
					}>;

					const toUpdate = following.filter(
						(a: { id: number; order: number }) =>
							a.order > articleRow.order,
					);

					for (const a of toUpdate) {
						await tx
							.update(databaseSchema.article)
							.set({ order: a.order - 1 })
							.where(eq(databaseSchema.article.id, a.id));
					}
				});
			},
		);
	},
};
