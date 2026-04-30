import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { count } from 'drizzle-orm';
import { hashPassword } from '$lib/server/user';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale)),
		});
	});

const handleDatabase: Handle = async ({ event, resolve }) => {
	if (!process.env.DATABASE_URL) throw Error('DATABASE_URL not set!');

	event.locals.db = drizzle(
		postgres(process.env.DATABASE_URL, {
			prepare: false,
			max: 1,
			max_lifetime: 1
		}),
		{ schema: databaseSchema }
	);


	return resolve(event);
};

const handleInitialUser: Handle = async ({ event, resolve }) => {
	if((await event.locals.db.select({
		count: count()
	}).from(databaseSchema.user))[0].count === 0) {
		if(!process.env.DEFAULT_EMAIL || !process.env.DEFAULT_PASSWORD) {
			throw Error('No users in database and DEFAULT_EMAIL or DEFAULT_PASSWORD not set!');
		}

		const password = hashPassword(process.env.DEFAULT_PASSWORD);		

		await event.locals.db.insert(databaseSchema.user).values({
			name: "Administrator",
			surname: "Account",
			middlename: "",
			email: process.env.DEFAULT_EMAIL,
			registeredAt: new Date(),
			description: "This is the default administrator account.",
			password: password.password,
			salt: password.salt,
			iterations: password.iterations,
		});
	}

	return resolve(event);
}

const handleStandaloneMode: Handle = async ({ event, resolve }) => {
	if(!process.env.MODE || process.env.MODE == "normal") return resolve(event);

	//TODO standalone textbook mode (uuid)

	return resolve(event);
};

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

export const handle: Handle = sequence(
	handleSecurity,
	handleParaglide,
	handleStandaloneMode,
	handleDatabase,
	handleInitialUser,
);
