import { type Handle, type ServerInit } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { createUser } from '$lib/server/user';
import { env } from '$env/dynamic/private';
import * as dataSchema from '$lib/server/db/schema.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace('%paraglide.lang%', locale),
		});
	});

//https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
//If something doesn't work: play around with this.
const securityHeaders = {
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
	'Permissions-Policy': 'camera=(), microphone=(), interest-cohort=()',
	'Cross-Origin-Resource-Policy': 'same-site',
	'Cross-Origin-Embedder-Policy': 'credentialless',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'X-Frame-Options': 'SAMEORIGIN',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
};

const handleSecurity: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	Object.entries(securityHeaders).forEach(([header, value]) =>
		response.headers.set(header, value),
	);
	return response;
};

const handleDatabase: Handle = async ({ event, resolve }) => {
	event.locals.db = drizzle(
		postgres(event.platform?.env.HYPERDRIVE.connectionString as string, {
			prepare: false,
			max: 1,
			max_lifetime: 60,
		}),
		{ schema: dataSchema },
	);

	return resolve(event);
};

//dev only
const handleDefaultUser: Handle = async ({ event, resolve }) => {
	if(env.DEV == "true") {
		if ((await event.locals.db.select().from(dataSchema.user)).length == 0) {
			await createUser(
				event.locals.db,
				env.DEFAULT_EMAIL,
				env.DEFAULT_PASSWORD,
				new Date(2008, 4, 25, 5, 31, 0, 0),
				'pl',
				true,
			);
		}
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleSecurity, handleDatabase, handleDefaultUser);

export const init: ServerInit = async () => {};
