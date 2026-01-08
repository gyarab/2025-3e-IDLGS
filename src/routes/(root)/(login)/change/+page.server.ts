import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const user = (await event.parent()).user;
	if(!user) {
		redirect(303, '/login');
	}
	else if (user?.setPassword) {
		redirect(303, '/home');
	}
};

export const actions = {

};