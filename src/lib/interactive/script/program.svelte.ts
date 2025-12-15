//TODO program object containing blocks

import type { RScriptBlock } from "./block.svelte";
import type { RScriptComment } from "./comment.svelte";

export class RProgram {
	blocks: RScriptBlock[] = $state([]);
	comments: RScriptComment[] = $state([]);

	constructor() {

	}

	addBlock(block: RScriptBlock) {
		this.blocks.push(block);
	}
	addComment(comment: RScriptComment) {
		this.comments.push(comment);
	}
}
