export enum QuestionTypeEnum {
	UNKNOWN = -1,
	ABCD = 0, //multiple choice, incl. images, not neccesarily 4 options
	TF = 1, //true false,
	FILLIN = 2, //fill in part of text
	REMOVEWRONG = 3 //nehodici se skrtnete
}

export type Message = {
	role: 'developer' | 'user' | 'assistant';
	content: string;
};

export type UserType = {
	uuid: string;
	email: string;
	createdAt: Date;
	birthday: string;
	lang: string;
	streak: number;
	verified: boolean;
	extended: boolean;
	admin: boolean;
};
