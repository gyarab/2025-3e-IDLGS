import { getRequestEvent } from '$app/server';
import { eq } from 'drizzle-orm';
import { schema } from '../db/mainSchema';
import type { ArticleType } from '$lib/types';
import { renderMarkdown } from '$lib/markdown';

export const loadArticle = async (uuid: string) => {
	const db = getRequestEvent().locals.db;

	const result: ArticleType[] = await db
		.select({
			id: schema.article.id,
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

	const definitions = await db
		.select({
			startIndex: schema.articleDefinitionIndex.startIndex,
			endIndex: schema.articleDefinitionIndex.endIndex,
			uuid: schema.textbookWordDefinition.uuid,
			word: schema.textbookWordDefinition.word,
			description: schema.textbookWordDefinition.description,
		})
		.from(schema.articleDefinitionIndex)
		.innerJoin(
			schema.textbookWordDefinition,
			eq(
				schema.textbookWordDefinition.id,
				schema.articleDefinitionIndex.definition,
			),
		)
		.where(eq(schema.articleDefinitionIndex.article, result[0].id!));

	result[0].textRaw = result[0].text;
	for (const definition of definitions.reverse()) {
		result[0].text = [
			...result[0].text.slice(0, definition.startIndex),
			`<span class="definitionMountPlace" data-uuid="${definition.uuid}" data-word="${definition.word}" data-description="${definition.description}"></span>`,
			...result[0].text.slice(definition.endIndex),
		].join('');
	}

	result[0].text = renderMarkdown(result[0].text);

	return {
		...result[0],
		id: undefined,
	};
};
