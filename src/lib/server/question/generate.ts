import { interpreter as ncp } from 'node-calls-python';

//Wrappers for python SciPy model

export const initializeModel = async () => {
	const init = await ncp.import('src/lib/server/question/nlp.py', true);
	await ncp.call(init, 'initializeModel');
};
