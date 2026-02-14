//Damerau–Levenshtein distance
//https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance#Optimal_string_alignment_distance
//https://www.geeksforgeeks.org/dsa/damerau-levenshtein-distance/
//https://www.youtube.com/watch?v=eneSE4vVAOs

import type { SearchResultType, TextbookDefinitionType } from '$lib/types';

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
	const maxLen = Math.max(a.length, b.length);
	if (maxLen === 0) return 1; //both strings are empty
	const distance = wordDistance(a, b);
	return (maxLen - distance) / maxLen;
};

export const searchPreprocess = (text: string): string[] => {
	return text
		.toLocaleLowerCase()
		.normalize('NFD').replaceAll(/[\u0300-\u036f]/g, '') //remove accents (normalize + remove Unicode block) - https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
		.replaceAll(/\$([^\$]+)\$/gmsu, (match) => {
			return '?'.repeat(match.length);
		}) //remove math
		.replaceAll(/\n/g, ' ')
		.replaceAll(/[^A-Za-z0-9]/g, ' ')
		.split(' ');
};

//TODO fix!!!!!

//returns start indexes, this is "good enough" for our use case
export const searchInText = (
	query: string,
	words: string[],
): SearchResultType[] => {
	if (query.length >= 30) return [];

	const queries: string[] = query.toLocaleLowerCase().normalize('NFD').replaceAll(/[\u0300-\u036f]/g, '').split(' ');

	let results: SearchResultType[] = [];
	let letterId = 0;
	let wordId = 0;
	let startLetterId = 0;

	while (wordId < words.length) {
		let wordOffset = 0;
		while (wordOffset < queries.length) {
			let word = words[wordId + wordOffset];

			//for each multiword query - check each word, every word has to match similarity edge

			if (word.length === 0) {
				letterId += 1;
				wordId += 1;
				if(wordId + wordOffset >= words.length) break;
				continue;
			}

			word = words[wordId + wordOffset];
			if(wordOffset === 0) {
				startLetterId = letterId;
			}

			console.log(`Comparing "${word}" with "${queries[wordOffset]}"`, wordOffset, startLetterId, letterId);

			//first character
			//4 characters from the word is too much

			if (
				word[0] != queries[wordOffset][0] ||
				Math.abs(word.length - queries[wordOffset].length) >= 4
			) {
				break;
			}

			const similarity = wordSimilarity(word, queries[wordOffset]);

			if (similarity >= 0.75) {
				if (wordOffset === queries.length - 1) {
					console.log(`Match found`);
					results.push({
						start: startLetterId,
						end: letterId + word.length, //whole query length
						similarity: similarity,
					});

					letterId += word.length;
					letterId += 1;
					wordId += wordOffset; //move after the whole query
					break;
				}

				letterId += word.length;
				letterId += 1;
				wordOffset += 1;
			}
			else {
				console.log(`Chain break`);
				break;
			}
		}

		wordId += 1;
	}

	//descending
	return results.sort((a, b) => b.similarity - a.similarity);
};