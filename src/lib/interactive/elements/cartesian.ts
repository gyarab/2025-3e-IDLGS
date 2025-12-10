import { RElement } from "../element.svelte";

export class RElementCartesian extends RElement {
	constructor() {
		super(25, 25, 50, 50, true, "#eeeeee", "#000000", 10, 1);
	}
};