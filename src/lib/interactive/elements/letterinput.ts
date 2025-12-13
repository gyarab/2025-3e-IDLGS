import { RAnswerElement } from '../element.svelte';

export class RElementLetterInput extends RAnswerElement {
	constructor() {
		super("Single letter input", 25, 25, 5, 5, true, '#ffffff', '#000000', 10, 1);
	}
}
