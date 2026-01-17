import type { UserType } from './types';
import type { RequestEvent } from '@sveltejs/kit';

export type LogType = 'INFO' | 'WEIRD' | 'ERROR';

export const writeLog = (
	event: RequestEvent,
	type: LogType,
	error: string,
	user: UserType,
) => {
	const date = new Date();
	console.log(
		`[DATE ${date.getDate()}] [MONTH ${date.getMonth() + 1}] [YEAR ${date.getFullYear()}]`,
		`[HOUR ${date.getHours()}] [MINUTE ${date.getMinutes()}] [SECOND ${date.getSeconds()}]`,
		`[TYPE ${type}] [URL ${event.route.id}] [COUNTRY ${event.request.headers.get('CF-IPCountry')}]`,
		`[UUID ${user.uuid}] [ERROR ${error}]`,
	);
};

export const writeLogDeleteAccount = (
	event: RequestEvent,
	user: UserType,
) => {
	const date = new Date();
	console.log(
		`[DATE ${date.getDate()}] [MONTH ${date.getMonth() + 1}] [YEAR ${date.getFullYear()}]`,
		`[HOUR ${date.getHours()}] [MINUTE ${date.getMinutes()}] [SECOND ${date.getSeconds()}]`,
		`[URL ${event.route.id}] [COUNTRY ${event.request.headers.get('CF-IPCountry')}]`,
		`[UUID  ${user.uuid}] [ACCOUNT DELETED: EMAIL ${user.email} NAME ${user.name} SURNAME ${user.surname}]`,
	);
}