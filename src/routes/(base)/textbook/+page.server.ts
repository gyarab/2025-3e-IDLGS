import { schema as databaseSchema } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { eq, desc } from 'drizzle-orm';
import { resolve } from '$app/paths';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));

	return {
		textbooks: await event.locals.db
			.select()
			.from(databaseSchema.textbook)
			.leftJoin(
				databaseSchema.textbookUserLinker,
				eq(
					databaseSchema.textbook.id,
					databaseSchema.textbookUserLinker.textbookId,
				),
			)
			.leftJoin(
				databaseSchema.user,
				eq(
					databaseSchema.textbookUserLinker.userId,
					databaseSchema.user.id,
				),
			)
			.where(eq(databaseSchema.user.uuid, pd.user.uuid))
			.orderBy(desc(databaseSchema.textbook.lastEditedAt)),
	};
};
