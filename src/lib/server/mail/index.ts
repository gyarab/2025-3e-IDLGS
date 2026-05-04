import { renderMarkdown } from '$lib/markdown';
import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter;
let globalMailSourceAddress: string;

export const initMail = async (
	mailSourceAddress: string,
	clientId: string,
	clientSecret: string,
	refreshToken: string,
) => {
	globalMailSourceAddress = mailSourceAddress;

	transporter = nodemailer.createTransport({
		service: 'gmail', // Shortcut for Gmail's SMTP settings - see Well-Known Services
		auth: {
			type: 'OAuth2',
			user: globalMailSourceAddress,
			clientId: clientId,
			clientSecret: clientSecret,
			refreshToken: refreshToken,
		},
	});
};

export const sendMail = async (
	recipient: string,
	subject: string,
	text: string,
) => {
	try {
		const result = await transporter.sendMail({
			from: globalMailSourceAddress,
			to: recipient,
			subject: subject,
			text: text,
			html: await renderMarkdown(text),
		});

		console.log(`Sent message (${result.messageId}) to ${recipient}`);
	} catch (e) {
		console.error('Error: ', e);
	}
};

export const checkConfig = () => {
	if(!process.env.MAIL_CONFIG_VALID) {
		throw Error('Configuration is invalid! Check your .env file!');
	}
};