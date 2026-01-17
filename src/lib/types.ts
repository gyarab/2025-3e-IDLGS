//DB Types

//Users

export type UserType = {
	id: number;
	uuid: string;
	email: string;
	createdAt: Date;
	birthday: string;
	lang: string;
	streak: number;
	verified: boolean;
	extended: boolean;
	admin: boolean;
	name: string;
	surname: string;
	degree: string;
	background: number;
	canCreateCourses: boolean;
	canCreateTextbooks: boolean;
	canCreateResin: boolean;
	setPassword: boolean;
	gamification: boolean;
	canChangeSettings: boolean;
	canEditGamification: boolean;
};

export type UserRoleType = {
	//textbook
	isEditor?: boolean;
	//course
	isTeacher?: boolean;
	//both
	isOwner?: boolean;
};

//for selection
export type UserTypeLimited = UserRoleType & {
	uuid: string;
	email: string;
	name: string;
	surname: string;
	degree: string;
};

//Textbooks

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
	subject: string;
	chapters?: ChapterType[];
	public: boolean;
};

export type ChapterType = {
	uuid: string;
	name: string;
	summary: string;
	articles?: ArticleType[];
};

export type ArticleType = {
	uuid: string;
	name: string;
	text: string;
};

//Courses

export type CourseType = {
	uuid: string;
	description: string;
	createdAt: Date;
	modifiedAt: Date;
	red: number;
	green: number;
	blue: number;
	name: string;
	subject: string;
	grades?: CourseGradeType[];
	assignments?: CourseAssignmentType[];
};

export type CourseAssignmentType = {
	uuid: string;
	title: string;
	description: string;
	deadline: Date;
	createdAt: Date;
	comments?: CourseAssignmentCommentType[];
};

export type CourseAssignmentCommentType = {
	uuid: string;
	comment: string;
	createdAt: Date;
	author?: UserType;
};

export type CourseGradeType = {
	min: number;
	max: number;
	name: string;
};

// Tests

export type TestCheatingType = {
	copyPaste: boolean;
	tabSwitch: boolean;
	focusLoss: boolean;
	consoleOpen: boolean;
	mouseOut: boolean;
	rightClick: boolean;
};

//Cloudflare AI workers
//Question generation

export type AIMessageType = {
	role: 'system' | 'user';
	content: string;
};

export type AIGenerationQuestionType =
	| 'QT:ABC'
	| 'QT:ABCD'
	| 'QT:ABCDE'
	| 'QT:ABCDEF'
	| 'QT:TF'
	| 'QT:FILL'
	| 'QT:OPEN'
	| 'QT:CROSS';
