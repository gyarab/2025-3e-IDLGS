import Fuse from 'fuse.js';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { UserTypeInfo } from '$lib/types.js';
import { error, json } from '@sveltejs/kit';

export const POST = async (event) => {
	const data = await event.request.json();
	if (!data.query || !data.exclude || typeof data.query !== 'string' || !Array.isArray(data.exclude)) return error(400);

	if (data.query.length < 3) return json({ results: [] });

	const users: UserTypeInfo[] = await event.locals.db
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
		);

	const fuse = new Fuse(users, {
		keys: ['name', 'surname', 'middlename', 'institution'],
		includeScore: false,
		includeMatches: false,
		ignoreDiacritics: true,
		isCaseSensitive: false,
	});

	const results = fuse.search(data.query, { limit: 5 }).map((result) => result.item).filter((user) => !data.exclude.includes(user.uuid));

	return json({ results });
};