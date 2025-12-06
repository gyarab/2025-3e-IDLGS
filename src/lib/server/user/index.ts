import { checkSetting } from "../settings";
import * as crypto from 'node:crypto';

export const setPassword = async (password: string): Promise<void> => {
	const salt = crypto.randomUUID();
	//cloudflare workers has 100000 iteration limit
	const iterations = Math.trunc(9000 + Math.random() * 90000);

	await checkSetting(
		'password',
		crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex')
	);

	await checkSetting('salt', salt);
	await checkSetting('iterations', String(iterations));
};

export const validateTurnstile = async (
	ip: string,
	token: string,
	secret: string
): Promise<boolean> => {
	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ip, secret, response: token })
		});
		const outcome = await response.json();
		return outcome.success;
	} catch (e) {
		console.error('Turnstile validation error:', e);
		return false;
	}
};