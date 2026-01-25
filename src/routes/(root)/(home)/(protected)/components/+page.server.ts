import { writeLog } from '$lib/log.js';
import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { error, fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';

export const load = async () => {
	return error(404, 'Not Found');
};

export const actions = {
	markMessagesAsRead: async (event) => {
		return await formRunner([], async (event, formData, cookies, user) => {
			try {
				await event.locals.db.transaction(async (tx) => {
					const lastMessage = (
						await tx
							.select()
							.from(schema.message)
							.where(eq(schema.message.lang, user.lang))
							.orderBy(desc(schema.message.id))
							.limit(1)
					)[0].id;

					await tx
						.update(schema.user)
						.set({ lastMessage: lastMessage })
						.where(eq(schema.user.uuid, user.uuid));
				});
			} catch (e) {
				writeLog(event, 'ERROR', 'DB failure.', user);
				return fail(500);
			}
		});
	},
};
