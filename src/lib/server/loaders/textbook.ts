import type { UserType, TextbookType } from '$lib/types';
import { schema } from '$lib/server/db/mainSchema';
import { and, eq, or } from 'drizzle-orm';
import { getRequestEvent } from '$app/server';

export const loadTextbooks = async (
	user: UserType,
): Promise<TextbookType[]> => {
	const db = getRequestEvent().locals.db;

	return db
		.select({
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
		})
		.from(schema.textbook)
		.innerJoin(
			schema.userTextbookLinker,
			eq(schema.textbook.id, schema.userTextbookLinker.textbook), //join condition
		)
		.where(eq(schema.userTextbookLinker.user, user.id));
};

//also checks permissions and if logged in
export const loadSingleTextbook = async (
	user: UserType | undefined,
	textbookUuid: string,
): Promise<TextbookType | null> => {
	const db = getRequestEvent().locals.db;

	const textbook = await db
		.select({
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
		})
		.from(schema.textbook)
		.innerJoin(
			schema.userTextbookLinker,
			or(
				eq(schema.textbook.id, schema.userTextbookLinker.textbook),
				eq(schema.textbook.public, true),
			)//join condition
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

	return textbook[0];
};
