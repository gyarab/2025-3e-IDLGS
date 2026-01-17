import { formRunner } from '$lib/server/form/runner.js';
import { error, fail } from '@sveltejs/kit';
import { FEEDBACK_TARGET_MAIL, MAX_MESSAGE_LENGTH, MARKDOWN_CONFIG_OPTIONS } from '$lib';
import { sendMail } from '$lib/server/mail/index.js';
import markdownit from 'markdown-it';

export const load = async () => {
	return error(404, 'Not Found');
};

export const actions = {
	sendFeedback: async () => {
		return await formRunner(['message'], async (event, formData, cookies, user) => {
			if(!user) return fail(401);

			const message = formData['message'];
			if(message.length === 0 || message.length > MAX_MESSAGE_LENGTH) return fail(400);

			const md = markdownit(MARKDOWN_CONFIG_OPTIONS);

			if(await sendMail(
				"[IDLGS/UČEBNICE] Nová zpětná vazba z učebnice", md.render(message), FEEDBACK_TARGET_MAIL,
			)) {
				return {};
			}
			else return fail(500);
		});
	}
};