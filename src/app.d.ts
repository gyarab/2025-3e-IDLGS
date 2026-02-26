// See https://svelte.dev/docs/kit/types#app.d.ts

import type { DBType } from '$lib/server/db/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DBType;
		}
		// interface PageData {}
		// interface PageState {}
		//interface Platform {};
	}
	interface Window {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		turnstile: any;
	}
}

export { };
