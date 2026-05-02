import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type { UserTypeFull } from '$lib/types.js';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));
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
