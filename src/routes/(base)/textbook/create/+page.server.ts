import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type { ArticleType, ChapterType, UserTypeInfo } from '$lib/types.js';
import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));
};

export const actions = {
	makeTextbook: async (event) => {
		return await formRunner(
			event,
			[
				'name',
				'description',
				'educationLevel',
				'color',
				'chapters',
				'articles',
				'authors',
			],
			true,
			async (data: FormDataType, user: UserTypeInfo | undefined) => {
				const chapters = JSON.parse(data.chapters) as ChapterType[];
				const articles = JSON.parse(data.articles) as ArticleType[][];
				const authors = JSON.parse(data.authors) as string[]; //uuids

				await event.locals.db.transaction(async (tx) => {
					const textbook = await event.locals.db
						.insert(databaseSchema.textbook)
						.values({
							name: data.name,
							description: data.description,
							educationLevel: data.educationLevel,
							color: data.color,
						})
						.returning();
				});
			},
		);
	},
};
