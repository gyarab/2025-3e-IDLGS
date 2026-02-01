import { formRunner } from '$lib/server/form/runner.js';

export const actions = {
	updateName: async () => {
		return await formRunner(
			['name'],
			async (event, formData, cookies, user) => {},
		);
	},
	updateContent: async () => {
		return await formRunner(
			['content'],
			async (event, formData, cookies, user) => {},
		);
	},
};
