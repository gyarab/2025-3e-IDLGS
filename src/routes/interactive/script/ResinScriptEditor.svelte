<!--

RESIN
Script editor window
Author: Martin Bykov

-->

<script lang="ts">
	import { RScriptBlock } from '$lib/interactive/script/block.svelte';
	import { onMount } from 'svelte';
	import ResinScriptBlock from './ResinScriptBlock.svelte';
	import { RProgram } from '$lib/interactive/script/program.svelte';
	import { RScriptComment } from '$lib/interactive/script/comment.svelte';
	import ResinElementSelect from './ResinElementSelect.svelte';
	import ResinScriptEditorComment from './ResinScriptEditorComment.svelte';

	let {
		closeModal = $bindable(),
		mousePosX,
		mousePosY
	}: {
		closeModal: boolean;
		mousePosX: number;
		mousePosY: number; 
	} = $props();

	let script: RProgram = $state(new RProgram());
	let selectedBlockUuid = $state('');
	let selectedCommentUuid = $state('');

	let editorWidth = $state(0);
	let editorHeight = $state(0);

	let commentConnectionCanvasId = $state(crypto.randomUUID());

	//TODO remove
	let test = $state(
		new RScriptBlock('testing block 1', 10, 10, 30, 10, '#ff0000', '#ffffff', true)
	);
	let test2 = $state(
		new RScriptBlock('testing block 2', 50, 50, 20, 10, '#00ff00', '#ffffff', false)
	);

	let sortedX = $derived(script.blocks.toSorted((a, b) => a.x - b.x));
	let sortedY = $derived(script.blocks.toSorted((a, b) => a.y - b.y));

	onMount(() => {
		test.connectionBottom = 'ASASRRAA';
		test.connectionTop = 'SASARS';

		test2.connectionTop = 'ASASRRAA';
		test2.connectionBottom = 'srrrraaar';

		script.addBlock(test);
		script.addBlock(test2);

		script.addComment(new RScriptComment("blabla", 80, 10, 5, 5))
	});
</script>

<div class="flex w-full grow flex-row gap-2">
	<ResinElementSelect />
	<div class="flex grow flex-col gap-2">
		<h2>Workspace</h2>
		<div 
			class="relative flex grow flex-col rounded-2xl bg-neutral-600 p-5"
			bind:clientWidth={editorWidth}
			bind:clientHeight={editorHeight}
			>
			<!-- blocks -->
			{#each script.blocks as block, i (block.uuid)}
				<ResinScriptBlock 
					bind:block={script.blocks[i]} 
					bind:uuid={selectedBlockUuid} 
					{editorWidth}
					{editorHeight}
					{mousePosX}
					{mousePosY}
					bind:program={script}
				/>
			{/each}

			<!-- comments -->
			{#each script.comments as comment (comment.uuid)}
				<ResinScriptEditorComment {comment} bind:uuid={selectedCommentUuid} />
			{/each}

			<!-- comment connection layer -->
			<canvas id={commentConnectionCanvasId} class="z-10 w-full h-full absolute top-0 left-0">
				Canvas not supported.
			</canvas>
		</div>

		<div class="flex w-full flex-row gap-2">
			<button class="button-green group">
				<i class="ri-save-3-line not-group-hover:hidden"></i>
				<i class="ri-save-3-fill group-hover:hidden"></i>
				Validate and save
			</button>
			<button class="button-violet group">
				<i class="ri-save-3-line not-group-hover:hidden"></i>
				<i class="ri-save-3-fill group-hover:hidden"></i>
				Help and documentation
			</button>
			<div class="grow"></div>
			<!-- TODO confirm modal -->
			<button class="button-violet group" onclick={() => (closeModal = false)}>
				<i class="ri-delete-bin-line not-group-hover:hidden"></i>
				<i class="ri-delete-bin-fill group-hover:hidden"></i>
				Discard changes
			</button>
		</div>
	</div>
</div>
