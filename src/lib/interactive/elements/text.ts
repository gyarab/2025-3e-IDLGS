import { RElement } from '../element.svelte';

export class RElementText extends RElement {
	constructor() {
		super("Textbox", 40, 45, 20, 10, true, '#ffffff', '#000000', 10, 1);
	}
}
