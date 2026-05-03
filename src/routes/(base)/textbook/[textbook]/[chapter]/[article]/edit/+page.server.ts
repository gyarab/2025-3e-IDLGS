import { m } from '$lib/paraglide/messages';
import { error, redirect } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { resolve } from '$app/paths';
import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type { UserTypeFull } from '$lib/types.js';

export const load = async (event) => {};

export const actions = {
	editText: async (event) => {
		return await formRunner(
			event,
			['text'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				if(data.text.length === 0) return error(400);

				await event.locals.db.transaction(async (tx) => {
					const article = (await tx
						.select({
							id: databaseSchema.article.id,
							text: databaseSchema.article.text,
						})
						.from(databaseSchema.article)
						.where(
							eq(
								databaseSchema.article.uuid,
								event.params.article,
							),
						)
						.limit(1))[0];

					await tx.insert(databaseSchema.articleHistory).values({
						text: article.text,
						articleId: article.id,
						userId: user!.id,
						editedAt: new Date(),
					});

					await tx.update(databaseSchema.article)
						.set({
							text: data.text,
							editedAt: new Date(),
						})
						.where(
							eq(
								databaseSchema.article.uuid,
								event.params.article,
							),
						);
				});

			},
		);
	},
	deleteArticle: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {},
		);
	},
};
