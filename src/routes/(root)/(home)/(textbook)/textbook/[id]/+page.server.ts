import { writeLog } from '$lib/log';
import { editChapterName } from '$lib/paraglide/messages.js';
import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { isUserAuthorizedTextbook } from '$lib/server/permission';
import { fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';

//TODO guard against if archived textbook!!

export const load = async (event) => {
	return await event.parent();
};

export const actions = {
	updateName: async (event) => {
		return await formRunner(
			['uuid', 'name'],
			async (event, formData, cookies, user) => {
				if (
					(await isUserAuthorizedTextbook(
						event.params.id!,
						user.uuid,
					)) === false
				) {
					return fail(403);
				}

				try {
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
			async (event, formData, cookies, user) => {
				if (
					(await isUserAuthorizedTextbook(
						event.params.id!,
						user.uuid,
					)) === false
				) {
					return fail(403);
				}

				try {
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
						const textbook = await tx
							.select()
							.from(schema.textbook)
							.where(eq(schema.textbook.uuid, event.params.id!))
							.limit(1);

						const order = await tx
							.select()
							.from(schema.chapter)
							.where(eq(schema.chapter.textbook, textbook[0].id))
							.orderBy(desc(schema.chapter.order))
							.limit(1);

						await tx.insert(schema.chapter).values({
							name: formData['name'],
							summary: '',
							textbook: textbook[0].id,
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
	removeChapter: async () => {
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
						.delete(schema.chapter)
						.where(eq(schema.chapter.uuid, formData['uuid']));
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
	moveChapterDown: async () => {
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
	editChapterName: async () => {
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
						.update(schema.chapter)
						.set({
							name: formData['name'],
						})
						.where(eq(schema.chapter.uuid, formData['uuid']));
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
};
