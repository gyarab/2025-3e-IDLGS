// See https://svelte.dev/docs/kit/types#app.d.ts

import type { DBType } from '$lib/server/db/types';
import type { Ai, Hyperdrive } from '@cloudflare/workers-types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DBType;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				HYPERDRIVE: Hyperdrive;
				AI: Ai;
			};
		}
	}
	interface Window {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		turnstile: any;
	}
}

export {};
