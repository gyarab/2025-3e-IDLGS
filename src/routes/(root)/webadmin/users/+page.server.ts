import { schema } from '$lib/server/db/mainSchema';
import { desc } from 'drizzle-orm';

export const load = async (event) => {
	return {
		users: await event.locals.db
			.select()
			.from(schema.user)
			.orderBy(desc(schema.user.createdAt)),
	};
};

export const actions = {
	deleteUser: async (event) => {},
	updateUser: async (event) => {},
	addUser: async (event) => {},
};
