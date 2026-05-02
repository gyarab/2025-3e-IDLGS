import Fuse from 'fuse.js';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { TextbookType, UserTypeInfo } from '$lib/types.js';
import { error, json } from '@sveltejs/kit';

export const POST = async (event) => {
	const data = await event.request.json();
	if (!data.query || typeof data.query !== 'string') return error(400);

	if (data.query.length < 3) return json({ results: [] });

	const textbooksRaw = await event.locals.db
		.select({
			id: databaseSchema.textbook.id,
			title: databaseSchema.textbook.title,
			description: databaseSchema.textbook.description,
			uuid: databaseSchema.textbook.uuid,
			lastEditedAt: databaseSchema.textbook.lastEditedAt,
			r: databaseSchema.textbook.r,
			g: databaseSchema.textbook.g,
			b: databaseSchema.textbook.b,
			educationLevel: databaseSchema.textbook.educationLevel,
		})
		.from(databaseSchema.textbook);

	if (textbooksRaw.length === 0) return json({ results: [] });

	const fuse = new Fuse(textbooksRaw, {
		keys: ['title', 'description'],
		includeScore: false,
		includeMatches: false,
		ignoreDiacritics: true,
		isCaseSensitive: false,
	});

	const textbooks = fuse.search(data.query, { limit: 5 }).map((result) => result.item);
	let result: TextbookType[] = [];

	for (const textbook of textbooks) {
		const textbookAuthors: UserTypeInfo[] = await event.locals.db
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
				eq(
					databaseSchema.textbookUserLinker.textbookId,
					textbook.id,
				),
			);

		result.push({
			...textbook,
			authors: textbookAuthors,
		});
	}

	return json({ results: textbooks });
};