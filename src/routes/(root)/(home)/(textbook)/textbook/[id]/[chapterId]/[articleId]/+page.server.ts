import { loadArticle } from '$lib/server/loaders/article.js';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const articleId = event.params.articleId;

	const article = await loadArticle(articleId);

	if(!article){
		return error(404, 'Article not found');
	}

	return {
		article: article
	}
};

export const actions = {
	//TODO name, content update
};
