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
	import ResinScriptEditorComment from './ResinScriptEditorComment.svelte';
	import { RScriptComment } from '$lib/interactive/script/comment.svelte';

	let {
		closeModal = $bindable()
	}: {
		closeModal: boolean;
	} = $props();

	let script: RProgram = $state(new RProgram());
	let selectedBlockUuid = $state('');
	let selectedCommentUuid = $state('');

	let test = $state(
		new RScriptBlock('testing block 1', 10, 10, 30, 10, '#ff0000', '#ffffff', true)
	);
	let test2 = $state(
		new RScriptBlock('testing block 2', 50, 50, 20, 10, '#00ff00', '#ffffff', false)
	);

	onMount(() => {
		test.connectionBottom = 'ASASRRAA';
		test.connectionTop = 'SASARS';

		test2.connectionTop = 'asasraaaa';
		test2.connectionBottom = 'srrrraaar';

		script.addBlock(test);
		script.addBlock(test2);

		script.addComment(new RScriptComment("blabla", 80, 10, 5, 5))
	});
</script>

<div class="flex w-full grow flex-row gap-2">
	

	<div class="flex grow-3 flex-col gap-2">
		<div class="relative flex grow flex-col rounded-2xl bg-neutral-600 p-5">
			{#each script.blocks as block (block.uuid)}
				<ResinScriptBlock {block} bind:uuid={selectedBlockUuid} />
			{/each}
			{#each script.comments as comment (comment.uuid)}
				<ResinScriptEditorComment {comment} bind:uuid={selectedCommentUuid} />
			{/each}
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
