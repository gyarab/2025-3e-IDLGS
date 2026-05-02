import crypto from 'node:crypto';

export const hashPassword = (
	password: string,
): {
	password: string;
	salt: string;
	iterations: number;
} => {
	const salt = crypto.randomUUID();
	const iterations = Math.trunc(Math.random() * 10000) + 90000;

	const hashedPassword = crypto.pbkdf2Sync(
		password,
		salt,
		iterations,
		64,
		'sha512',
	);

	return {
		password: hashedPassword.toString('hex'),
		salt,
		iterations,
	};
};

export const verifyPassword = (
	password: string,
	salt: string,
	iterations: number,
	hashedPassword: string,
): boolean => {
	return crypto.timingSafeEqual(
		Buffer.from(hashedPassword),
		Buffer.from(
			crypto
				.pbkdf2Sync(password, salt, iterations, 64, 'sha512')
				.toString('hex'),
		),
	);
};