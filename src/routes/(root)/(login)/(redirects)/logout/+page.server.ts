import { redirect } from '@sveltejs/kit';
import { schema } from '$lib/server/db/mainSchema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const cookie = event.cookies.get('session');

	await event.locals.db
		.delete(schema.userSession)
		.where(eq(schema.userSession.token, cookie as string));

	event.cookies.set('session', 'not anymore there is a blanket', {
		path: '/',
	});
	redirect(303, '/');
};
