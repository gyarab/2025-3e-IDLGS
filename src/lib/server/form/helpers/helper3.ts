import { checkGlobals } from "../global"

export const formHelper3 = () => {
    if(!checkGlobals()) {
		throw Error('Configuration is invalid! Check your .env file!');
	}	
}