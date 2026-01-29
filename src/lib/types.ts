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
	lastMessage: number;
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

export type MessageType = {
	name: string;
	content: string;
	lang: string;
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
	authors?: UserTypeLimited[];
	canEdit?: boolean;
	archived?: boolean;
};

export type TextbookDefinitionType = {
	word: string;
	description: string;
};

export type ChapterType = {
	uuid: string;
	name: string;
	summary: string;
	articles?: ArticleType[];
	articlesLimited?: ArticleLimitedType[];
	order: number;
};

export type ArticleLimitedType = {
	uuid: string;
	name: string;
	order: number;
};

export type ArticleType = {
	uuid: string;
	name: string;
	text: string;
	order: number;
};

//Bookmarks and highlights

export type BookmarkType = {
	uuid: string;
	textIndex: number;
	article?: number;
	user?: number;
	red: number;
	green: number;
	blue: number;
};
export type HighlightType = {
	article?: number;
	user?: number;
	startIndex: number;
	endIndex: number;
	red: number;
	green: number;
	blue: number;
	uuid: string;
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
	people?: UserTypeLimited[];
	archived?: boolean;
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

//definition of grade scale in course
export type CourseGradeType = {
	min: number;
	max: number;
	name: string;
};

//type of grade recieved by students
export type CourseGradeValueType = {
	percentage: number;
};

export type CourseQuestionType = {
	uuid: string;
	question: string;
	answer: string;
	type: AIGenerationQuestionType;
	reportCount: number;
	ai: boolean;
	aitr: string; //aiTextRepresentation - source text where AI took info from
	course?: number;
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
