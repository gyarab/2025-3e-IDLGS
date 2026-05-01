import type { TextbookType } from '$lib/types';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const textbook = (await event.locals.db.select().from(databaseSchema.textbook).where(eq(
		databaseSchema.textbook.uuid, event.params.textbook
	)).limit(1))

	return {
		textbook: textbook
	}
};
