import { loadTextbookText } from '$lib/server/loaders/textbook.js';

export const load = async (event) => {
	return {
		text: await loadTextbookText(event.params.id),
	};
};

export const actions = {};
