import { RElement } from '../element.svelte';

export class RElementImage extends RElement {
	url: string = "";
	usesOurCDN: boolean = false; //either URL to external or to our CDN
	
	constructor() {
		super("Image", 25, 25, 50, 50, true, '#808080', '#ffffff', 10, 1);
	}
}
