import type { ArticleType } from "$lib/types"

export const applyArticleHistoryVersion = (uuid: string): Promise<ArticleType> => {
	//TODO

	return new Promise<ArticleType>((resolve) => {
		resolve({
			uuid: '',
			name: '',
			text: '',
			order: 0,
		});
	});
}