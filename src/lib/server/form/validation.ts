import type { ActionFailure, RequestEvent } from '@sveltejs/kit';
import { isActionFailure } from '@sveltejs/kit';

//TODO
export const formRunner = async (
	event: RequestEvent,
	f: () => Promise<void>,
): Promise<void | ActionFailure> => {};
