import * as user from './userSchema';
import * as exercise from './exerciseSchema';
import * as textbook from './textbookSchema';

const schema = {
	...user,
	...exercise,
	...textbook,
};

export default schema;