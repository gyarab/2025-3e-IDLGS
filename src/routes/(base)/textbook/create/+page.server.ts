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
import { getRGBFromHex, makeHex } from '$lib';
import { asc, eq, inArray } from 'drizzle-orm';
import { saveToCloud } from '$lib/server/filesave/index.js';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));

	const editUuid = event.url.searchParams.get('uuid');
	if (!editUuid) return { user: pd.user };

	const tbRow = (
		await event.locals.db
			.select({
				id: databaseSchema.textbook.id,
				uuid: databaseSchema.textbook.uuid,
				title: databaseSchema.textbook.title,
				description: databaseSchema.textbook.description,
				thumbnail: databaseSchema.textbook.thumbnail,
				r: databaseSchema.textbook.r,
				g: databaseSchema.textbook.g,
				b: databaseSchema.textbook.b,
				educationLevel: databaseSchema.textbook.educationLevel,
			})
			.from(databaseSchema.textbook)
			.where(eq(databaseSchema.textbook.uuid, editUuid))
			.limit(1)
	)[0];

	if (!tbRow) return { user: pd.user };

	const chapterRows = await event.locals.db
		.select({
			id: databaseSchema.chapter.id,
			title: databaseSchema.chapter.title,
			uuid: databaseSchema.chapter.uuid,
			order: databaseSchema.chapter.order,
		})
		.from(databaseSchema.chapter)
		.where(eq(databaseSchema.chapter.textbookId, tbRow.id))
		.orderBy(asc(databaseSchema.chapter.order));

	const articles2d = [];
	for (let ch of chapterRows) {
		const articles = await event.locals.db
			.select({
				title: databaseSchema.article.title,
				uuid: databaseSchema.article.uuid,
				order: databaseSchema.article.order,
			})
			.from(databaseSchema.article)
			.where(eq(databaseSchema.article.chapterId, ch.id))
			.orderBy(asc(databaseSchema.article.order));
		articles2d.push(
			articles.map((a) => ({ title: a.title, order: a.order })),
		);
	}

	const linkerRows = await event.locals.db
		.select({ userId: databaseSchema.textbookUserLinker.userId })
		.from(databaseSchema.textbookUserLinker)
		.where(eq(databaseSchema.textbookUserLinker.textbookId, tbRow.id));

	const authorRows =
		linkerRows.length > 0
			? await event.locals.db
					.select({ uuid: databaseSchema.user.uuid })
					.from(databaseSchema.user)
					.where(
						inArray(
							databaseSchema.user.id,
							linkerRows.map((r) => r.userId),
						),
					)
			: [];

	let thumbnailUrl = null;
	if (tbRow.thumbnail) {
		const res = (
			await event.locals.db
				.select({ url: databaseSchema.resource.url })
				.from(databaseSchema.resource)
				.where(eq(databaseSchema.resource.id, tbRow.thumbnail))
				.limit(1)
		)[0];
		thumbnailUrl = res?.url ?? null;
	}

	return {
		user: pd.user,
		textbook: {
			uuid: tbRow.uuid,
			title: tbRow.title,
			description: tbRow.description,
			educationLevel: tbRow.educationLevel,
			color: makeHex(tbRow.r, tbRow.g, tbRow.b),
			chapters: chapterRows.map((c) => ({
				title: c.title,
				order: c.order,
			})),
			articles: articles2d,
			authors: authorRows.map((a) => a.uuid),
			thumbnailUrl,
		},
	};
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

	updateTextbook: async (event) => {
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
				'uuid',
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

				if (
					!Array.isArray(chapters) ||
					!Array.isArray(articles) ||
					!Array.isArray(authors) ||
					chapters.length === 0 ||
					articles.length === 0 ||
					chapters.length !== articles.length
				)
					return fail(400);

				authors.sort();

				const [r, g, b] = getRGBFromHex(data.color);

				const eduLevel = Number(data.educationLevel);
				if (isNaN(eduLevel) || eduLevel < 0 || eduLevel > 8)
					return fail(400);

				const textbookUuid = data.uuid;

				await event.locals.db.transaction(async (tx) => {
					const tb = (
						await tx
							.select({ id: databaseSchema.textbook.id })
							.from(databaseSchema.textbook)
							.where(
								eq(databaseSchema.textbook.uuid, textbookUuid),
							)
							.limit(1)
					)[0];

					if (!tb) return fail(404);

					let thumbnailId: number | undefined = undefined;
					if (thumbnail && (thumbnail as File).size > 0) {
						const thumbnailUrl = await saveToCloud(
							thumbnail as File,
							'image',
						);
						if (!thumbnailUrl) return fail(502);
						const resource = await tx
							.insert(databaseSchema.resource)
							.values({
								url: thumbnailUrl,
								title: 'thumbnail',
								type: 'image',
							})
							.returning();
						thumbnailId = resource[0].id;
					}

					// update textbook
					await tx
						.update(databaseSchema.textbook)
						.set({
							title: data.name,
							description: data.description,
							educationLevel: eduLevel,
							r: r,
							g: g,
							b: b,
							...(thumbnailId ? { thumbnail: thumbnailId } : {}),
						})
						.where(eq(databaseSchema.textbook.id, tb.id));

					// replace authors
					await tx
						.delete(databaseSchema.textbookUserLinker)
						.where(
							eq(
								databaseSchema.textbookUserLinker.textbookId,
								tb.id,
							),
						);

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
					for (let i = 0; i < authorIds.length; i++)
						authorData.push({
							textbookId: tb.id,
							userId: authorIds[i].id,
						});

					if (authorData.length > 0)
						await tx
							.insert(databaseSchema.textbookUserLinker)
							.values(authorData);

					const existingArticleIds = (
						await tx
							.select({ id: databaseSchema.article.id })
							.from(databaseSchema.article)
							.where(eq(databaseSchema.article.textbookId, tb.id))
					).map((r) => r.id);

					if (existingArticleIds.length > 0) {
						await tx
							.delete(databaseSchema.articleHistory)
							.where(
								inArray(
									databaseSchema.articleHistory.articleId,
									existingArticleIds,
								),
							);
					}

					await tx
						.delete(databaseSchema.article)
						.where(eq(databaseSchema.article.textbookId, tb.id));
					await tx
						.delete(databaseSchema.chapter)
						.where(eq(databaseSchema.chapter.textbookId, tb.id));

					// new chapters
					const chapterData: ChapterTypeNoId[] = [];
					for (let c of chapters)
						chapterData.push({
							title: c.title,
							textbookId: tb.id,
							order: c.order,
						});

					const chapterIds = (
						await tx
							.insert(databaseSchema.chapter)
							.values(chapterData)
							.returning()
					).map((c: ChapterTypeFull) => c.id);

					const articleData: ArticleTypeFullNoId[] = [];
					for (let i = 0; i < articles.length; i++) {
						for (let a of articles[i]) {
							articleData.push({
								title: a.title,
								order: a.order,
								chapterId: chapterIds[i],
								textbookId: tb.id,
								text: '',
								uuid: crypto.randomUUID(),
							});
						}
					}

					if (articleData.length > 0)
						await tx
							.insert(databaseSchema.article)
							.values(articleData);
				});

				return;
			},
			['thumbnail'],
		);
	},
};
