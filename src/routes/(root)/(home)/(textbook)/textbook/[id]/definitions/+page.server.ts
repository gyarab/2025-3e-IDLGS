import { fail, redirect } from '@sveltejs/kit';
import type { UserType } from '$lib/types';
import { loadDefinitions } from '$lib/server/loaders/definitions';
import { formRunner } from '$lib/server/form/runner';
import { isUserAuthorizedTextbook } from '$lib/server/permission';
import { writeLog } from '$lib/log.js';
import { schema } from '$lib/server/db/mainSchema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const user = (await event.parent()).user as UserType | undefined;

	if (user && !user.setPassword) {
		redirect(303, '/set');
	}

	const textbook = await (await event.parent()).textbook;

	const definitions = await loadDefinitions(textbook.uuid);

	return {
		definitions,
	};
};

export const actions = {
	addDefinition: async (event) => {
		return await formRunner(
			['term', 'definition'],
			async (event, formData, cookies, user) => {
				if (!isUserAuthorizedTextbook(event.params.id!, user.uuid)) {
					return fail(403);
				}

				try {
					const textbook = await event.locals.db
						.select()
						.from(schema.textbook)
						.where(eq(schema.textbook.uuid, event.params.id!))
						.limit(1);

					await event.locals.db
						.insert(schema.textbookWordDefinition)
						.values({
							textbook: textbook[0].id,
							word: formData['term'],
							description: formData['definition'],
						});
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	editDefinition: async (event) => {
		return await formRunner(
			['uuid', 'term', 'definition'],
			async (event, formData, cookies, user) => {
				if (!isUserAuthorizedTextbook(event.params.id!, user.uuid)) {
					return fail(403);
				}

				try {
					await event.locals.db
						.update(schema.textbookWordDefinition)
						.set({
							word: formData['term'],
							description: formData['definition'],
						})
						.where(
							eq(
								schema.textbookWordDefinition.uuid,
								formData['uuid'],
							),
						);
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	deleteDefinition: async (event) => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user) => {
				if (!isUserAuthorizedTextbook(event.params.id!, user.uuid)) {
					return fail(403);
				}

				try {
					await event.locals.db
						.delete(schema.textbookWordDefinition)
						.where(
							eq(
								schema.textbookWordDefinition.uuid,
								formData['uuid'],
							),
						);
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	clearDefinitions: async (event) => {
		return await formRunner([], async (event, formData, cookies, user) => {
			if (!isUserAuthorizedTextbook(event.params.id!, user.uuid)) {
				return fail(403);
			}

			try {
				const textbook = await event.locals.db
					.select()
					.from(schema.textbook)
					.where(eq(schema.textbook.uuid, event.params.id!))
					.limit(1);

				await event.locals.db
					.delete(schema.textbookWordDefinition)
					.where(
						eq(
							schema.textbookWordDefinition.textbook,
							textbook[0].id,
						),
					);
			} catch (e) {
				writeLog(event, 'ERROR', 'DB error', user);
				return fail(500);
			}
		});
	},
};
