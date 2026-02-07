import { formRunner } from '$lib/server/form/runner';

export const load = async () => {};

export const actions = {
	addDailyChallenge: async () => {
		return await formRunner(
			[],
			async (event, formData, cookies, user, formDataRaw) => {
				//TODO
			},
		);
	},
	removeDailyChallenge: async () => {
		return await formRunner(
			[],
			async (event, formData, cookies, user, formDataRaw) => {
				//TODO
			},
		);
	},
	editDailyChallenge: async () => {
		return await formRunner(
			[],
			async (event, formData, cookies, user, formDataRaw) => {
				//TODO
			},
		);
	},
};
