import * as user from './schema/userSchema';
import * as exercise from './schema/exerciseSchema';
import * as textbook from './schema/textbookSchema';
import * as book from './schema/bookSchema';

export const schema = {
	...user,
	...exercise,
	...textbook,
	...book
};

export default schema;
