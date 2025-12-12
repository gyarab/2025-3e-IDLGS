import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import * as dataSchema from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	let cookie = event.cookies.get('session');

	await db.delete(dataSchema.userSession).where(eq(dataSchema.userSession.token, cookie as string));

	event.cookies.set('session', 'not anymore there is a blanket', { path: '/' });
	redirect(303, '/');
};
