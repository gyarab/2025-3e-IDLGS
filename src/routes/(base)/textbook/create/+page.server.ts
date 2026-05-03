import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type {
	ArticleTypeRaw,
	ArticleTypeFullNoId,
	ChapterTypeRaw,
	UserTypeFull,
	ChapterTypeNoId,
	ChapterTypeFull,
} from '$lib/types.js';
import { resolve } from '$app/paths';
import { fail, redirect } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { getRGBFromHex } from '$lib';
import { asc, eq, inArray } from 'drizzle-orm';
import { saveToCloud } from '$lib/server/filesave/index.js';

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
				'thumbnail',
			],
			true,
			async (
				data: FormDataType,
				user: UserTypeFull | undefined,
				formData?: FormData,
			) => {
				const chapters = JSON.parse(data.chapters) as ChapterTypeRaw[];
				const articles = JSON.parse(
					data.articles,
				) as ArticleTypeRaw[][];
				const authors = JSON.parse(data.authors) as string[]; //uuids

				const thumbnail = formData?.get('thumbnail') as File;
				console.log('Thumbnail', thumbnail);

				if (
					!Array.isArray(chapters) ||
					!Array.isArray(articles) ||
					!Array.isArray(authors) ||
					chapters.length === 0 ||
					articles.length === 0 ||
					chapters.length !== articles.length ||
					!thumbnail ||
					thumbnail.size === 0
				)
					return fail(400);

				authors.sort();

				const [r, g, b] = getRGBFromHex(data.color);

				const eduLevel = Number(data.educationLevel);
				if (isNaN(eduLevel) || eduLevel < 0 || eduLevel > 8)
					return fail(400);

				const textbookUuid = crypto.randomUUID();
				const thumbnailUrl = await saveToCloud(thumbnail, 'image');

				if (!thumbnailUrl) return fail(502);

				await event.locals.db.transaction(async (tx) => {
					const resource = await tx
						.insert(databaseSchema.resource)
						.values({
							url: thumbnailUrl,
							title: 'thumbnail',
							type: 'image',
						})
						.returning();

					const textbook = (
						await tx
							.insert(databaseSchema.textbook)
							.values({
								title: data.name,
								description: data.description,
								educationLevel: eduLevel,
								r: r,
								g: g,
								b: b,
								thumbnail: resource[0].id,
								uuid: textbookUuid,
							})
							.returning()
					)[0];

					const authorIds = await tx
						.select({
							id: databaseSchema.user.id,
							uuid: databaseSchema.user.uuid,
						})
						.from(databaseSchema.user)
						.where(
							inArray(databaseSchema.user.uuid, [
								user!.uuid,
								...authors,
							]),
						)
						.orderBy(asc(databaseSchema.user.uuid))
						.limit(authors.length + 1);

					const authorData: { textbookId: number; userId: number }[] =
						[];

					for (let i = 0; i < authorIds.length; i++) {
						authorData.push({
							textbookId: textbook.id,
							userId: authorIds[i].id,
						});
					}

					await tx
						.insert(databaseSchema.textbookUserLinker)
						.values(authorData);

					const chapterData: ChapterTypeNoId[] = [];

					for (let c of chapters) {
						chapterData.push({
							title: c.title,
							textbookId: textbook.id,
							order: c.order,
						});
					}

					const chapterIds = (
						await tx
							.insert(databaseSchema.chapter)
							.values(chapterData)
							.returning()
					).map((c: ChapterTypeFull) => c.id);

					const articleData: ArticleTypeFullNoId[] = [];

					//articles stored in 2D array per chapter
					for (let i = 0; i < articles.length; i++) {
						for (let a of articles[i]) {
							articleData.push({
								title: a.title,
								order: a.order,
								chapterId: chapterIds[i],
								textbookId: textbook.id,
								text: '',
								uuid: crypto.randomUUID(),
							});
						}
					}

					await tx.insert(databaseSchema.article).values(articleData);
				});

				return;
			},
			['thumbnail'],
		);
	},
};
