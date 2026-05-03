<script lang="ts">
	import { browser } from "$app/environment";
	import { onDestroy, onMount } from "svelte";

	let {
		darkMode,
		color,
		articleText = $bindable(''),
		selectionStart = $bindable(0),
		selectionEnd = $bindable(0),
	}: {
		darkMode: boolean;
		color: string;
		articleText: string;
		selectionStart: number;
		selectionEnd: number;
	} = $props();

	let documentEditor: HTMLDivElement | undefined = $state();

	const keystrokeHandler = (event: KeyboardEvent) => {
		articleText = documentEditor!.innerHTML;
	};

	onMount(() => {
		if(!browser) return;
		documentEditor!.addEventListener('keydown', keystrokeHandler);
	})
	onDestroy(() => {
		if(!browser) return;
		documentEditor!.removeEventListener('keydown', keystrokeHandler);
	})
</script>

<!-- editable prevents key events -->
<div 
	bind:this={documentEditor}
	class="editable p-2 flex w-full flex-col gap-4 max-h-[80svh] overflow-x-hidden overflow-y-visible {darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-black'} min-h-[30vh] rounded-lg! " contenteditable="true"
>

</div>
