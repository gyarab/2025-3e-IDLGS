import { RElement } from '../element.svelte';

export class RElementCard extends RElement {
	constructor() {
		super("Card", 35, 45, 30, 10, true, '#808080', '#ffffff', 10, 1);
	}
}
