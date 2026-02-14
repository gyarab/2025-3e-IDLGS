import { writeLog } from '$lib/log';
import { schema } from '$lib/server/db/mainSchema';
import { chapter } from '$lib/server/db/schema/textbook.js';
import { formRunner } from '$lib/server/form/runner';
import { isUserAuthorizedTextbook } from '$lib/server/permission';
import { searchInText, searchPreprocess } from '$lib/text/index.js';
import type { SearchResultType } from '$lib/types';
import { fail } from '@sveltejs/kit';
import { and, desc, eq, gt, lt } from 'drizzle-orm';

export const actions = {
	update: async () => {
		return await formRunner(
			[],
			async (event, formData, cookies, user) => {
				if (!(
					await isUserAuthorizedTextbook(
						event.params.id!,
						user.uuid,
					)
				)) {
					return fail(403);
				}

				const name = formData['name']?.trim();
				const content = formData['content']?.trim();

				if (!name && !content) return fail(400);

				let object: { [key: string]: string | Date } = {
					modifiedAt: new Date(),
				};

				if (name) object['name'] = name;
				if (content) object['text'] = content;

				const definitions = await event.locals.db
					.select()
					.from(schema.textbookWordDefinition)
					.innerJoin(schema.textbook, eq(schema.textbook.id, schema.textbookWordDefinition.textbook))
					.where(eq(schema.textbook.uuid, event.params.id!));

				try {
					const article = (await event.locals.db
						.update(schema.article)
						.set(object)
						.where(
							eq(
								schema.article.uuid,
								event.params.articleId!,
							),
						).returning())[0];

					const words = searchPreprocess(article.text);

					const adis: SearchResultType[] = [];
					for (const definition of definitions) {
						adis.push(
							...searchInText(
								definition.textbookWordDefinition.word,
								words
							).map((res: SearchResultType) => {
								console.log(`Definition "${definition.textbookWordDefinition.word}" found at ${res.start}-${res.end}`);
								return {
									...res,
									id: definition.textbookWordDefinition.id!,
								}
							})
						);
					}

					if (adis.length > 0 && content) {
						await event.locals.db.transaction(async (tx) => {
							await tx
								.delete(schema.articleDefinitionIndex)
								.where(
									eq(
										schema.articleDefinitionIndex.article,
										article.id!,
									),
								);

							await tx
								.insert(schema.articleDefinitionIndex)
								.values(adis.map((adi: SearchResultType) => {
									return {
										article: article.id!,
										startIndex: adi.start,
										endIndex: adi.end,
										definition: adi.id!,
									}
								}));
						});
					}
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
			false,
			['name', 'content']
		);
	},
};
