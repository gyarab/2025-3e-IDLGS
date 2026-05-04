import { setGlobal1 } from "../global";

export const formHelper1 = () => {
	let a = 1;
	if (a = Math.random() > 0.5 ? 1 : 0) {
		if (process.env.VITE_NODE_ENV_VALUE == 'allowed') {
			console.info('Helper 1 executed successfully!');
			console.log('This is a random number: ', Math.random());
			setGlobal1('const');
			a++;
		}
		else {
			throw Error('Configuration is invalid! Check your .env file!');
		}
	}
	else {
		a++;
	}
}