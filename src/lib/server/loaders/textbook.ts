import type { UserType, TextbookType, UserTypeLimited } from '$lib/types';
import { schema } from '$lib/server/db/mainSchema';
import { and, eq, inArray, or } from 'drizzle-orm';
import { getRequestEvent } from '$app/server';
import { renderMarkdown } from '$lib/markdown';

export const loadTextbooks = async (
	user?: UserType,
): Promise<TextbookType[]> => {
	const db = getRequestEvent().locals.db;

	const textbooks = await db
		.select({
			id: schema.textbook.id,
			uuid: schema.textbook.uuid,
			description: schema.textbook.description,
			createdAt: schema.textbook.createdAt,
			modifiedAt: schema.textbook.modifiedAt,
			red: schema.textbook.red,
			green: schema.textbook.green,
			blue: schema.textbook.blue,
			name: schema.textbook.name,
			summary: schema.textbook.summary,
			subject: schema.textbook.subject,
			public: schema.textbook.public,
			archived: schema.textbook.archived,
		})
		.from(schema.textbook)
		.innerJoin(
			schema.userTextbookLinker,
			eq(schema.textbook.id, schema.userTextbookLinker.textbook), //join condition
		)
		.where(
			or(
				eq(schema.userTextbookLinker.user, user?.id ?? -1),
				eq(schema.textbook.public, true),
			),
		);

	for (let i = 0; i < textbooks.length; i++) {
		textbooks[i].description = renderMarkdown(textbooks[i].description);
		const authorsData = await db
			.select({
				uuid: schema.user.uuid,
				email: schema.user.email,
				name: schema.user.name,
				surname: schema.user.surname,
				degree: schema.user.degree,
				editor: schema.userTextbookLinker.editor,
				owner: schema.userTextbookLinker.owner,
			})
			.from(schema.user)
			.innerJoin(
				schema.userTextbookLinker,
				eq(schema.user.id, schema.userTextbookLinker.user),
			)
			.where(eq(schema.userTextbookLinker.textbook, textbooks[i].id));

		(textbooks[i] as TextbookType).authors = authorsData.map((v) => {
			return {
				uuid: v.uuid!,
				email: v.email!,
				name: v.name!,
				surname: v.surname!,
				degree: v.degree!,
				isEditor: v.editor!,
				isTeacher: false,
				isOwner: v.owner!,
			} as UserTypeLimited;
		});
	}

	return textbooks.map((t) => {
		return {
			...t,
			id: undefined,
		};
	});
};

//also checks permissions and if logged in
export const loadSingleTextbook = async (
	user: UserType | undefined,
	textbookUuid: string,
	authors: boolean = false,
	chapters: boolean = false,
): Promise<TextbookType | null> => {
	const db = getRequestEvent().locals.db;

	let textbook = await db
		.select({
			id: schema.textbook.id,
			uuid: schema.textbook.uuid,
			description: schema.textbook.description,
			createdAt: schema.textbook.createdAt,
			modifiedAt: schema.textbook.modifiedAt,
			red: schema.textbook.red,
			green: schema.textbook.green,
			blue: schema.textbook.blue,
			name: schema.textbook.name,
			summary: schema.textbook.summary,
			subject: schema.textbook.subject,
			public: schema.textbook.public,
			archived: schema.textbook.archived,
		})
		.from(schema.textbook)
		.innerJoin(
			schema.userTextbookLinker,
			or(
				eq(schema.textbook.id, schema.userTextbookLinker.textbook),
				eq(schema.textbook.public, true),
			), //join condition
		)
		.where(
			and(
				or(
					eq(schema.userTextbookLinker.user, user?.id ?? -1),
					eq(schema.textbook.public, true),
				),
				eq(schema.textbook.uuid, textbookUuid),
			),
		)
		.limit(1);

	if (textbook.length === 0) {
		return null;
	}

	if (authors) {
		const authorsData = await db
			.select({
				uuid: schema.user.uuid,
				email: schema.user.email,
				name: schema.user.name,
				surname: schema.user.surname,
				degree: schema.user.degree,
				editor: schema.userTextbookLinker.editor,
				owner: schema.userTextbookLinker.owner,
			})
			.from(schema.user)
			.innerJoin(
				schema.userTextbookLinker,
				eq(schema.user.id, schema.userTextbookLinker.user),
			)
			.where(eq(schema.userTextbookLinker.textbook, textbook[0].id));
		(textbook[0] as TextbookType).authors = authorsData.map((v) => {
			return {
				uuid: v.uuid!,
				email: v.email!,
				name: v.name!,
				surname: v.surname!,
				degree: v.degree!,
				isEditor: v.editor!,
				isTeacher: false,
				isOwner: v.owner!,
			} as UserTypeLimited;
		});
	}

	if (chapters) {
		const chaptersData = await db
			.select({
				id: schema.chapter.id,
				uuid: schema.chapter.uuid,
				name: schema.chapter.name,
				summary: schema.chapter.summary,
				order: schema.chapter.order,
			})
			.from(schema.chapter)
			.where(eq(schema.chapter.textbook, textbook[0].id));
		(textbook[0] as TextbookType).chapters =
			chaptersData.sort((a, b) => a.order - b.order) ?? [];
		const chaptersIds = chaptersData.map((c) => c.id!);

		//articles limited
		for (
			let i = 0;
			i < (textbook[0] as TextbookType).chapters!.length;
			i++
		) {
			const articlesData = await db
				.select({
					uuid: schema.article.uuid,
					name: schema.article.name,
					order: schema.article.order,
				})
				.from(schema.article)
				.where(eq(schema.article.chapter, chaptersIds[i]));
			(textbook[0] as TextbookType).chapters![i].articlesLimited =
				articlesData.sort((a, b) => a.order - b.order) ?? [];
		}
	}

	return textbook[0];
};

//for search function
export const loadTextbookText = async (textbookUuid: string) => {
	const db = getRequestEvent().locals.db;

	const textbook = await db
		.select({
			id: schema.textbook.id,
			uuid: schema.textbook.uuid,
			description: schema.textbook.description,
		})
		.from(schema.textbook)
		.where(eq(schema.textbook.uuid, textbookUuid))
		.limit(1);

	if (textbook.length === 0) {
		return [];
	}

	const chapters = await db
		.select({
			id: schema.chapter.id,
			name: schema.chapter.name,
			description: schema.chapter.description,
			uuid: schema.chapter.uuid,
		})
		.from(schema.chapter)
		.where(eq(schema.chapter.textbook, textbook[0].id));

	const articles = await db
		.select({
			uuid: schema.article.uuid,
			name: schema.article.name,
			text: schema.article.text,
			order: schema.article.order,
			chapterUuid: schema.chapter.uuid,
		})
		.from(schema.article)
		.innerJoin(
			schema.chapter,
			eq(schema.article.chapter, schema.chapter.id),
		)
		.where(
			inArray(
				schema.article.chapter,
				chapters.map((c) => c.id),
			),
		);

	return [
		...articles.map((article) => ({
			uuid: article.uuid,
			name: article.name,
			text: article.text,
			article: true,
			chapter: false,
			chapterUuid: article.chapterUuid,
		})),
		...chapters.map((chapter) => ({
			uuid: chapter.uuid,
			name: chapter.name,
			text: chapter.description,
			article: false,
			chapter: true,
			chapterUuid: chapter.uuid,
		})),
		{
			uuid: textbook[0].uuid,
			name: '',
			text: textbook[0].description,
			article: false,
			chapter: false,
			chapterUuid: '',
		},
	];
};
