import { resolve } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';
import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type { UserTypeFull } from '$lib/types.js';
import { makeHex } from '$lib';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { m } from '$lib/paraglide/messages';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));

	const textbook = (await event.locals.db
		.select({
			id: databaseSchema.textbook.id,
			r: databaseSchema.textbook.r,
			g: databaseSchema.textbook.g,
			b: databaseSchema.textbook.b,
		})
		.from(databaseSchema.textbook)
		.where(
			eq(databaseSchema.textbook.uuid, event.params.textbook),
		)
		.limit(1))[0];

	if(!textbook) return error(404, m.textbookDoesntExist());

	return {
		color: makeHex(textbook.r, textbook.g, textbook.b),
	}
};

const DEFAULT_FIELDS = [];
const CRW_FIELDS = [];
const CRS_FIELDS = [];
const DEF_FIELDS = [];
const GRP_FIELDS = [];
const GEO_FIELDS = [];
const EXT_FIELDS = [];

export const actions = {
	makeCRW: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				console.log('CRW', data);
			},
		);
	},
	makeCRS: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				console.log('CRS', data);
			},
		);
	},
	makeDEF: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				console.log('DEF', data);
			},
		);
	},
	makeGRP: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				console.log('GRP', data);
			},
		);
	},
	makeGEO: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				console.log('GEO', data);
			},
		);
	},
	makeEXT: async (event) => {
		return await formRunner(
			event,
			[],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				console.log('EXT', data);
			},
		);
	},
};
