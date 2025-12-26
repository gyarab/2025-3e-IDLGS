import type { DBType } from "../db/types"

//using my notifications.martinbykov.eu API, its HTTPS only -MB
//TODO wait for update of API

export const sendMail = async(
	db: DBType,
	subject: string,
	message: string,
	target: string,
): Promise<boolean> => {
	return true;
}

export const verifyEmailSend = async(
	db: DBType,
): Promise<boolean> => {
	return true;
}