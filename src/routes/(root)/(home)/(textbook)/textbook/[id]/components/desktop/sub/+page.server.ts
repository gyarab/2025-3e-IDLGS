import { writeLog } from '$lib/log';
import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { error, fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import { isUserAuthorizedTextbook } from '$lib/server/permission';
import type {
	ArticleLimitedType,
	ChapterType,
} from '$lib/types.js';

export const load = async () => {
	return error(404, 'Not Found');
};

//TODO fix this terrible spaghetti code

export const actions = {
	updateTextStructure: async () => {
		return await formRunner(
			['chapters', 'articles', 'uuid'],
			async (event, formData, _cookies, user) => {
				//try {
				if (!(await isUserAuthorizedTextbook(user.uuid))) {
					return fail(403);
				}

				//TODO textbook archived check!

				const chapters: ChapterType[] = JSON.parse(
					formData['chapters'],
				);
				const articles: ArticleLimitedType[][] = JSON.parse(
					formData['articles'],
				);
				if (!Array.isArray(chapters) || !Array.isArray(articles)) {
					return fail(400);
				}

				await event.locals.db.transaction(async (tx) => {
					const textbook = (
						await tx
							.select()
							.from(schema.textbook)
							.where(eq(schema.textbook.uuid, formData['uuid']))
							.limit(1)
					)[0];

					const chaptersTextbook = await tx
						.select()
						.from(schema.chapter)
						.where(eq(schema.chapter.textbook, textbook.id))
						.orderBy(desc(schema.chapter.id));

					//TODO optimize using sets and maps!

					let chapterIndex = 0;
					for (const chapter of chaptersTextbook) {
						let chapterDb = null;

						//is in both lists - update
						if (
							chapters.findIndex((c) => c.uuid === chapter.uuid) !== -1
						) {
							chapterDb = (await tx
								.update(schema.chapter)
								.set({ name: chapter.name })
								.where(eq(schema.chapter.uuid, chapter.uuid))
								.returning())[0];
						}
						//not in formData - delete
						else {
							chapterDb = (await tx
								.delete(schema.chapter)
								.where(eq(schema.chapter.uuid, chapter.uuid))
								.returning())[0];

							await tx
								.delete(schema.article)
								.where(eq(schema.article.chapter, chapterDb.id));

							chapterIndex++;
							continue;
						}

						const articlesTextbook = await tx
							.select()
							.from(schema.article)
							.where(eq(schema.article.chapter, chapterDb.id))
							.orderBy(desc(schema.article.id));

						//same logic as chapters
						for (const article of articlesTextbook) {
							//is in both lists - update
							if (
								articles[chapterIndex].findIndex((a) => a.uuid === article.uuid) !== -1
							) {
								await tx
									.update(schema.article)
									.set({ name: article.name })
									.where(eq(schema.article.uuid, article.uuid));
							}
							//not in formData - delete
							else {
								await tx
									.delete(schema.article)
									.where(eq(schema.article.uuid, article.uuid));
							}
						}

						for (const article of articles[chapterIndex].filter(a => a.uuid.length === 0)) {
							//new article
							await tx
								.insert(schema.article)
								.values({
									name: article.name,
									chapter: chapterDb.id,
									text: '',
								});
						}

						chapterIndex++;
					}

					for (const chapter of chapters.filter(c => c.uuid.length === 0)) {
						let chapterDb = (await tx
							.insert(schema.chapter)
							.values({
								name: chapter.name,
								textbook: textbook.id,
								summary: '',
							})
							.returning())[0];

						for (const article of articles[chapterIndex].filter(a => a.uuid.length === 0)) {
							//new article
							await tx
								.insert(schema.article)
								.values({
									name: article.name,
									chapter: chapterDb.id,
									text: '',
								});
						}
					};
				});

				//} catch (e) {
				//	writeLog(event, 'ERROR', 'DB error', user);
				//	return fail(500);
				//}
			},
		);
	},
};
