import { formRunner, type FormDataType } from '$lib/server/form/validation';
import type { UserTypeFull } from '$lib/types.js';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { saveToCloud, deleteInCloud } from '$lib/server/filesave';

export const load = async (event) => { };

export const actions = {
	updatePersonalInfo: async (event) => {
		return await formRunner(event, ['name', 'middlename', 'surname'], true, async (data: FormDataType, user: UserTypeFull | undefined) => {
			await event.locals.db.update(databaseSchema.user).set({
				name: data.name,
				middlename: data.middlename,
				surname: data.surname,
			}).where(eq(databaseSchema.user.uuid, user!.uuid));
		});
	},
	updateInstitutionInfo: async (event) => {
		return await formRunner(event, ['degree', 'institution'], true, async (data: FormDataType, user: UserTypeFull | undefined) => {
			await event.locals.db.update(databaseSchema.user).set({
				degree: data.degree,
				institution: data.institution,
			}).where(eq(databaseSchema.user.uuid, user!.uuid));
		});
	},
	updateEmail: async (event) => {
		return await formRunner(event, ['email'], true, async (data: FormDataType, user: UserTypeFull | undefined) => {
			await event.locals.db.update(databaseSchema.user).set({
				email: data.email,
			}).where(eq(databaseSchema.user.uuid, user!.uuid));
		});
	},
	updateDescription: async (event) => {
		return await formRunner(event, ['description'], true, async (data: FormDataType, user: UserTypeFull | undefined) => {
			await event.locals.db.update(databaseSchema.user).set({
				description: data.description,
			}).where(eq(databaseSchema.user.uuid, user!.uuid));
		});
	},
	updatePassword: async (event) => {
		return await formRunner(event, ['currentPassword', 'newPassword'], true, async (data: FormDataType, user: UserTypeFull | undefined) => {
			//TODO
		});
	},
	updateColor: async (event) => {
		return await formRunner(event, ['r', 'g', 'b'], true, async (data: FormDataType, user: UserTypeFull | undefined) => {
			const r = parseInt(data.r);
			const g = parseInt(data.g);
			const b = parseInt(data.b);

			if (isNaN(r) || isNaN(g) || isNaN(b)) return fail(400);
			if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return fail(400);

			await event.locals.db.update(databaseSchema.user).set({
				r: parseInt(data.r),
				g: parseInt(data.g),
				b: parseInt(data.b),
			}).where(eq(databaseSchema.user.uuid, user!.uuid));

			return;
		});
	},
	updateProfilePicture: async (event) => {
		return await formRunner(event, ['profilePictureName', 'profilePictureData'], true, async (data: FormDataType, user: UserTypeFull | undefined) => {

			//TODO

			//await deleteInCloud("");

			//await saveToCloud(new File());

		});
	},
};
