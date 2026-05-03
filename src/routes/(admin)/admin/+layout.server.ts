import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user || !pd.user.isAdmin) redirect(302, resolve('/(protected)/login'));
};