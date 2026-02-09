//Damerau–Levenshtein distance
//https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance#Optimal_string_alignment_distance
//https://www.geeksforgeeks.org/dsa/damerau-levenshtein-distance/

import type { SearchResultType, TextbookDefinitionType } from '$lib/types';

//Wagner-Fischer algorithm for Damerau-Levenshtein distance
export const wordDistance = (a: string, b: string, max: number): number => {
	//a, b are one-indexed
	let d = new Array(a.length + 1);

	//build matrix
	for (let i = 0; i <= a.length; i++) {
		d[i] = new Array(b.length + 1);
		d[i][0] = i;
	}
	for (let j = 0; j <= b.length; j++) {
		d[0][j] = j;
	}

	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			//minimum of deletion, insertion, substitution
			d[i][j] = Math.min(
				d[i - 1][j] + 1, //deletion
				d[i][j - 1] + 1, //insertion
				d[i - 1][j - 1] + Number(a[i - 1] !== b[j - 1]), //substitution
			);

			//difference from std. Levenshtein
			//transposition: cost always 1
			if (
				i > 1 &&
				j > 1 &&
				a[i - 1] === b[j - 2] &&
				a[i - 2] === b[j - 1]
			) {
				d[i][j] = Math.min(
					d[i][j],
					d[i - 2][j - 2] + 1, //transposition
				);
			}

			//bailout - we build matrix row by row, we can exit
			//https://www.youtube.com/watch?v=eneSE4vVAOs
			//video does not have code!
			if (d[i][j] > max) {
				return max + 1;
			}
		}
	}

	return d[a.length][b.length];
};

//similarity score: (length - changes) / maximum distance
export const wordSimilarity = (a: string, b: string): number => {
	const maxLen = Math.max(a.length, b.length);
	const distance = wordDistance(a, b, maxLen * 0.8);
	if (maxLen === 0) return 1; //both strings are empty
	return (maxLen - distance) / maxLen;
};

export const searchPreprocess = (text: string): string[] => {
	return text
		.toLocaleLowerCase()
		.normalize('NFD') //remove accents
		.replaceAll(/\$([^\$]+)\$[^\$]?/gmsu, (match) => {
			return '?'.repeat(match.length);
		}) //remove math
		.replaceAll('\n', ' ')
		.replaceAll(/[^A-Za-z0-9 ]/g, ' ')
		.split(' ');
};

//returns start indexes, this is "good enough" for our use case
export const searchInText = (
	query: string,
	words: string[],
): SearchResultType[] => {
	if (query.length >= 30) return [];

	const queries: string[] = query.toLocaleLowerCase().split(' ');
	if (queries.length > 3) return [];

	let results: SearchResultType[] = [];
	for (const activeQuery of queries) {
		let letterId = 0;

		for (const word of words) {
			if (word.length === 0) {
				letterId += 1;
				continue;
			}

			//first character
			//4 characters from the word is too much

			if (
				word[0] != activeQuery[0] ||
				Math.abs(word.length - activeQuery.length) >= 4
			) {
				letterId += word.length;
				letterId += 1;
				continue;
			}

			const similarity = wordSimilarity(activeQuery, word);
			if (similarity >= 0.75) {
				results.push({
					start: letterId,
					end: letterId + word.length,
					similarity: similarity,
				});
			}

			letterId += word.length;
			letterId += 1;
		}
	}

	//descending
	return results.sort((a, b) => b.similarity - a.similarity);
};

//adds tooltip in text
export const highlightInText = (
	text: string,
	defintions: TextbookDefinitionType,
): string => {
	return ''; //TODO return highlighted text
};
