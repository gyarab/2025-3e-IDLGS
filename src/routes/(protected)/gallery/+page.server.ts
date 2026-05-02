import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));


}

export const actions = {
	addResource: async (event) => {

	},
	editResource: async (event) => {

	},
	deleteResource: async (event) => {

	},
};