import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = (await event.parent()).user;

	if (!user || !user.admin) {
		redirect(303, '/login');
	}
};
