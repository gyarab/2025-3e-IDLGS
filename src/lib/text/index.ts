//Damerau–Levenshtein distance
//https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance#Optimal_string_alignment_distance
//https://www.geeksforgeeks.org/dsa/damerau-levenshtein-distance/

import type { TextbookDefinitionType } from '$lib/types';

export const wordSimilarity = (a: string, b: string): number => {
	//a, b are one-indexed
	let d = new Array(a.length + 1);

	for (let i = 0; i <= a.length; i++) {
		d[i] = new Array(b.length + 1);
		d[i][0] = i;
	}
	for (let j = 0; j <= b.length; j++) {
		d[0][j] = j;
	}

	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			let cost = 0;
			if (a[i - 1] !== b[j - 1]) {
				cost = 1;
			}

			d[i][j] = Math.min(
				d[i - 1][j] + 1, //deletion
				d[i][j - 1] + 1, //insertion
				d[i - 1][j - 1] + cost, //substitution
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

	//similarity score: (length - changes) / maximum distance
	const maxLen = Math.max(a.length, b.length);
	return (maxLen - d[a.length][b.length]) / maxLen;
};

//compute BK tree
//https://en.wikipedia.org/wiki/BK-tree
//O(n2) build, O(log n) search
//TODO

//https://en.wikipedia.org/wiki/Finite-state_machine
//https://en.wikipedia.org/wiki/Levenshtein_automaton
//O(n)

//BK tree better TODO

//adds tooltip in text
export const highlightInText = (
	text: string,
	defintions: TextbookDefinitionType,
): string => {
	return ''; //TODO return highlighted text
};
