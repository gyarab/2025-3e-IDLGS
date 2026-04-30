import { TEMP_ACCENT_COLOR } from '$lib';
import type { UserType } from '$lib/types.js';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

//TODO cookies for open and close states of navbar, sidebar
export const load = async (event) => {
	const sessionToken: string | undefined = event.cookies.get('sessionToken');
	let user: UserType | undefined = undefined;

	if (sessionToken) {
		user = (
			await event.locals.db
				.select({
					name: databaseSchema.user.name,
					surname: databaseSchema.user.surname,
					middlename: databaseSchema.user.middlename,
					email: databaseSchema.user.email,
					registeredAt: databaseSchema.user.registeredAt,
					degree: databaseSchema.user.degree,
					institution: databaseSchema.user.institution,
					profilePicture: databaseSchema.resource.url,
					description: databaseSchema.user.description,
					lastSeenAt: databaseSchema.user.lastSeenAt,
					uuid: databaseSchema.user.uuid,
					r: databaseSchema.user.r,
					g: databaseSchema.user.g,
					b: databaseSchema.user.b,
				})
				.from(databaseSchema.user)
				.leftJoin(
					databaseSchema.resource,
					eq(
						databaseSchema.user.profilePicture,
						databaseSchema.resource.id,
					),
				)
				.leftJoin(
					databaseSchema.session,
					eq(databaseSchema.user.id, databaseSchema.session.userId),
				)
				.where(eq(databaseSchema.session.token, sessionToken))
				.limit(1)
		)[0];
	}

	return {
		color: TEMP_ACCENT_COLOR,
		darkMode: event.cookies.get('darkMode') == 'dark',
		navbarOpen: event.cookies.get('navbarOpen') == 'true',
		sidebarOpen: event.cookies.get('sidebarOpen') == 'true',
		user: user,
	};
};
