import type { DBType } from '$lib/server/db';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DBType;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
