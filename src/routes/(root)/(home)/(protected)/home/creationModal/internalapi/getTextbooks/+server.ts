import { apiRunner } from '$lib/server/form/runner.js';
import { json } from '@sveltejs/kit';
import { schema } from '$lib/server/db/mainSchema';
import { or, sql } from 'drizzle-orm';

export const POST = async () => {
	return await apiRunner(['query'], async (event, data, user) => {
		const searchPattern = `%${data.query}%`;

		const result = await event.locals.db
			.select({
				uuid: schema.textbook.uuid,
				name: schema.textbook.name,
				description: schema.textbook.description,
				subject: schema.textbook.subject,
				summary: schema.textbook.summary,
			})
			.from(schema.textbook)
			.where(
				or(
					sql`LOWER(${schema.textbook.name}) LIKE LOWER(${searchPattern})`,
					sql`LOWER(${schema.textbook.description}) LIKE LOWER(${searchPattern})`,
					sql`LOWER(${schema.textbook.subject}) LIKE LOWER(${searchPattern})`,
					sql`LOWER(${schema.textbook.summary}) LIKE LOWER(${searchPattern})`,
					sql`LOWER(${schema.textbook.uuid}) LIKE LOWER(${searchPattern})`,
				),
			)
			.limit(100);

		return json({
			textbooks: result,
		});
	});
}