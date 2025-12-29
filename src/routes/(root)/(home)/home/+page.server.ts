import { fail } from '@sveltejs/kit';
import { getUser } from '$lib/server/user/index.js';
import { loadCourses } from '$lib/server/loaders/course.js';
import { loadTextbooks } from '$lib/server/loaders/textbook.js';
import type { UserType } from '$lib/types.js';

export const load = async (event) => {
	const user = (await event.parent()).user as UserType;

	return {
		courses: loadCourses(event.locals.db, user),
		textbooks: loadTextbooks(event.locals.db, user),
	};
};

export const actions = {
	createTextbook: async (event) => {
		const user = await getUser(event);
		if (!user) return fail(401);
	},
	copyTextbook: async (event) => {
		const user = await getUser(event);
		if (!user) return fail(401);
	},
	createCourse: async (event) => {
		const user = await getUser(event);
		if (!user) return fail(401);
	},
};
