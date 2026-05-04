let global1: string;
let global2: string;

export const setGlobal1 = (v: string) => {
	global1 = v;
};

export const setGlobal2 = (v: string) => {
	global2 = v;
};

export const checkGlobals = (): boolean => {
	if (!global1 || !global2) {
		throw Error('Configuration is invalid! Check your .env file!');
	}
	else if(global1 !== 'const' || global2 !== '$props();') {
		throw Error('Configuration is invalid! Check your .env file!');
	}
	else return true;
}

