import { writeLog } from '$lib/log';
import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { isUserAuthorizedTextbook } from '$lib/server/permission';
import { fail } from '@sveltejs/kit';
import { and, desc, eq, gt, lt } from 'drizzle-orm';

//TODO guard against if archived textbook!!

export const load = async (event) => {
	return await event.parent();
};

export const actions = {
	update: async () => {
		return await formRunner(
			[],
			async (event, formData, cookies, user) => {
				if (
					(await isUserAuthorizedTextbook(
						event.params.id!,
						user.uuid,
					)) === false
				) {
					return fail(403);
				}

				const name = formData['name']?.trim();
				const description = formData['description']?.trim();

				if(!name && !description) return fail(400);

				let object: {[key: string]: string | Date} = {
					modifiedAt: new Date(),
				};

				if(name) object['name'] = name;
				if(description) object['description'] = description;

				try {
					await event.locals.db
						.update(schema.textbook)
						.set(object)
						.where(eq(schema.textbook.uuid, event.params.id!));
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
			false,
			['name', 'description']
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
	//moving just swap order values
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
					await event.locals.db.transaction(async (tx) => {
						const chapter = await tx
							.select()
							.from(schema.chapter)
							.where(eq(schema.chapter.uuid, formData['uuid']))
							.limit(1);

						const prevChapter = await tx
							.select()
							.from(schema.chapter)
							.where(
								and(
									eq(
										schema.chapter.textbook,
										chapter[0].textbook,
									),
									lt(schema.chapter.order, chapter[0].order),
								),
							)
							.orderBy(desc(schema.chapter.order))
							.limit(1);

						if (prevChapter.length === 0) {
							return fail(400);
						}

						//swap
						await tx
							.update(schema.chapter)
							.set({ order: chapter[0].order })
							.where(eq(schema.chapter.id, prevChapter[0].id));

						await tx
							.update(schema.chapter)
							.set({ order: prevChapter[0].order })
							.where(eq(schema.chapter.id, chapter[0].id));
					});
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
					await event.locals.db.transaction(async (tx) => {
						const chapter = await tx
							.select()
							.from(schema.chapter)
							.where(eq(schema.chapter.uuid, formData['uuid']))
							.limit(1);

						const nextChapter = await tx
							.select()
							.from(schema.chapter)
							.where(
								and(
									eq(
										schema.chapter.textbook,
										chapter[0].textbook,
									),
									gt(schema.chapter.order, chapter[0].order),
								),
							)
							.orderBy(schema.chapter.order)
							.limit(1);

						if (nextChapter.length === 0) {
							return fail(400);
						}

						//swap
						await tx
							.update(schema.chapter)
							.set({
								order: chapter[0].order,
							})
							.where(eq(schema.chapter.id, nextChapter[0].id));

						await tx
							.update(schema.chapter)
							.set({
								order: nextChapter[0].order,
							})
							.where(eq(schema.chapter.id, chapter[0].id));
					});
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
