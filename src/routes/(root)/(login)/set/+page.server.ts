import { getUser } from '$lib/server/user/index.js';
import { fail } from '@sveltejs/kit';

export const load = async () => {};

export const actions = {
	setPassword: async (event) => {
		const user = await getUser(event);
		if (!user) return fail(401);

		//TODO add form runner with lambda
	},
};
