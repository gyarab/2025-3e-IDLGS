import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { m } from '$lib/paraglide/messages';
import { error } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));
	if(!pd.textbook) return error(404, m.textbookDoesntExist());

	const textbookId = (await event.locals.db
		.select({ id: databaseSchema.textbook.id })
		.from(databaseSchema.textbook)
		.where(eq(databaseSchema.textbook.uuid, pd.textbook.uuid))
		.limit(1)
	)[0];

	return {
		authors: await event.locals.db
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
					textbookId.id,
				),
			),
	};
}