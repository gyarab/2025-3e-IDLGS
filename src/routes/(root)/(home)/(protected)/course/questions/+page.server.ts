//TODO teachers only

import { formRunner } from '$lib/server/form/runner';

export const load = async (event) => {

};

export const actions = {
	addQuestion: async () => {
		return await formRunner([], async (
			event, formData, cookies, user
		) => {
			//TODO
		});
	},
	generateQuestions: async () => {
		return await formRunner([], async (
			event, formData, cookies, user
		) => {
			//TODO
		});
	},
	modifyQuestion: async () => {
		return await formRunner([], async (
			event, formData, cookies, user
		) => {
			//TODO
		});
	},
	deleteQuestion: async () => {
		return await formRunner([], async (
			event, formData, cookies, user
		) => {
			//TODO
		});
	},
};