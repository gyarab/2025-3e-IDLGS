import { RAnswerElement } from "../element.svelte";

export class RElementInputTextSmall extends RAnswerElement {
    constructor() {
		super(25, 45, 50, 10, true, "#ffffff", "#000000", 10, 1);
	}
};
