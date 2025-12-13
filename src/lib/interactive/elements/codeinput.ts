import { RAnswerElement } from '../element.svelte';

export class RElementCodeInput extends RAnswerElement {
	lang: string = '';

	constructor() {
		super("Code input", 35, 35, 30, 30, true, '#000000', '#008000', 10, 1);
	}

	compile() {}
}
