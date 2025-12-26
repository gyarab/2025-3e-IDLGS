import * as dataSchema from '$lib/server/db/schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { getUser } from '$lib/server/user/index.js';

export const load = async (event) => {
	if (!(await event.parent()).user) {
		redirect(303, '/login');
	}

	return {
		//TODO fix and abstract to loadCourses function
		courses: await event.locals.db.select().from(dataSchema.course),
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
