import { formRunner, type FormDataType } from '$lib/server/form/validation';
import type { UserTypeFull } from '$lib/types.js';
import { schema as databaseSchema } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { saveToCloud, deleteInCloud } from '$lib/server/filesave';
import { locales } from '$lib/paraglide/runtime.js';
import { hashPassword, verifyPassword } from '$lib/server/user/index.js';
import { getRGBFromHex } from '$lib';

export const load = async (event) => {
	const pd = await event.parent();
	if (!pd.user) return fail(401);
};

export const actions = {
	updatePersonalInfo: async (event) => {
		return await formRunner(
			event,
			['name', 'surname'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined) => {
				await event.locals.db
					.update(databaseSchema.user)
					.set({
						name: data.name,
						middlename: data.middlename ?? '',
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
			}
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
			['picture'],
			true,
			async (data: FormDataType, user: UserTypeFull | undefined, formData?: FormDataType) => {
				const thumbnail = formData!.get('picture') as File;
				if (!thumbnail || thumbnail.size === 0) return fail(400);

				const thumbnailUrl = await saveToCloud(thumbnail, 'image');
				if (!thumbnailUrl) return fail(502);

				const oldPicture = (await event.locals.db
					.select({ id: databaseSchema.resource.id, url: databaseSchema.resource.url })
					.from(databaseSchema.user)
					.leftJoin(
						databaseSchema.resource,
						eq(
							databaseSchema.user.profilePicture,
							databaseSchema.resource.id,
						),
					)
					.where(eq(databaseSchema.user.id, user!.id))
				)[0];

				if(oldPicture?.url) {
					await deleteInCloud(oldPicture.url);
				}

				await event.locals.db.transaction(async (tx) => {
					const resource = await tx
						.insert(databaseSchema.resource)
						.values({
							url: thumbnailUrl,
							title: 'profile picture',
							type: 'image',
						})
						.returning();

					await tx
						.update(databaseSchema.user)
						.set({ profilePicture: resource[0].id })
						.where(eq(databaseSchema.user.id, user!.id));

					await tx
						.delete(databaseSchema.resource)
						.where(eq(databaseSchema.resource.id, oldPicture?.id ?? -1));					
				});			
			},
			['picture'],
		);
	},
};
