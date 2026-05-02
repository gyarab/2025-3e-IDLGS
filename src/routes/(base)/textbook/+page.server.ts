import { schema as databaseSchema } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { eq, desc } from 'drizzle-orm';
import { resolve } from '$app/paths';
import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type {
	TextbookTypeFull,
	TextbookTypeNoAuthors,
	UserType,
	UserTypeInfo,
} from '$lib/types.js';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));

	let textbooks = await event.locals.db
		.select({
			id: databaseSchema.textbook.id,
			title: databaseSchema.textbook.title,
			r: databaseSchema.textbook.r,
			g: databaseSchema.textbook.g,
			b: databaseSchema.textbook.b,
			lastEditedAt: databaseSchema.textbook.lastEditedAt,
			educationLevel: databaseSchema.textbook.educationLevel,
			uuid: databaseSchema.textbook.uuid,
			description: databaseSchema.textbook.description,
		})
		.from(databaseSchema.textbook)
		.leftJoin(
			databaseSchema.textbookUserLinker,
			eq(
				databaseSchema.textbook.id,
				databaseSchema.textbookUserLinker.textbookId,
			),
		)
		.leftJoin(
			databaseSchema.user,
			eq(
				databaseSchema.textbookUserLinker.userId,
				databaseSchema.user.id,
			),
		)
		.where(eq(databaseSchema.user.uuid, pd.user.uuid));

	const textbookAuthors: UserTypeInfo[][] = [];
	for (let i = 0; i < textbooks.length; i++) {
		const users = await event.locals.db
			.select({
				name: databaseSchema.user.name,
				surname: databaseSchema.user.surname,
				middlename: databaseSchema.user.middlename,
				uuid: databaseSchema.user.uuid,
				profilePicture: databaseSchema.resource.url,
				degree: databaseSchema.user.degree,
				institution: databaseSchema.user.institution,
			})
			.from(databaseSchema.user)
			.leftJoin(
				databaseSchema.resource,
				eq(
					databaseSchema.user.profilePicture,
					databaseSchema.resource.id,
				),
			)
			.leftJoin(
				databaseSchema.textbookUserLinker,
				eq(
					databaseSchema.user.id,
					databaseSchema.textbookUserLinker.userId,
				),
			)
			.where(
				eq(
					databaseSchema.textbookUserLinker.textbookId,
					textbooks[i].id,
				),
			);

		textbookAuthors.push(users);
	}

	return {
		textbooks: textbooks.map(
			(textbook: TextbookTypeNoAuthors, index: number) => ({
				...textbook,
				id: undefined,
				authors: textbookAuthors[index],
			}),
		),
		user: pd.user,
	};
};

export const actions = {
	deleteTextbook: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserType | undefined) => {},
		);
	},
};
