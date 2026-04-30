import * as user from './schema/userSchema';
import * as exercise from './schema/exerciseSchema';
import * as textbook from './schema/textbookSchema';

export const schema = {
	...user,
	...exercise,
	...textbook,
};

export default schema;
