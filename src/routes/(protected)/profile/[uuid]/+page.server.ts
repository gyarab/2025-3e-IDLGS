import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	return {
		thisUser: (
			await event.locals.db
				.select({
					name: databaseSchema.user.name,
					surname: databaseSchema.user.surname,
					middlename: databaseSchema.user.middlename,
					email: databaseSchema.user.email,
					registeredAt: databaseSchema.user.registeredAt,
					institution: databaseSchema.user.institution,
					description: databaseSchema.user.description,
					lastSeenAt: databaseSchema.user.lastSeenAt,
					uuid: databaseSchema.user.uuid,
					profilePicture: databaseSchema.resource.url,
					r: databaseSchema.user.r,
					g: databaseSchema.user.g,
					b: databaseSchema.user.b,
					language: databaseSchema.user.language
				})
				.from(databaseSchema.user)
				.where(eq(databaseSchema.user.uuid, event.params.uuid))
				.limit(1)
		)[0],
	};
};
