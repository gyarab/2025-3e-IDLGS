import type { UserTypeFull } from '$lib/types';
import type { ActionFailure } from '@sveltejs/kit';
import { fail, isActionFailure } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import type { DBType } from '../db';
import { eq } from 'drizzle-orm';

export type FormRunnerResult = unknown | void | ActionFailure<any>;
export type FormDataType = { [field: string]: any };

export const formRunner = async (
	event: any,
	fields: string[],
	userNeeded: boolean,
	f: (
		data: FormDataType,
		user: UserTypeFull | undefined,
		formData?: FormData,
	) => Promise<FormRunnerResult>,
	ignoredItems: string[] = [],
): Promise<FormRunnerResult> => {
	const formData: FormData = await event.request.formData();

	const data: FormDataType = {};
	for (const field of fields) {
		if (!formData.has(field)) return fail(400);
		else if (!ignoredItems.includes(field)) data[field] = formData.get(field) as string;
	}

	let user: UserTypeFull | undefined = undefined;

	if (userNeeded) {
		const session = event.cookies.get('sessionTokenIDLGS');
		if (!session) return fail(401);

		const value = (
			await (event.locals.db as DBType)
				.select()
				.from(databaseSchema.user)
				.leftJoin(
					databaseSchema.resource,
					eq(
						databaseSchema.user.profilePicture,
						databaseSchema.resource.id,
					),
				)
				.leftJoin(
					databaseSchema.session,
					eq(databaseSchema.session.userId, databaseSchema.user.id),
				)
				.where(eq(databaseSchema.session.token, session))
		)[0];

		if (!value) return fail(401);

		user = {
			...value.user,
			profilePicture: value.resource?.url ?? null,
		};
	}

	try {
		return await f(data, user, formData);
	} catch (e) {
		if (isActionFailure(e)) return e;
		else throw e;
	}
};
