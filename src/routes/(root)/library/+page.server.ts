import { loadTextbooks } from '$lib/server/loaders/textbook.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = (await event.parent()).user;

	if(user){
		redirect(303, '/textbooks');
	}

	return {
		textbooks: loadTextbooks(user),
		user: user,
	}
}