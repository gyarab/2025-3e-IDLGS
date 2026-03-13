export const uuidProvider = () => {
	return crypto.randomUUID().split('-').join('').substring(0, 16);
};
