import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { m } from '$lib/paraglide/messages';
import { error } from '@sveltejs/kit';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';
import { formRunner, type FormDataType } from '$lib/server/form/validation';
import type { UserTypeFull } from '$lib/types';
import { fail } from '@sveltejs/kit';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.textbook) return error(404, m.textbookDoesntExist());

	const textbookId = (
		await event.locals.db
			.select({ id: databaseSchema.textbook.id })
			.from(databaseSchema.textbook)
			.where(eq(databaseSchema.textbook.uuid, pd.textbook.uuid))
			.limit(1)
	)[0];

	return {
		chapters: (
			await event.locals.db
				.select({
					title: databaseSchema.chapter.title,
					uuid: databaseSchema.chapter.uuid,
					order: databaseSchema.chapter.order,
					textbookId: databaseSchema.chapter.textbookId,
				})
				.from(databaseSchema.chapter)
				.where(eq(databaseSchema.chapter.textbookId, textbookId.id))
				.orderBy(asc(databaseSchema.chapter.order))
		).map((c) => ({
			...c,
			textbookId: undefined,
		})),
	};
};

export const actions = {
	deleteTextbook: async (event) => {
		return await formRunner(
			event,
			['uuid'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				const tb = (
					await event.locals.db
						.select({ id: databaseSchema.textbook.id })
						.from(databaseSchema.textbook)
						.where(eq(databaseSchema.textbook.uuid, data.uuid))
						.limit(1)
				)[0];

				if (!tb) return fail(404);

				// only author can delete
				const linkerRows = await event.locals.db
					.select({
						userId: databaseSchema.textbookUserLinker.userId,
					})
					.from(databaseSchema.textbookUserLinker)
					.where(
						eq(databaseSchema.textbookUserLinker.textbookId, tb.id),
					);

				const linker = linkerRows.find((r) => r.userId === user!.id);

				if (!linker) return fail(403);

				await event.locals.db.transaction(async (tx) => {
					await tx
						.delete(databaseSchema.article)
						.where(eq(databaseSchema.article.textbookId, tb.id));
					await tx
						.delete(databaseSchema.chapter)
						.where(eq(databaseSchema.chapter.textbookId, tb.id));
					await tx
						.delete(databaseSchema.textbookUserLinker)
						.where(
							eq(
								databaseSchema.textbookUserLinker.textbookId,
								tb.id,
							),
						);
					await tx
						.delete(databaseSchema.textbookResourceLinker)
						.where(
							eq(
								databaseSchema.textbookResourceLinker
									.textbookId,
								tb.id,
							),
						);
					await tx
						.delete(databaseSchema.textbook)
						.where(eq(databaseSchema.textbook.id, tb.id));
				});

				throw redirect(302, resolve('/(base)/textbook'));
			},
		);
	},
};
