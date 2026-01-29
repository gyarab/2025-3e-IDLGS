import { redirect } from '@sveltejs/kit';
import type { UserType } from '$lib/types';
import { loadDefinitions } from '$lib/server/loaders/definitions';
import { formRunner } from '$lib/server/form/runner';

export const load = async (event) => {
	const user = (await event.parent()).user as UserType | undefined;

	if (user && !user.setPassword) {
		redirect(303, '/set');
	}

	const textbook = await (await event.parent()).textbook;

	const definitions = await loadDefinitions(textbook.uuid);

	return {
		definitions,
	};
};

export const actions = {
	addDefinition: async (event) => {
		return await formRunner(
			['uuid', 'term', 'definition'],
			async (event, formData, cookies, user) => {
				//TODO
			},
		);
	},
	editDefinition: async (event) => {
		return await formRunner(
			['uuid', 'term', 'definition'],
			async (event, formData, cookies, user) => {
				//TODO
			},
		);
	},
	deleteDefinition: async (event) => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user) => {
				//TODO
			},
		);
	},
	clearDefinitions: async (event) => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user) => {
				//TODO
			},
		);
	},
};
