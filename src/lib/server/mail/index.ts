import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { error } from '@sveltejs/kit';
import { getSetting } from '../settings';

type MailerType = nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
export let transporter: MailerType | undefined = undefined;

export const initTransporter = async () => {
	if (transporter) transporter.close();

	transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: await getSetting('emailAddress'),
			clientId: await getSetting('emailId'),
			clientSecret: await getSetting('emailClientSecret'),
			refreshToken: await getSetting('emailClientRef')
			//access token not required
		}
	});

	transporter.on('token', (t) => {
		console.log('User:', t.user);
		console.log('New access token:', t.accessToken);
		console.log('Expires at:', new Date(t.expires));
	});

	await transporter.verify();
};

export const verifyTransporter = async (): Promise<boolean> => {
	if (!transporter) return false;
	try {
		if (!(await transporter.verify())) return false;
	} catch {
		return false;
	}
	return true;
};

export const sendMail = async (subject: string, message: string): Promise<boolean> => {
	if (!(await verifyTransporter())) return false;

	const emailData = {
		from: await getSetting('emailAddress'),
		to: await getSetting('emailTarget'),
		subject: '[PERSONALWEB] ' + subject,
		html: message,
		text: message
	};

	try {
		const result = await (transporter as MailerType).sendMail(emailData);
		console.log(result);
		if (result.rejected.length != 0) {
			console.log('Mail send rejected!', result.response);
			return false;
		}
	} catch (e) {
		console.log(emailData);
		console.log(e);
		throw error(500, 'Email failure.');
	}

	return true;
};