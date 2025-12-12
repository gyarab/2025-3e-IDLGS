import { type RequestEvent } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

const limiter = new RateLimiter({
	// A rate is defined as [number, unit]
	IPUA: [5, 's'] // IP + User Agent limiter
});

//returns if passes check
export const checkLimit = async (event: RequestEvent) => {
	if (event.isSubRequest) return true;
	if ((await limiter.check(event)).limited) {
		return false;
	}
	return true;
};
