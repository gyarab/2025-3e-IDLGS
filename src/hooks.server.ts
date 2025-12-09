import { error, type Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { checkLimit } from '$lib/server/rate';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const handleRateLimit: Handle = async ({ event, resolve }) => {
	if(await checkLimit(event)) {
		return resolve(event);
	}
	return error(429);
};

export const handle: Handle = sequence(handleParaglide, handleRateLimit);
