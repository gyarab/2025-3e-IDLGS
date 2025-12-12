import { db } from '$lib/server/db/index.js';
import * as dataSchema from "$lib/server/db/schema.js";
import { fail, redirect } from '@sveltejs/kit';
import { checkLimit } from '$lib/server/rate/index.js';

export const load = async (event) => {
	if (!(await event.parent()).user) {
		redirect(303, '/login');
	}
};

export const actions = {
	createTextbook: async (event) => {

	},
	copyTextbook: async (event) => {

	},
	createCourse: async (event) => {

	},
};
