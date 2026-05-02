import type { FileType } from './server/filesave';

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

export type ChapterTypeNoId = ChapterType & {
	textbookId: number;
};

export type ChapterTypeFull = ChapterTypeNoId & {
	id: number;
	uuid: string;
};

export type ArticleType = {
	title: string;
	order: number;
};

export type ArticleTypeFullNoId = ArticleType & {
	chapterId: number;
	textbookId: number;
	textCompressed: string;
};

export type ArticleTypeFull = ArticleTypeFullNoId & {
	id: number;
	uuid: string;
};

export type ResourceType = {
	uuid: string;
	title: string;
	type: FileType;
	url: string;
};

export type ResourceTypeFull = ResourceType & {
	id: number;
};

export type ExerciseType = {
	type: 'CRS' | 'IMG' | 'GRP' | 'GEO' | 'PRG';
	//TODO
};
