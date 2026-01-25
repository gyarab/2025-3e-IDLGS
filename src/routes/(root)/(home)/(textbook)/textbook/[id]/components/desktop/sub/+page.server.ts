import { writeLog } from '$lib/log';
import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { error, fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import { isUserAuthorizedTextbook } from '$lib/server/permission';
import type {
	ArticleLimitedType,
	ArticleType,
	ChapterType,
} from '$lib/types.js';

export const load = async () => {
	return error(404, 'Not Found');
};

export const actions = {
	updateTextStructure: async (event) => {
		return await formRunner(
			['chapters', 'articles', 'uuid'],
			async (event, formData, cookies, user) => {
				//try {
				if (!(await isUserAuthorizedTextbook(user.uuid))) {
					return fail(403);
				}

				//TODO textbook archived check

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

					let chapterIndex = 0;
					for (const chapter of chapters) {
						let chapterDb = null;

						if (!chapter.uuid || chapter.uuid.length === 0) {
							//add new
							chapterDb = (
								await tx
									.insert(schema.chapter)
									.values({
										textbook: textbook.id,
										name: chapter.name,
										summary: '', //generated later
									})
									.returning()
							)[0];
						} else {
							//edit
							chapterDb = (
								await tx
									.update(schema.chapter)
									.set({
										name: chapter.name,
										summary: '',
									})
									.where(
										eq(schema.chapter.uuid, chapter.uuid),
									)
									.returning()
							)[0];

							if (!chapterDb) {
								//chapter not found (throw catched below)
								throw new Error('Chapter not found!');
							}
						}

						for (const article of articles[chapterIndex]) {
							if (!article.uuid || article.uuid.length === 0) {
								//add new
								await tx.insert(schema.article).values({
									chapter: chapterDb.id,
									name: article.name,
									text: `# ${article.name} \n\n`,
								});
							} else {
								//edit (just the name)
								await tx
									.update(schema.article)
									.set({
										name: article.name,
									})
									.where(
										eq(schema.article.uuid, article.uuid),
									);
							}
						}

						chapterIndex++;
					}
				});

				//} catch (e) {
				//	writeLog(event, 'ERROR', 'DB error', user);
				//	return fail(500);
				//}
			},
		);
	},
};
