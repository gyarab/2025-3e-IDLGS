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

export type TextbookType = {
	uuid: string;
	description: string;
	summary: string;
	createdAt: Date;
	modifiedAt: Date;
	red: number;
	green: number;
	blue: number;
	name: string;
};

export type ChapterType = {
	uuid: string;
	name: string;
	summary: string;
	textbookId: number;
};

export type ArticleType = {
	uuid: string;
	name: string;
	text: string;
	chapterId: number;
};

export type CourseType = {
	uuid: string;
	description: string;
	createdAt: Date;
	modifiedAt: Date;
	red: number;
	green: number;
	blue: number;
	name: string;
};

