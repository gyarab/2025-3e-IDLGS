<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import CRWordDescription from './components/CRWordDescription.svelte';
	import CRGridElement from './components/CRGridElement.svelte';

	let {
		backgroundColorR,
		backgroundColorG,
		backgroundColorB,
		foregroundColorR,
		foregroundColorG,
		foregroundColorB,
		offsets,
		columnId,
		words,
		clues,
		descriptions,
		solution,
	}: {
		backgroundColorR: number;
		backgroundColorG: number;
		backgroundColorB: number;
		foregroundColorR: number;
		foregroundColorG: number;
		foregroundColorB: number;
		offsets: number[];
		columnId: number;
		words: string[];
		clues: string[];
		descriptions: string[];
		solution: string;
	} = $props();
</script>

<div
	class="flex w-full grow flex-row overflow-scroll rounded-2xl"
	style="background-color: rgb({backgroundColorR}, {backgroundColorG}, {backgroundColorB}); color: rgb({foregroundColorR}, {foregroundColorG}, {foregroundColorB});"
>
	<div
		class="flex h-full w-full grow flex-col items-center justify-center gap-2"
	>
		<div class="grow">CONTENT!</div>
	</div>

	<!-- word descriptions -->
	<div class="flex min-w-1/4 flex-col gap-2">
		{#each descriptions as desc, i}
			<CRWordDescription
				hint={clues[i]}
				description={desc}
				index={i}
				length={words[i].length}
			/>
		{/each}
	</div>
</div>
