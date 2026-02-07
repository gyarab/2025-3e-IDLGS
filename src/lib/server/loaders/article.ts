import { getRequestEvent } from '$app/server';
import { eq } from 'drizzle-orm';
import { schema } from '../db/mainSchema';

export const loadArticle = async (uuid: string, textbookUuid?: string) => {
	const db = getRequestEvent().locals.db;

	const result = await db
		.select({
			uuid: schema.article.uuid,
			name: schema.article.name,
			text: schema.article.text,
			order: schema.article.order,
		})
		.from(schema.article)
		.where(eq(schema.article.uuid, uuid))
		.limit(1);

	if (result.length === 0) {
		return undefined;
	}

	if (textbookUuid) {
		const textbook = await db
			.select()
			.from(schema.textbook)
			.where(eq(schema.textbook.uuid, textbookUuid))
			.limit(1);

		const definitions = await db
			.select()
			.from(schema.textbookWordDefinition)
			.where(eq(schema.textbookWordDefinition.textbook, textbook[0].id));

		//find definitions and apply them

		for (const definition of definitions) {
			//TODO
		}
	}

	return result[0];
};
