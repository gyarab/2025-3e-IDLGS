import { writeLog } from '$lib/log';
import { add, removeChapter } from '$lib/paraglide/messages.js';
import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { isUserAuthorizedTextbook } from '$lib/server/permission';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

//TODO guard against if archived textbook!!

export const load = async (event) => {
	return await event.parent();
};

export const actions = {
	updateName: async (event) => {
		return await formRunner(
			['uuid', 'name'],
			async (event, formData, cookies, user, formDataRaw) => {
				try {
					if ((await isUserAuthorizedTextbook(user.uuid)) === false) {
						return fail(403);
					}

					await event.locals.db
						.update(schema.textbook)
						.set({
							name: formData['name'],
							modifiedAt: new Date(),
						})
						.where(eq(schema.textbook.uuid, formData['uuid']));
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	updateDescription: async (event) => {
		return await formRunner(
			['uuid', 'description'],
			async (event, formData, cookies, user, formDataRaw) => {
				try {
					if ((await isUserAuthorizedTextbook(user.uuid)) === false) {
						return fail(403);
					}

					await event.locals.db
						.update(schema.textbook)
						.set({
							description: formData['description'],
							modifiedAt: new Date(),
						})
						.where(eq(schema.textbook.uuid, formData['uuid']));
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	addChapter: async () => {
		return await formRunner(
			['name'],
			async (event, formData, cookies, user, formDataRaw) => {
				try {
					await event.locals.db.transaction(async (tx) => {
						//TODO
					});
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	addArticle: async () => {
		return await formRunner(
			['name', 'chapterUuid'],
			async (event, formData, cookies, user, formDataRaw) => {
				try {
					await event.locals.db.transaction(async (tx) => {
						//TODO
					});
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	removeChapter: async () => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user, formDataRaw) => {
				try {
					await event.locals.db
						.delete(schema.chapter)
						.where(eq(schema.chapter.uuid, formData['uuid']));
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
			async (event, formData, cookies, user, formDataRaw) => {
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
	moveChapterUp: async () => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user, formDataRaw) => {
				try {
					//TODO
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	moveChapterDown: async () => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user, formDataRaw) => {
				try {
					//TODO
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
			async (event, formData, cookies, user, formDataRaw) => {
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
			async (event, formData, cookies, user, formDataRaw) => {
				try {
					//TODO
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
};
