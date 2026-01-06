import type { UserType } from './types';

export const getImageBackgroundClassRaw = (id: number) => {
	switch (id) {
		case 1:
			return 'bg-[url(/bg/leaves.jpg)] bg-contain bg-fixed';
	}
};

export const getImageBackgroundClass = (user: UserType) => {
	return getImageBackgroundClassRaw(user.id);
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

export const MAX_TEXTBOOK_LETTERS = 50;
