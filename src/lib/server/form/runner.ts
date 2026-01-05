import type { Cookies, RequestEvent } from "@sveltejs/kit";
import { getUser } from '$lib/server/user/index.js';
import { fail } from '@sveltejs/kit';

export const checkFormData = (formData: FormData, array: []): boolean => {
    for(let i = 0; i < array.length; i++) {
        if(!formData.has(array[i])) return false;
    }
    return true;
}

export const formRunner = async (
    event: RequestEvent,
    requiredFields: [],
    runner: (event: RequestEvent, formData: FormData, cookies: Cookies) => Promise<void>
) => {
    const user = await getUser(event);
	if (!user) return fail(401);

    const formData = await event.request.formData();
    if(!checkFormData(formData, requiredFields)) {
        return fail(400);
    }

    const value = await runner(event, formData, event.cookies);
    return value;
};