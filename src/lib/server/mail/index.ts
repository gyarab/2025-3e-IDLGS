import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

//using my notifications.martinbykov.eu API, its HTTPS only -MB

export const sendMail = async (
	event: RequestEvent,
	subject: string,
	message: string,
	target: string,
): Promise<boolean> => {
	try {
		const response = await event.fetch(
			'https://notifications.martinbykov.eu/email',
			{
				body: JSON.stringify({
					sendkey: env.API_KEY_MAIL,
					subject: subject,
					message: message,
					target: target,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			},
		);

		if (response.status < 300) return true;
		else return false;
	} catch (e) {
		console.log('SendMail failed: ', JSON.stringify(e));
		return false;
	}
};
