import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = (await event.parent()).user;

	if (user) {
		if (!user.setPassword) redirect(303, '/set');
		else redirect(303, '/home');
	}
};
