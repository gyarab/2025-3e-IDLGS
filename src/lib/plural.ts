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
