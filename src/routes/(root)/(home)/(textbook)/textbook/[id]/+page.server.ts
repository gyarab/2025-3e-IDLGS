import { loadSingleTextbook } from '$lib/server/loaders/textbook';
import type { UserType } from '$lib/types';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = (await event.parent()).user as UserType | undefined;

	if (user && !user.setPassword) {
		redirect(303, '/set');
	}

	const textbookUuid = event.params.id;
	const textbook = await loadSingleTextbook(user, textbookUuid);

	if(!textbook && !user) {
		redirect(303, '/login');
	}
	if(!textbook) {
		throw error(404, 'Not found');
	}

	return {
		textbook
	};
}