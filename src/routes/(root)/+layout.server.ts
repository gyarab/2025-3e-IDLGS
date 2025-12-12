import { getUser } from '$lib/server/user'

export const load = async (event) => {
	return {
		user: await getUser(event)
	};
}