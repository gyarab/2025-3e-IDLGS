import { fail } from '@sveltejs/kit';

export const actions = {
	setDarkMode: async (event) => {
		const data = await event.request.formData();
		if(!data.has("darkMode")) return fail(400);

		const value = data.get("darkMode");
		if(value != 'light' && value != 'dark') return fail(400);

		event.cookies.set("darkMode", value, {
			path: "/",
		});
	},
};