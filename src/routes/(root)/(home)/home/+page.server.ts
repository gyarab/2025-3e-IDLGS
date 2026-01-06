import { loadCourses } from '$lib/server/loaders/course.js';
import { loadTextbooks } from '$lib/server/loaders/textbook.js';
import type { UserType } from '$lib/types.js';
import { MAX_TEXTBOOK_LETTERS } from '$lib';
import { formRunner } from '$lib/server/form/runner.js';

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
			[],
			async (event, formData, cookies, user) => {},
		);
	},
	copyTextbook: async (event) => {
		return await formRunner(
			[],
			async (event, formData, cookies, user) => {},
		);
	},
	createCourse: async (event) => {
		return await formRunner(
			[],
			async (event, formData, cookies, user) => {},
		);
	},
};
