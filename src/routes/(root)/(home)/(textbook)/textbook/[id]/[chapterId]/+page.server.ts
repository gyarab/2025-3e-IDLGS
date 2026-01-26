import { loadChapter } from '$lib/server/loaders/chapter.js';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const chapterId = event.params.chapterId;

	const chapter = await loadChapter(chapterId);

	if(!chapter){
		return error(404, 'Chapter not found');
	}
	
	return {
		chapter: chapter,
	}
};

export const actions = {
	//TODO name, content update, AI summary
};
