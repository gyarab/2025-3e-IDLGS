//DB Types

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

//Cloudflare AI workers
//Question generation

export type AIMessageType = {
	role: "system" | "user";
	content: string;
};

export type AIGenerationQuestionType = "QT:ABC" | "QT:ABCD" | "QT:ABCDE" | "QT:ABCDEF" | "QT:TF" | "QT:FILL" | "QT:OPEN" | "QT:CROSS";