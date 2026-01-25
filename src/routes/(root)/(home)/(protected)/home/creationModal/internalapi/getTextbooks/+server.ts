import { apiRunner } from '$lib/server/form/runner';
import { json } from '@sveltejs/kit';
import { schema } from '$lib/server/db/mainSchema';
import { or, sql, eq, and } from 'drizzle-orm';
import { renderMarkdown } from '$lib/markdown';

export const POST = async () => {
	return await apiRunner(['query'], async (event, data, user) => {
		const searchPattern = `%${data.query}%`;

		const result = await event.locals.db
			.select({
				id: schema.textbook.id,
				uuid: schema.textbook.uuid,
				name: schema.textbook.name,
				description: schema.textbook.description,
				subject: schema.textbook.subject,
				summary: schema.textbook.summary,
			})
			.from(schema.textbook)
			.innerJoin(
				schema.userTextbookLinker,
				eq(schema.userTextbookLinker.textbook, schema.textbook.id),
			)
			.where(
				and(
					or(
						sql`LOWER(${schema.textbook.name}) LIKE LOWER(${searchPattern})`,
						sql`LOWER(${schema.textbook.description}) LIKE LOWER(${searchPattern})`,
						sql`LOWER(${schema.textbook.subject}) LIKE LOWER(${searchPattern})`,
						sql`LOWER(${schema.textbook.summary}) LIKE LOWER(${searchPattern})`,
						sql`LOWER(${schema.textbook.uuid}) LIKE LOWER(${searchPattern})`,
					),
					eq(schema.userTextbookLinker.user, user.id),
				),
			)
			.limit(100);

		for (const textbook of result) {
			textbook.description = renderMarkdown(textbook.description);
		}

		return json({
			textbooks: result.map((tb) => {
				return {
					...tb,
					id: undefined,
				};
			}),
		});
	});
};
