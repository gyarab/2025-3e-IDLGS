import { getRequestEvent } from '$app/server';
import { schema } from '$lib/server/db/mainSchema';
import { eq } from 'drizzle-orm';

export const loadDefinitions = async (textbookUuid: string) => {
	const db = getRequestEvent().locals.db;

	const id = await db
		.select({
			id: schema.textbook.id,
		})
		.from(schema.textbook)
		.where(eq(schema.textbook.uuid, textbookUuid))
		.then((res) => res[0]?.id);

	const definitions = await db
		.select()
		.from(schema.textbookWordDefinition)
		.where(eq(schema.textbookWordDefinition.textbook, id));

	return definitions;
};
