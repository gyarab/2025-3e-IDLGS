import { resolve } from '$app/paths';
import { error, fail, redirect } from '@sveltejs/kit';
import { formRunner, type FormDataType } from '$lib/server/form/validation.js';
import type { UserTypeFull } from '$lib/types.js';
import { makeHex } from '$lib';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { m } from '$lib/paraglide/messages';
import { saveToCloud } from '$lib/server/filesave/index.js';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) redirect(302, resolve('/(protected)/login'));

	const textbook = (
		await event.locals.db
			.select({
				id: databaseSchema.textbook.id,
				r: databaseSchema.textbook.r,
				g: databaseSchema.textbook.g,
				b: databaseSchema.textbook.b,
			})
			.from(databaseSchema.textbook)
			.where(eq(databaseSchema.textbook.uuid, event.params.textbook))
			.limit(1)
	)[0];

	const articles = await event.locals.db
		.select({
			id: databaseSchema.article.id,
			title: databaseSchema.article.title,
			uuid: databaseSchema.article.uuid,
			order: databaseSchema.article.order,
		})
		.from(databaseSchema.article)
		.where(
			eq(databaseSchema.article.textbookId, textbook.id),
		);

	if (!textbook) return error(404, m.textbookDoesntExist());

	return {
		color: makeHex(textbook.r, textbook.g, textbook.b),
		articles,
	};
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
			['name', 'description', 'foregroundColorR', 'foregroundColorG', 'foregroundColorB', 'backgroundColorR', 'backgroundColorG', 'backgroundColorB'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined, formData?: FormData) => {
				
			},
			['thumbnail'],
		);
	},
	makeCRS: async (event) => {
		return await formRunner(
			event,
			['name', 'description', 'foregroundColorR', 'foregroundColorG', 'foregroundColorB', 'backgroundColorR', 'backgroundColorG', 'backgroundColorB'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined, formData?: FormData) => {
				console.log('CRS', data);
			},
			['thumbnail'],
		);
	},
	makeDEF: async (event) => {
		return await formRunner(
			event,
			['name', 'description', 'foregroundColorR', 'foregroundColorG', 'foregroundColorB', 'backgroundColorR', 'backgroundColorG', 'backgroundColorB'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined, formData?: FormData) => {
				console.log('DEF', data);
			},
			['thumbnail'],
		);
	},
	makeGRP: async (event) => {
		return await formRunner(
			event,
			['name', 'description', 'foregroundColorR', 'foregroundColorG', 'foregroundColorB', 'backgroundColorR', 'backgroundColorG', 'backgroundColorB'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined, formData?: FormData) => {
				console.log('GRP', data);
			},
			['thumbnail'],
		);
	},
	makeGEO: async (event) => {
		return await formRunner(
			event,
			['name', 'description', 'foregroundColorR', 'foregroundColorG', 'foregroundColorB', 'backgroundColorR', 'backgroundColorG', 'backgroundColorB'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined, formData?: FormData) => {
				console.log('GEO', data);
			},
			['thumbnail'],
		);
	},
	makeEXT: async (event) => {
		return await formRunner(
			event,
			['url', 'name', 'description', 'backgroundColorR', 'foregroundColorR', 'backgroundColorG', 'foregroundColorG', 'backgroundColorB', 'foregroundColorB'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined, formData?: FormData) => {
				const thumbnail = formData!.get('thumbnail') as File;

				const thumbnailUrl = await saveToCloud(thumbnail, 'image');

				if (!data.url || !data.name || !data.description || !thumbnail || thumbnail.size === 0) {
					return fail(400);
				}

				const r = parseInt(data.backgroundColorR);
				const g = parseInt(data.backgroundColorG);
				const b = parseInt(data.backgroundColorB);
				const fr = parseInt(data.foregroundColorR);
				const fg = parseInt(data.foregroundColorG);
				const fb = parseInt(data.foregroundColorB);

				if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
					return fail(400);
				}

				if (isNaN(fr) || isNaN(fg) || isNaN(fb) || fr < 0 || fr > 255 || fg < 0 || fg > 255 || fb < 0 || fb > 255) {
					return fail(400);
				}

				await event.locals.db.transaction(async (tx) => {
					const thumbnail = await tx
						.insert(databaseSchema.resource)
						.values({
							url: thumbnailUrl,
							title: 'thumbnail',
							type: 'image',
						})
						.returning();

					const exerciseEmbed = await tx
						.insert(databaseSchema.exerciseEmbed)
						.values({
							link: data.url,
						})
						.returning();

					await tx
						.insert(databaseSchema.exercise)
						.values({
							type: 'EXT',
							name: data.name,
							description: data.description,
							thumbnail: thumbnail[0].id,
							ext: exerciseEmbed[0].id,
							backgroundColorR: r,
							backgroundColorG: g,
							backgroundColorB: b,
							foregroundColorR: fr,
							foregroundColorG: fg,
							foregroundColorB: fb,
						})
						.returning();
				});
			}, ['thumbnail']);
	},
};
