import { fail, isActionFailure, redirect, type RequestEvent } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load = async (event) => {
	const pd = await event.parent();
	if(pd.user) redirect(302, resolve('/(base)/textbook'));
};

const cookieSetupAction = async (
	event: RequestEvent,
	name: string,
	allowed: string[],
) => {
	const data = await event.request.formData();
	if (!data.has(name)) return fail(400);

	const value = data.get(name) as string;
	if (!allowed.includes(value)) return fail(400);

	event.cookies.set(name, value, { path: '/' });

	return {};
};

export const actions = {
	setDarkMode: async (event) =>
		isActionFailure(
			await cookieSetupAction(event, 'darkMode', ['dark', 'light']),
		),
	setNavbarOpen: async (event) =>
		isActionFailure(
			await cookieSetupAction(event, 'navbarOpen', ['true', 'false']),
		),
	setSidebarOpen: async (event) =>
		isActionFailure(
			await cookieSetupAction(event, 'sidebarOpen', ['true', 'false']),
		),
};
