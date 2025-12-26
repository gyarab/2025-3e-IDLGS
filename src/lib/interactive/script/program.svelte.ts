import type { RScriptBlock } from "./block.svelte";
import type { RScriptComment } from "./comment.svelte";

export type RBlockTree = number[][]; //ids

export class RProgram {
	blocks: RScriptBlock[] = $state([]);
	//first array is for uncategorized blocks
	treeStructure: RBlockTree = $state([[]]);

	comments: RScriptComment[] = $state([]);

	constructor() {

	}

	addBlock(block: RScriptBlock, treeId?: number | undefined) {
		this.blocks.push(block);
		if(treeId) {
			this.treeStructure[treeId].push(this.blocks.length-1);
			if(treeId != 0) {
				(this.blocks.at(-1) as RScriptBlock).connectedInTree = true;
			}
		}
		else {
			this.treeStructure[0].push(this.blocks.length-1);
		}
	}
	addComment(comment: RScriptComment) {
		this.comments.push(comment);
	}
	//
	reorganiseBlocks() {

	}
	drawCommentLinks() {

	}
}
