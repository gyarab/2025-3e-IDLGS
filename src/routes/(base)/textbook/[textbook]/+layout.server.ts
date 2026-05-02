import type { TextbookType } from '$lib/types';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const textbookRawData = (await event.locals.db
		.select()
		.from(databaseSchema.textbook)
		.where(eq(databaseSchema.textbook.uuid, event.params.textbook))
		.limit(1))[0];

	const users = await event.locals.db
		.select({
		name: databaseSchema.user.name,
		middlename: databaseSchema.user.middlename,
		surname: databaseSchema.user.surname,
		uuid: databaseSchema.user.uuid,
		profilePicture: databaseSchema.resource.url,
		degree: databaseSchema.user.degree,
		institution: databaseSchema.user.institution,
		})
		.from(databaseSchema.user)
		.leftJoin(
			databaseSchema.resource,
			eq(databaseSchema.user.profilePicture, databaseSchema.resource.id),
		)
		.leftJoin(
			databaseSchema.textbookUserLinker,
			eq(
				databaseSchema.user.id,
				databaseSchema.textbookUserLinker.userId,
			),
		)
		.where(
			eq(databaseSchema.textbookUserLinker.textbookId, textbookRawData.id),
		);

	const textbook: TextbookType = {
		uuid: textbookRawData.uuid,
		title: textbookRawData.title,
		description: textbookRawData.description,
		lastEditedAt: textbookRawData.lastEditedAt,
		r: textbookRawData.r,
		g: textbookRawData.g,
		b: textbookRawData.b,
		authors: users,
		educationLevel: textbookRawData.educationLevel,
	};

	return {
		textbook: textbook
	};
};
