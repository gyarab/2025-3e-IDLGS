import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const pd = await event.parent();
	if(!pd.user) redirect(302, resolve("/(protected)/login"));
};
