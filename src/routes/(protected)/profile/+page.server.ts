import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const pd = await event.parent();
	if(!pd.user) return redirect(302, '/login');

	return {};
};