import type { UserTypeLimited } from './types';
import type { RequestEvent } from '@sveltejs/kit';

//TODO change way we get country from request

export type LogType = 'INFO' | 'WEIRD' | 'ERROR';

export const writeLog = (
	event: RequestEvent,
	type: LogType,
	error: string,
	user?: UserTypeLimited,
) => {
	const date = new Date();
	console.log(
		`[DATE ${date.getDate()}] [MONTH ${date.getMonth() + 1}] [YEAR ${date.getFullYear()}]`,
		`[HOUR ${date.getHours()}] [MINUTE ${date.getMinutes()}] [SECOND ${date.getSeconds()}]`,
		`[TYPE ${type}] [URL ${event.route.id}] [COUNTRY ${event.request.headers.get('CF-IPCountry')}]`,
		`[UUID ${user?.uuid ?? 'unknown'}] [ERROR ${error}]`,
	);
};

export const writeLogDeleteAccount = (
	event: RequestEvent,
	user: UserTypeLimited,
) => {
	const date = new Date();
	console.log(
		`[DATE ${date.getDate()}] [MONTH ${date.getMonth() + 1}] [YEAR ${date.getFullYear()}]`,
		`[HOUR ${date.getHours()}] [MINUTE ${date.getMinutes()}] [SECOND ${date.getSeconds()}]`,
		`[URL ${event.route.id}] [COUNTRY ${event.request.headers.get('CF-IPCountry')}]`,
		`[UUID  ${user.uuid}] [ACCOUNT DELETED: EMAIL ${user.email} NAME ${user.name} SURNAME ${user.surname}]`,
	);
};
