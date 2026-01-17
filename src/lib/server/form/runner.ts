import type { ActionFailure, Cookies, RequestEvent } from '@sveltejs/kit';
import { getUser } from '$lib/server/user/index.js';
import { error, fail } from '@sveltejs/kit';
import type { UserType } from '$lib/types';
import { getRequestEvent } from '$app/server';

export const formRunner = async (
	requiredFields: string[],
	runner: (
		event: RequestEvent,
		formData: { [key: string]: any },
		cookies: Cookies,
		user: UserType,
		formDataRaw: FormData,
	) => Promise<ActionFailure | unknown>,
) => {
	const event = getRequestEvent();

	const user = await getUser();
	if (!user) return fail(401);

	const formData = await event.request.formData();

	for (let i = 0; i < requiredFields.length; i++) {
		if (!formData.has(requiredFields[i])) return fail(400);
	}

	let object: { [key: string]: any } = {};
	for (let i = 0; i < requiredFields.length; i++) {
		object[requiredFields[i]] = formData.get(requiredFields[i])?.toString();
	}

	const value = await runner(event, object, event.cookies, user, formData);
	return value;
};

export const apiRunner = async (
	requiredFields: string[],
	runner: (
		event: RequestEvent,
		data: { [key: string]: any },
		user: UserType,
	) => Promise<Response>,
) => {
	const event = getRequestEvent();

	const user = await getUser();
	if (!user) return error(401);

	const data = await event.request.json();

	for(const field of requiredFields) {
		//empty string allowed
		if(!(field in data) || data[field] === null || data[field] === undefined) return error(400);
	}

	const value = await runner(event, data, user);
	return value;
};
