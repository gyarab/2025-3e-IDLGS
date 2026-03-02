import { schema } from '$lib/server/db/mainSchema';
import { formRunner } from '$lib/server/form/runner';
import { sendMail } from '$lib/server/mail';
import { EMAIL_REGEX } from '$lib/server/user';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { m } from '$lib/paraglide/messages';
import { writeLog } from '$lib/log';
import { renderMarkdown } from '$lib/markdown';
import type { Locale } from '$lib/paraglide/runtime.js';

export const load = async () => {};

export const actions = {
	sendMail: async () => {
		return await formRunner(
			['email'],
			async (event, formData, _cookies, _user, formDataRaw) => {
				if (!EMAIL_REGEX.test(formData['email'])) {
					return fail(400);
				}

				if (!process.env.DEV) {
					const captchaResponse = await event.fetch(
						'http://localhost:3100/645d6876bc/siteverify',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								secret: process.env.CAPTCHA,
								response: formDataRaw.get('cap-token'),
							}),
						},
					);
					if (!(await captchaResponse.json()).success) {
						return fail(401, {});
					}
				}

				try {
					const [passwordResetEntry, emailUser] =
						await event.locals.db.transaction(async (tx) => {
							const emailUser = await tx
								.select()
								.from(schema.user)
								.where(eq(schema.user.email, formData['email']))
								.limit(1);

							if (emailUser.length === 0) {
								return [undefined, undefined];
							}

							const passwordResetEntry = await tx
								.insert(schema.passwordReset)
								.values({
									user: emailUser[0].id,
								})
								.returning();

							return [passwordResetEntry[0], emailUser];
						});

					if (!emailUser || !passwordResetEntry) {
						return fail(400);
					}

					if (
						!(await sendMail(
							`[IDLGS] ${m.passwordReset({}, { locale: emailUser[0].lang as Locale })}`,
							renderMarkdown(`
# ${m.someoneHasRequestedAPasswordResetForYourAccount({}, { locale: emailUser[0].lang as Locale })}
${m.ifYouDidNotMakeThisRequestYouCanIgnoreThisEmail({}, { locale: emailUser[0].lang as Locale })}
${m.resetYourPasswordByClickingTheLinkBelow({}, { locale: emailUser[0].lang as Locale })}
https://ucebnice.martinbykov.eu/change/${passwordResetEntry.uuid}
${m.theLinkWillExpireInFifteenMinutes({}, { locale: emailUser[0].lang as Locale })}

**${m.textbookNameLong({}, { locale: emailUser[0].lang as Locale })}**
`),
							formData['email'],
						))
					) {
						writeLog(
							event,
							'ERROR',
							'Mail send failure for password reset.',
							emailUser[0],
						);
						return fail(500);
					}
				} catch (e) {
					writeLog(event, 'ERROR', 'DB failure for password reset.');
					return fail(500);
				}

				return {};
			},
			true,
		);
	},
};
