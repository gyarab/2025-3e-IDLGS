export const load = async (event) => {
	return {
		user: (await event.parent()).user,
	};
};
