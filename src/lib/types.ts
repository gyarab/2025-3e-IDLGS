import type { FileType } from "./server/filesave";

export type UserTypeInfo = {
	degree: string | null;
	institution: string | null;
	name: string;
	surname: string;
	middlename: string;
	uuid: string;
	profilePicture: string | null; //url
};

export type UserType = UserTypeInfo & {
	email: string;
	registeredAt: Date;
	description: string;
	lastSeenAt: Date;
	r: number;
	g: number;
	b: number;
	language: string;
};

export type UserTypeFull = UserType & {
	id: number;
	password: string;
	iterations: number;
	salt: string;
	playedTextbookTutorial: boolean;
	playedLibraryTutorial: boolean;
	playedGalleryTutorial: boolean;
	firstLogin: boolean;
};

export type TextbookType = {
	uuid: string;
	title: string;
	description: string;
	lastEditedAt: Date;
	r: number;
	g: number;
	b: number;
	educationLevel: number;
	authors: UserTypeInfo[];
};

export type TextbookTypeFull = TextbookType & {
	id: number;
};

export type ChapterType = {
	title: string;
	order: number;
};

export type ChapterTypeFull = ChapterType & {
	id: number;
	textbookId: number;
	uuid: string;
};

export type ArticleType = {
	title: string;
	order: number;
};

export type ArticleTypeFull = ArticleType & {
	id: number;
	chapterId: number;
	textbookId: number;
	uuid: string;
	textCompressed: string;
};

export type ResourceType = {
	id: number;
	uuid: string;
	title: string;
	type: FileType;
	url: string;
};

export type ExerciseType = {
	type: 'CRS' | 'IMG' | 'GRP' | 'GEO' | 'PRG';
	//TODO
};
