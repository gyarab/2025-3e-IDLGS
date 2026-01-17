import { apiRunner } from '$lib/server/form/runner.js';
import { json } from '@sveltejs/kit';
import { schema } from '$lib/server/db/mainSchema';
import { or, sql } from 'drizzle-orm';

export const POST = async () => {
	return await apiRunner(['query'], async (event, data, user) => {
		const searchPattern = `%${data.query}%`;

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
					sql`LOWER(${schema.user.degree}) LIKE LOWER(${searchPattern})`,
					sql`LOWER(${schema.user.uuid}) LIKE LOWER(${searchPattern})`,
				),
			)
			.limit(1000);

		return json({
			users: result,
		});
	});
};
