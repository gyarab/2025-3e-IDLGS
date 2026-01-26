import type { UserType, TextbookType, UserTypeLimited } from '$lib/types';
import { schema } from '$lib/server/db/mainSchema';
import { and, eq, or } from 'drizzle-orm';
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
		.where(or(
			eq(schema.userTextbookLinker.user, user?.id ?? -1),
			eq(schema.textbook.public, true),
		));

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
		(textbook[0] as TextbookType).chapters = chaptersData ?? [];
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
				articlesData ?? [];
		}
	}

	return textbook[0];
};