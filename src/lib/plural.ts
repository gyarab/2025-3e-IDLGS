import { m } from './paraglide/messages';
import { getLocale } from './paraglide/runtime';

export const letters = (n: number): string => {
	if (n === 1) return m.letters1();
	if (getLocale() === 'en') return m.lettersP();

	//slavic languages have different plural forms for 2, 3 and 4
	if (n % 10 === 2) return m.letters2();
	if (n % 10 === 3) return m.letters3();
	if (n % 10 === 4) return m.letters4();
	return m.lettersP();
};

export const files = (n: number): string => {
	if (n === 1) return m.files1();
	if (getLocale() === 'en') return m.filesP();

	if (n % 10 === 2) return m.files2();
	if (n % 10 === 3) return m.files3();
	if (n % 10 === 4) return m.files4();
	return m.filesP();
};

export const exercises = (n: number): string => {
	if (n === 1) return m.exercises1();
	if (getLocale() === 'en') return m.exercisesP();

	if (n % 10 === 2) return m.exercises2();
	if (n % 10 === 3) return m.exercises3();
	if (n % 10 === 4) return m.exercises4();
	return m.exercisesP();
};

export const textbooks = (n: number): string => {
	if (n === 1) return m.textbooks1();
	if (getLocale() === 'en') return m.textbooksP();

	if (n % 10 === 2) return m.textbooks2();
	if (n % 10 === 3) return m.textbooks3();
	if (n % 10 === 4) return m.textbooks4();
	return m.textbooksP();
};

export const chapters = (n: number): string => {
	if (n === 1) return m.chapters1();
	if (getLocale() === 'en') return m.chaptersP();

	if (n % 10 === 2) return m.chapters2();
	if (n % 10 === 3) return m.chapters3();
	if (n % 10 === 4) return m.chapters4();
	return m.chaptersP();
};

export const articles = (n: number): string => {
	if (n === 1) return m.articles1();
	if (getLocale() === 'en') return m.articlesP();

	if (n % 10 === 2) return m.articles2();
	if (n % 10 === 3) return m.articles3();
	if (n % 10 === 4) return m.articles4();
	return m.articlesP();
};

export const resources = (n: number): string => {
	if (n === 1) return m.resources1();
	if (getLocale() === 'en') return m.resourcesP();

	if (n % 10 === 2) return m.resources2();
	if (n % 10 === 3) return m.resources3();
	if (n % 10 === 4) return m.resources4();
	return m.resourcesP();
};

export const points = (n: number): string => {
	if (n === 1) return m.points1();
	if (getLocale() === 'en') return m.pointsP();

	if (n % 10 === 2) return m.points2();
	if (n % 10 === 3) return m.points3();
	if (n % 10 === 4) return m.points4();
	return m.pointsP();
};
