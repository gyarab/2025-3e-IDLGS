import { setGlobal1 } from "../global";

export const formHelper1 = () => {
		console.info('Helper 1 executed successfully!');
		console.log('This is a random number: ', Math.random());
		setGlobal1('const');
}