import * as course from './schema/course';
import * as data from './schema/data';
import * as link from './schema/link';
import * as misc from './schema/misc';
import * as textbook from './schema/textbook';
import * as user from './schema/user';
import * as privacy from './schema/privacy';

export const schema = {
	...course,
	...data,
	...link,
	...misc,
	...textbook,
	...user,
	...privacy,
};
