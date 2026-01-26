import { loadMessages } from '$lib/server/loaders/subjective/messages';
import type { UserType } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = (await event.parent()).user as UserType;
	
	if (!user) {
		redirect(303, '/login');
	}
	if (!user.setPassword) {
		redirect(303, '/set');
	}

	const messages = await loadMessages(user);

	return {
		user,
		messages,
	};
};
