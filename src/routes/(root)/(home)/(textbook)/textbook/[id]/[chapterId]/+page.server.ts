import { loadChapter } from '$lib/server/loaders/chapter.js';
import { error } from '@sveltejs/kit';
import { writeLog } from '$lib/log';
import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { isUserAuthorizedTextbook } from '$lib/server/permission';
import { fail } from '@sveltejs/kit';
import { desc, eq, and, lt, gt, count, sql } from 'drizzle-orm';

export const load = async (event) => {
	const chapterId = event.params.chapterId;

	const chapter = await loadChapter(chapterId);

	if (!chapter) {
		return error(404, 'Chapter not found');
	}

	return {
		chapter: chapter,
	};
};

export const actions = {
	//TODO name, content update, AI summary
	addArticle: async () => {
		return await formRunner(
			['name'],
			async (event, formData, cookies, user) => {
				if (
					!(await isUserAuthorizedTextbook(
						event.params.id!,
						user.uuid,
					))
				) {
					return fail(403);
				}

				try {
					await event.locals.db.transaction(async (tx) => {
						const chapter = await tx
							.select()
							.from(schema.chapter)
							.where(
								eq(
									schema.chapter.uuid,
									event.params.chapterId!,
								),
							)
							.limit(1);

						const order = await tx
							.select()
							.from(schema.article)
							.where(eq(schema.article.chapter, chapter[0].id))
							.orderBy(desc(schema.article.order));

						await tx.insert(schema.article).values({
							name: formData['name'],
							text: '',
							chapter: chapter[0].id,
							order: order.length > 0 ? order[0].order + 1 : 0,
						});
					});
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	removeArticle: async () => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user) => {
				if (
					!(await isUserAuthorizedTextbook(
						event.params.id!,
						user.uuid,
					))
				) {
					return fail(403);
				}

				try {
					await event.locals.db
						.delete(schema.article)
						.where(eq(schema.article.uuid, formData['uuid']));
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	//if article first/last in chapter, move to previous/next chapter
	moveArticleUp: async () => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user) => {
				if (
					!(await isUserAuthorizedTextbook(
						event.params.id!,
						user.uuid,
					))
				) {
					return fail(403);
				}

				try {
					await event.locals.db.transaction(async (tx) => {
						const article = await tx
							.select()
							.from(schema.article)
							.where(eq(schema.article.uuid, formData['uuid']))
							.limit(1);

						const prevArticle = await tx
							.select()
							.from(schema.article)
							.where(
								and(
									eq(
										schema.article.chapter,
										article[0].chapter,
									),
									lt(schema.article.order, article[0].order),
								),
							)
							.orderBy(desc(schema.article.order))
							.limit(1);

						if (prevArticle.length === 0) {
							//move to previous chapter
							const currentChapter = await tx
								.select()
								.from(schema.chapter)
								.where(
									eq(schema.chapter.id, article[0].chapter),
								)
								.limit(1);

							const prevChapter = await tx
								.select()
								.from(schema.chapter)
								.where(
									and(
										eq(
											schema.chapter.textbook,
											currentChapter[0].textbook,
										),
										lt(
											schema.chapter.order,
											currentChapter[0].order,
										),
									),
								)
								.orderBy(desc(schema.chapter.order))
								.limit(1);

							//no prev article or prev chapter -> cant move
							if (prevChapter.length === 0) {
								return fail(400);
							}

							const articlesInPrevChapter = (
								await tx
									.select({ count: count() })
									.from(schema.article)
									.where(
										eq(
											schema.article.chapter,
											prevChapter[0].id,
										),
									)
							)[0].count;

							//article to prev chapter
							await tx
								.update(schema.article)
								.set({
									chapter: prevChapter[0].id,
									order: articlesInPrevChapter + 1,
								})
								.where(eq(schema.article.id, article[0].id));

							//decrement order of all articles in current chapter
							await tx
								.update(schema.article)
								.set({
									order: sql`${schema.article.order} - 1`,
								})
								.where(
									eq(
										schema.article.chapter,
										currentChapter[0].id,
									),
								);
						} else {
							//swap
							await tx
								.update(schema.article)
								.set({ order: article[0].order })
								.where(
									eq(schema.article.id, prevArticle[0].id),
								);

							await tx
								.update(schema.article)
								.set({ order: prevArticle[0].order })
								.where(eq(schema.article.id, article[0].id));
						}
					});
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	moveArticleDown: async () => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user) => {
				if (
					!(await isUserAuthorizedTextbook(
						event.params.id!,
						user.uuid,
					))
				) {
					return fail(403);
				}

				try {
					await event.locals.db.transaction(async (tx) => {
						const article = await tx
							.select()
							.from(schema.article)
							.where(eq(schema.article.uuid, formData['uuid']))
							.limit(1);

						const nextArticle = await tx
							.select()
							.from(schema.article)
							.where(
								and(
									eq(
										schema.article.chapter,
										article[0].chapter,
									),
									gt(schema.article.order, article[0].order),
								),
							)
							.orderBy(schema.article.order)
							.limit(1);

						if (nextArticle.length === 0) {
							//move to next chapter
							const currentChapter = await tx
								.select()
								.from(schema.chapter)
								.where(
									eq(schema.chapter.id, article[0].chapter),
								)
								.limit(1);

							const nextChapter = await tx
								.select()
								.from(schema.chapter)
								.where(
									and(
										eq(
											schema.chapter.textbook,
											currentChapter[0].textbook,
										),
										gt(
											schema.chapter.order,
											currentChapter[0].order,
										),
									),
								)
								.orderBy(schema.chapter.order)
								.limit(1);

							//no next article or next chapter -> cant move
							if (nextChapter.length === 0) {
								return fail(400);
							}

							//article to next chapter
							await tx
								.update(schema.article)
								.set({
									chapter: nextChapter[0].id,
									order: 0,
								})
								.where(eq(schema.article.id, article[0].id));

							//increment order of all articles in next chapter
							await tx
								.update(schema.article)
								.set({
									order: sql`${schema.article.order} + 1`,
								})
								.where(
									eq(
										schema.article.chapter,
										nextChapter[0].id,
									),
								);
						} else {
							//swap
							await tx
								.update(schema.article)
								.set({ order: article[0].order })
								.where(
									eq(schema.article.id, nextArticle[0].id),
								);

							await tx
								.update(schema.article)
								.set({ order: nextArticle[0].order })
								.where(eq(schema.article.id, article[0].id));
						}
					});
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	editArticleName: async () => {
		return await formRunner(
			['uuid', 'name'],
			async (event, formData, cookies, user) => {
				if (
					!(await isUserAuthorizedTextbook(
						event.params.id!,
						user.uuid,
					))
				) {
					return fail(403);
				}

				try {
					await event.locals.db
						.update(schema.article)
						.set({
							name: formData['name'],
						})
						.where(eq(schema.article.uuid, formData['uuid']));
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
};
