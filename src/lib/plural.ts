import { m } from './paraglide/messages';

export const writeDays = (day: number) => {
	if (day == 0) return m.day0();
	if (day == 1) return m.day1();
	if (day % 10 === 2 || day % 10 === 3 || day % 10 === 4) return m.day234();
	else return m.day5();
};
