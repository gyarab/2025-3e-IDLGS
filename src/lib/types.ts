export type UserType = {
	username: string;
	name: string;
	surname: string;
	middlename: string;
	email: string;
	password: string;
	iterations: number;
	salt: string;
	registeredAt: Date;
};

export type ExerciseType = {
	type: 'CRS' | 'IMG' | 'GRP' | 'GEO' | 'PRG';
	//TODO
};
