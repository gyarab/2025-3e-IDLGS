export type UserType = {
	name: string;
	surname: string;
	middlename: string;
	email: string;
	registeredAt: Date;
	firstLogin: boolean;
	playedTextbookTutorial: boolean;
	playedLibraryTutorial: boolean;
	playedGalleryTutorial: boolean;
	degree: string;
	institution: string;
	profilePicture: Blob;
	description: string;
	lastSeenAt: Date;
	uuid: string;
};

export type ExerciseType = {
	type: 'CRS' | 'IMG' | 'GRP' | 'GEO' | 'PRG';
	//TODO
};
