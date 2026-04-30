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
	id: number;
	uuid: string;
	title: string;
	r: number;
	g: number;
	b: number;
	educationLevel: number;
	authors: UserTypeInfo[];
};

export type ExerciseType = {
	type: 'CRS' | 'IMG' | 'GRP' | 'GEO' | 'PRG';
	//TODO
};
