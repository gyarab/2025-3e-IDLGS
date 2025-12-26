import { RElement } from '../element.svelte';

//dubito ergo cogito, cogito ergo sum
export class RElementCartesian extends RElement {
	constructor() {
		super("Cartesian", 25, 25, 50, 50, true, '#eeeeee', '#000000', 10, 1);
	}
}
