import type { UserType, UserTypeFull } from '$lib/types';
import type { ActionFailure } from '@sveltejs/kit';
import { fail, isActionFailure } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import type { DBType } from '../db';
import { eq } from 'drizzle-orm';

export type FormRunnerResult = void | ActionFailure<any>;
export type FormDataType = { [field: string]: string };

export const formRunner = async (
	event: any,
	fields: string[],
	userNeeded: boolean,
	f: (
		data: FormDataType,
		user: UserTypeFull | undefined,
	) => Promise<FormRunnerResult>,
): Promise<FormRunnerResult> => {
	const formData: FormData = await event.request.formData();

	const data: FormDataType = {};
	for (const field of fields) {
		if (!formData.has(field)) return fail(400);
		else data[field] = formData.get(field) as string;
	}

	let user: UserTypeFull | undefined = undefined;

	if (userNeeded) {
		const session = event.cookies.get('sessionTokenIDLGS');

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

		user = {
			...value.user,
			profilePicture: value.resource?.url ?? null
		}
	}

	try {
		return await f(data, user);
	} catch (e) {
		if (isActionFailure(e)) return e;
		else throw e;
	}
};
