<script lang="ts">
	import { browser } from "$app/environment";
	import { onDestroy, onMount } from "svelte";

	let {
		darkMode,
		color,
		articleText = $bindable(''),
	}: {
		darkMode: boolean;
		color: string;
		articleText: string;
	} = $props();

	let documentEditor: HTMLDivElement | undefined = $state();

	const keystrokeHandler = (event: KeyboardEvent) => {
		articleText = documentEditor!.innerHTML;
	};

	onMount(() => {
		if(!browser) return;
		window.addEventListener('keydown', keystrokeHandler);
	})
	onDestroy(() => {
		if(!browser) return;
		window.removeEventListener('keydown', keystrokeHandler);
	})
</script>

<div 
	bind:this={documentEditor}
	class="flex w-full flex-col gap-4 {darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-black'} min-h-[30vh] rounded-lg! " contenteditable="true"
>

</div>
