import { type Handle, type ServerInit } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { createUser } from '$lib/server/user';
import { env } from '$env/dynamic/private';
import { schema } from '$lib/server/db/mainSchema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { v2 as cloudinary } from 'cloudinary';

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
		}),
		{ schema: schema },
	);

	return resolve(event);
};

//dev only
const handleDefaultUser: Handle = async ({ event, resolve }) => {
	if (!env.DEV || !env.DEFAULT_EMAIL || !env.DEFAULT_PASSWORD)
		throw Error('ENV vars not set!');

	const query = await event.locals.db.select().from(schema.user).limit(1);

	if (query.length === 0) {
		await createUser(
			env.DEFAULT_EMAIL,
			'IDLGS',
			'Administration',
			'none',
			env.DEFAULT_PASSWORD,
			new Date(2008, 4, 25, 5, 31, 0, 0),
			'pl',
			true,
			true,
			true,
			true,
			true,
			true,
			true,
		);
		console.log('Default user created.');
	} else {
	}

	return resolve(event);
};

export const handle: Handle = sequence(
	handleParaglide,
	handleSecurity,
	handleDatabase,
	handleDefaultUser,
);

export const init: ServerInit = async () => {
	cloudinary.config({
		cloud_name: env.CLOUDINARY_CLOUD_NAME,
		api_key: env.CLOUDINARY_API_KEY,
		api_secret: env.CLOUDINARY_API_SECRET,
		secure: true,
	});
};
