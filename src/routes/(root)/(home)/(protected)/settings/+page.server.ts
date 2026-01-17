import { validateDate } from '$lib';
import { writeLog, writeLogDeleteAccount } from '$lib/log.js';
import { schema } from '$lib/server/db/mainSchema.js';
import { formRunner } from '$lib/server/form/runner';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions = {
	updatePersonalInfo: async (event) => {
		return await formRunner(
			['degree', 'name', 'surname', 'day', 'month', 'year'],
			async (event, formData, cookies, user) => {
				if (!user.canChangeSettings) return fail(403);
				if (
					!validateDate(
						parseInt(formData['day']),
						parseInt(formData['month']),
						parseInt(formData['year']),
					) ||
					!Number.isInteger(parseInt(formData['background'])) ||
					parseInt(formData['background']) < 0
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
	resetStreak: async (event) => {
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
	deleteAccount: async (event) => {
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
	editPersonalization: async (event) => {
		return await formRunner(
			['background', 'lang', 'daily'],
			async (event, formData, cookies, user, formDataRaw) => {
				try {
					await event.locals.db
						.update(schema.user)
						.set({
							background: parseInt(formData['background']),
							lang: formData['lang'],
							gamification: user.canEditGamification
								? Boolean(formData['daily'])
								: user.gamification,
						})
						.where(eq(schema.user.uuid, user.uuid));
				} catch (e) {
					writeLog(event, 'ERROR', 'DB failure.', user);
					return fail(500);
				}
			},
		);
	},
};
