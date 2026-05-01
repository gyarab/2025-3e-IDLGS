import { formRunner, type FormDataType } from '$lib/server/form/validation';
import type { UserTypeFull } from '$lib/types.js';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { saveToCloud, deleteInCloud } from '$lib/server/filesave';
import { locales } from '$lib/paraglide/runtime.js';
import { hashPassword, verifyPassword } from '$lib/server/user/index.js';
import { getRGBFromHex } from '$lib';

export const load = async (event) => {};

export const actions = {
	updatePersonalInfo: async (event) => {
		return await formRunner(
			event,
			['name', 'middlename', 'surname'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				await event.locals.db
					.update(databaseSchema.user)
					.set({
						name: data.name,
						middlename: data.middlename,
						surname: data.surname,
					})
					.where(eq(databaseSchema.user.id, user!.id));
			},
		);
	},
	updateLanguage: async (event) => {
		return await formRunner(
			event,
			['language'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				if (!locales.map((v) => String(v)).includes(data.language))
					return fail(400);

				await event.locals.db
					.update(databaseSchema.user)
					.set({
						language: data.language,
					})
					.where(eq(databaseSchema.user.id, user!.id));
			},
		);
	},
	updateInstitutionInfo: async (event) => {
		return await formRunner(
			event,
			['degree', 'institution'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				await event.locals.db
					.update(databaseSchema.user)
					.set({
						degree: data.degree,
						institution: data.institution,
					})
					.where(eq(databaseSchema.user.id, user!.id));
			},
		);
	},
	updateEmail: async (event) => {
		return await formRunner(
			event,
			['email', 'password'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				if (
					verifyPassword(
						data.password,
						user!.salt,
						user!.iterations,
						user!.password,
					)
				) {
					//TODO email confirm
					await event.locals.db
						.update(databaseSchema.user)
						.set({
							email: data.email,
						})
						.where(eq(databaseSchema.user.id, user!.id));
				}
			},
		);
	},
	updateDescription: async (event) => {
		return await formRunner(
			event,
			['description'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				await event.locals.db
					.update(databaseSchema.user)
					.set({
						description: data.description,
					})
					.where(eq(databaseSchema.user.id, user!.id));
			},
		);
	},
	updatePassword: async (event) => {
		return await formRunner(
			event,
			['password', 'newpass'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				if (
					verifyPassword(
						data.password,
						user!.salt,
						user!.iterations,
						user!.password,
					)
				) {
					const newPass = hashPassword(data.newpass);
					await event.locals.db
						.update(databaseSchema.user)
						.set({
							password: newPass.password,
							iterations: newPass.iterations,
							salt: newPass.salt,
						})
						.where(eq(databaseSchema.user.id, user!.id));
				}
			},
		);
	},
	updateColor: async (event) => {
		return await formRunner(
			event,
			['color'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				const [r, g, b] = getRGBFromHex(data.color);

				if (isNaN(r) || isNaN(g) || isNaN(b)) return fail(400);
				if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255)
					return fail(400);

				await event.locals.db
					.update(databaseSchema.user)
					.set({ r, g, b })
					.where(eq(databaseSchema.user.uuid, user!.uuid));

				return;
			},
		);
	},
	updateProfilePicture: async (event) => {
		return await formRunner(
			event,
			['profilePictureName', 'profilePictureData'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				//TODO
				//await deleteInCloud("");
				//await saveToCloud(new File());
			},
		);
	},
};
