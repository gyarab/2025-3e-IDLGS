import { loadCourses } from '$lib/server/loaders/course.js';
import { loadTextbooks } from '$lib/server/loaders/textbook.js';
import type { UserType } from '$lib/types.js';
import { MAX_TEXTBOOK_LETTERS } from '$lib';
import { formRunner } from '$lib/server/form/runner.js';
import { schema } from '$lib/server/db/mainSchema.js';

export const load = async (event) => {
	const user = (await event.parent()).user as UserType;

	return {
		courses: loadCourses(user),
		textbooks: loadTextbooks(user),
	};
};

export const actions = {
	createTextbook: async (event) => {
		return await formRunner(
			[
				'name', 'description', 'subject', 'red', 'green', 'blue', 'users', 'roles',
				'articles', 'chapters'
			],
			async (event, formData, cookies, user) => {
				//await event.locals.db.insert(schema.textbook);
			},
		);
	},
	createCourse: async (event) => {
		return await formRunner(
			[
				'name', 'description', 'subject', 'red', 'green', 'blue', 'users', 'roles',
				'grades', 'code'
			],
			async (event, formData, cookies, user) => {
				//await event.locals.db.insert(schema.course);
			},
		);
	},
};
