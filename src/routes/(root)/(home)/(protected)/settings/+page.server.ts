import { checkPassword, validateDate } from '$lib';
import { writeLog, writeLogDeleteAccount } from '$lib/log';
import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { comparePassword, hashPassword } from '$lib/server/user/index.js';
import { fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import * as crypto from 'node:crypto';

export const actions = {
	updatePersonalInfo: async () => {
		return await formRunner(
			['degree', 'name', 'surname', 'day', 'month', 'year'],
			async (event, formData, cookies, user) => {
				if (!user.canChangeSettings) return fail(403);
				if (
					!validateDate(
						parseInt(formData['day']),
						parseInt(formData['month']),
						parseInt(formData['year']),
					)
				) {
					return fail(400);
				}

				try {
					await event.locals.db
						.update(schema.user)
						.set({
							degree: formData['degree'],
							name: formData['name'],
							surname: formData['surname'],
							birthday: `${formData['year']}-${formData['month']}-${formData['day']}`,
						})
						.where(eq(schema.user.uuid, user.uuid));
				} catch (e) {
					writeLog(event, 'ERROR', 'DB failure.', user);
					return fail(500);
				}
			},
		);
	},
	resetStreak: async () => {
		return await formRunner([], async (event, formData, cookies, user) => {
			if (!user.canEditGamification) return fail(403);

			try {
				await event.locals.db
					.update(schema.user)
					.set({
						streak: 0,
					})
					.where(eq(schema.user.uuid, user.uuid));
			} catch (e) {
				writeLog(event, 'ERROR', 'DB failure.', user);
				return fail(500);
			}
		});
	},
	deleteAccount: async () => {
		return await formRunner([], async (event, formData, cookies, user) => {
			if (!user.canChangeSettings) return fail(403);

			try {
				await event.locals.db
					.delete(schema.user)
					.where(eq(schema.user.uuid, user.uuid));
				writeLog(event, 'INFO', 'Account deleted.', user);
			} catch (e) {
				writeLogDeleteAccount(event, user);
				return fail(500);
			}
		});
	},
	editPersonalization: async () => {
		return await formRunner(
			['background', 'lang', 'daily'],
			async (event, formData, cookies, user, formDataRaw) => {
				if (
					!Number.isInteger(parseInt(formData['background'])) ||
					parseInt(formData['background']) < 0
				) {
					return fail(400);
				}

				//change message ids when changing language
				try {
					await event.locals.db.transaction(async (tx) => {
						const lastMessage = await tx
							.select()
							.from(schema.message)
							.where(eq(schema.message.lang, formData['lang']))
							.orderBy(desc(schema.message.id))
							.limit(1);

						await tx
							.update(schema.user)
							.set({
								background: parseInt(formData['background']),
								lang: formData['lang'],
								gamification: user.canEditGamification
									? Boolean(formData['daily'])
									: user.gamification,
								lastMessage: lastMessage[0]?.id || 0,
							})
							.where(eq(schema.user.uuid, user.uuid));
					});
				} catch (e) {
					writeLog(event, 'ERROR', 'DB failure.', user);
					return fail(500);
				}
			},
		);
	},
	updatePassword: async () => {
		return await formRunner(
			['password', 'new', 'newrepeat'],
			async (event, formData, cookies, user) => {
				//if user exists checked by formRunner
				let userDetail = undefined;
				try {
					userDetail = (await event.locals.db.select()
						.from(schema.user)
						.where(eq(schema.user.id, user.id))
						.limit(1))[0];
				} catch (e) {
					writeLog(event, 'ERROR', 'DB failure.', user);
					return fail(500);
				}

				if (!comparePassword(
					formData['password'],
					userDetail.password,
					userDetail.salt,
					userDetail.iterations,
				)) return fail(400);

				if (formData['new'] != formData['newrepeat']) return fail(400);

				const object = checkPassword(formData['new'] as string);
				if (!object.all) return fail(400);

				const hashed = hashPassword(formData['new'] as string);

				try {
					await event.locals.db
						.update(schema.user)
						.set({
							password: hashed.password,
							salt: hashed.salt,
							iterations: hashed.amount,
						})
						.where(eq(schema.user.id, user.id));
				} catch (e) {
					writeLog(event, 'ERROR', 'DB failure.', user);
					return fail(500);
				}
			}
		)
	},
};
