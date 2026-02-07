//TODO

import { edit } from '$lib/paraglide/messages';
import { formRunner } from '$lib/server/form/runner';

export const load = async () => {
	return {};
};

export const actions = {
	editTos: async (event) => {
		return await formRunner(
			[],
			async (event, formData, cookies, user, formDataRaw) => {
				return;
			},
		);
	},
	editPrivacyPolicy: async (event) => {
		return await formRunner(
			[],
			async (event, formData, cookies, user, formDataRaw) => {
				return;
			},
		);
	},
	//modal when user logs in with info
	setUpdateWarning: async (event) => {
		return await formRunner(
			[],
			async (event, formData, cookies, user, formDataRaw) => {
				return;
			},
		);
	},
};
