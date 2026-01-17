import { browser } from '$app/environment';
import type { UserType } from './types';
import hljs from 'highlight.js';

//config values

export const MARKDOWN_CONFIG_OPTIONS = {
	html: true,
	linkify: true,
	typographer: true,
	xhtmlOut: true,
	langPrefix: 'language-',
	highlight: (str: string, lang: string) => {
		return hljs.highlightAuto(str, [lang]).value;
	},
};

export const MAX_TEXTBOOK_LETTERS = 50;

export const ABOUT_ANIMATION_FIRST = {
	duration: 300,
	delay: 100,
	y: 0,
	x: -100,
	opacity: 0,
};
export const ABOUT_ANIMATION_SECOND = {
	duration: 300,
	delay: 500,
	y: 0,
	x: 500,
	opacity: 0,
};

export const MAX_MESSAGE_LENGTH = 1000; //feedback message max length

export const FEEDBACK_TARGET_MAIL = 'martin.bykov.s@gyarab.cz';

export const getImageBackgroundClassRaw = (id: number) => {
	switch (id) {
		case 1:
			return 'bg-[url(/bg/leaves.jpg)] bg-contain bg-fixed';
	}
};

export const getImageBackgroundClass = (user: UserType | undefined) => {
	if (user === undefined) return '';
	return getImageBackgroundClassRaw(user.background);
};

export const isInViewport = (element: HTMLElement): Promise<boolean> => {
	return new Promise((resolve) => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					observer.disconnect();
					resolve(true);
				}
			},
			{ root: null },
		);

		observer.observe(element);
	});
};

export const asyncDelay = (time: number) =>
	new Promise((resolve) => setTimeout(() => resolve(undefined), time));

export const checkPassword = (
	password: string,
): {
	all: boolean;
	length: boolean;
	capital: boolean;
	lowercase: boolean;
	number: boolean;
	special: boolean;
} => {
	//i love regex -MB
	const length = password.length > 10;
	const capital = /[A-Z]+/gu.test(password);
	const lowercase = /[a-z]+/gu.test(password);
	const number = /[0-9]+/gu.test(password);
	const special = /[^a-zA-Z0-9]+/gu.test(password);

	return {
		length,
		capital,
		lowercase,
		number,
		special,
		all: length && capital && lowercase && number && special,
	};
};

export const enableScroll = () => {
	if (!browser) return;

	document.body.style.overflow = 'auto';
	document.body.style.maxHeight = 'none';
};

export const disableScroll = () => {
	if (!browser) return;

	document.body.style.overflow = 'hidden';
	document.body.style.maxHeight = '100vh';
};

export const validateDate = (
	day: number,
	month: number,
	year: number,
): boolean => {
	if (
		!Number.isInteger(day) ||
		!Number.isInteger(month) ||
		!Number.isInteger(year)
	) {
		return false;
	}

	return (
		year >= 1900 &&
		year <= new Date().getFullYear() &&
		month >= 1 &&
		month <= 12 &&
		day >= 1 &&
		day <=
			(month == 2
				? (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
					? 29
					: 28
				: [4, 6, 9, 11].includes(month)
					? 30
					: 31)
	);
};

export const writeDegree = (degree: string) => {
	switch (degree) {
		case 'bc':
			return 'Bc.';
		case 'mgr':
			return 'Mgr.';
		case 'ing':
			return 'Ing.';
		case 'dr':
			return 'Ph.D.';
		case 'rndr':
			return 'RNDr.';
		default:
			return '';
	}
};

export const isInQuery = (query: string, ...strings: string[]): boolean => {
	const lowerQuery = query.toLowerCase();

	for (const str of strings) {
		//if string in query
		if (str.toLowerCase().includes(lowerQuery)) return true;
	}

	return false;
};
