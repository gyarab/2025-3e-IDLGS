//Damerau–Levenshtein distance
//https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance#Optimal_string_alignment_distance
//https://www.geeksforgeeks.org/dsa/damerau-levenshtein-distance/

import type { TextbookDefinitionType } from '$lib/types';

//Wagner-Fischer algorithm for Damerau-Levenshtein distance
export const wordDistance = (a: string, b: string): number => {
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
		}
	}

	return d[a.length][b.length];
};

//similarity score: (length - changes) / maximum distance
export const wordSimilarity = (a: string, b: string): number => {
	const distance = wordDistance(a, b);
	const maxLen = Math.max(a.length, b.length);
	if (maxLen === 0) return 1; //both strings are empty
	return (maxLen - distance) / maxLen;
};

//adds tooltip in text
export const highlightInText = (
	text: string,
	defintions: TextbookDefinitionType,
): string => {
	return ''; //TODO return highlighted text
};
