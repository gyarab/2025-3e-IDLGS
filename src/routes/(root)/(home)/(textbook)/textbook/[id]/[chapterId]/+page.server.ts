import { loadChapter } from '$lib/server/loaders/chapter.js';
import { error } from '@sveltejs/kit';
import { writeLog } from '$lib/log';
import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { isUserAuthorizedTextbook } from '$lib/server/permission';
import { fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';

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
					//TODO
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
					//TODO
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
