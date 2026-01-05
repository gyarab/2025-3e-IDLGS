import { formRunner } from '$lib/server/form/runner.js';


export const load = async () => {};

export const actions = {
	setPassword: async (event) => {
		await formRunner(
			event, 
			[], 
			async () => {

			}
		)

		//TODO
	},
};
