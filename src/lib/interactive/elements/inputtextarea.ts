import { RAnswerElement } from '../element.svelte';

export class RElementInputTextArea extends RAnswerElement {
	constructor() {
		super("Large Text Input", 25, 25, 50, 50, true, '#ffffff', '#000000', 10, 1);
	}
}
