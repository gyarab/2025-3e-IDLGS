import { apiRunner } from '$lib/server/form/runner.js';
import { error, json } from '@sveltejs/kit';
import { schema } from '$lib/server/db/mainSchema';
import { or, sql } from 'drizzle-orm';

export const POST = async (event) => {
	return await apiRunner(event, async (event, user, data) => {
		const localData = data as {
			query: string;
		};

		if (!localData || !localData.query || !localData.query.length) {
			return error(400);
		}

		const searchPattern = `%${localData.query}%`;

		const result = await event.locals.db
			.select({
				email: schema.user.email,
				uuid: schema.user.uuid,
				degree: schema.user.degree,
				name: schema.user.name,
				surname: schema.user.surname,
			})
			.from(schema.user)
			.where(
				or(
					sql`LOWER(${schema.user.name}) LIKE LOWER(${searchPattern})`,
					sql`LOWER(${schema.user.surname}) LIKE LOWER(${searchPattern})`,
					sql`LOWER(${schema.user.email}) LIKE LOWER(${searchPattern})`,
				),
			)
			.limit(1000);

		return json({
			users: result,
		});
	});
};
