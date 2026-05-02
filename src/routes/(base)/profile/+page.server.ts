import { redirect } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) return redirect(302, '/login');

	const userId = (
		await event.locals.db
			.select({ id: databaseSchema.user.id })
			.from(databaseSchema.user)
			.where(eq(databaseSchema.user.uuid, pd.user.uuid))
			.limit(1)
	)[0].id;

	const textbooks = await event.locals.db
		.select({
			title: databaseSchema.textbook.title,
			uuid: databaseSchema.textbook.uuid,
		})
		.from(databaseSchema.textbook)
		.leftJoin(
			databaseSchema.textbookUserLinker,
			eq(
				databaseSchema.textbookUserLinker.textbookId,
				databaseSchema.textbook.id,
			),
		)
		.where(eq(databaseSchema.textbookUserLinker.userId, userId));

	return {
		textbooks,
	};
};
