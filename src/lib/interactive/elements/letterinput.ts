import { RAnswerElement } from "../element.svelte";

export class RElementLetterInput extends RAnswerElement {
    constructor() {
		super(25, 25, 5, 5, true, "#ffffff", "#000000", 10, 1);
	}
};
