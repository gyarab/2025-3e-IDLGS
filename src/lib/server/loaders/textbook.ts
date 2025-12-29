import type { UserType, TextbookType } from '$lib/types';
import { schema } from '$lib/server/db/mainSchema';
import type { DBType } from '../db/types';
import { eq } from 'drizzle-orm';

export const loadTextbooks = async (
	db: DBType, user: UserType,
): Promise<TextbookType[]> => {
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
		})
		.from(schema.textbook)
		.innerJoin(
			schema.userTextbookLinker,
			eq(schema.textbook.id, schema.userTextbookLinker.textbook) //join condition
		)
		.where(eq(schema.userTextbookLinker.user, user.id));
};
