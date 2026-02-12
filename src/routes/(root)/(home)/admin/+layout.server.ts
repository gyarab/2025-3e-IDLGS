import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = (await event.parent()).user;

	if(!user) {
		redirect(303, '/login');
	}

	if (!user.admin || !user.schoolDirector) {
		redirect(303, '/home');
	}

	return {
		user: user,
	}
};