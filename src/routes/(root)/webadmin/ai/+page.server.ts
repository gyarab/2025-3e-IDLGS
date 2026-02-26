import { formRunner } from '$lib/server/form/runner';

export const actions = {
	testAI: async (event) => {
		return await formRunner(
			['prompt'],
			async (event, formData, cookies, user) => {
				const prompt = formData['prompt'];
			},
		);
	},
};
