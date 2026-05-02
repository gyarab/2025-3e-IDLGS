import { error, isHttpError, redirect, type HttpError } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { ResourceType } from '$lib/types';
import type { FileType } from '$lib/server/filesave/index';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));

	const value: ResourceType[] | HttpError = await event.locals.db.transaction(
		async (tx) => {
			const textbookId = (
				await tx
					.select({ id: databaseSchema.textbook.id })
					.from(databaseSchema.textbook)
					.where(eq(databaseSchema.textbook.uuid, event.params.textbook))
					.limit(1)
			)[0]?.id;

			if (!textbookId) return error(404);

			return (await tx
				.select({
					url: databaseSchema.resource.url,
					title: databaseSchema.resource.title,
					type: databaseSchema.resource.type,
					uuid: databaseSchema.resource.uuid,
				})
				.from(databaseSchema.resource)
				.leftJoin(databaseSchema.textbookResourceLinker, eq(
					databaseSchema.resource.id,
					databaseSchema.textbookResourceLinker.resourceId,
				))
				.where(
					eq(databaseSchema.textbookResourceLinker.textbookId, textbookId),
				)).map((item) => ({
					url: item.url,
					title: item.title,
					type: item.type as FileType,
					uuid: item.uuid,
				}));
		});

	if (isHttpError(value)) throw value;

	return {
		resources: value,
	};
};

export const actions = {
	addResource: async (event) => { },
	editResource: async (event) => { },
	deleteResource: async (event) => { },
};
