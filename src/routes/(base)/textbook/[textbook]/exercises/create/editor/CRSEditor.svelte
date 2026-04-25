<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import CRS from '$src/routes/(base)/exerciseRendering/CRS.svelte';

	let {
		crWords = $bindable([]),
		crClues = $bindable([]),
		crDescriptions = $bindable([]),
		crSolution = $bindable(''),
		backgroundColorR = $bindable(0),
		backgroundColorG = $bindable(0),
		backgroundColorB = $bindable(0),
		foregroundColorR = $bindable(0),
		foregroundColorG = $bindable(0),
		foregroundColorB = $bindable(0),
		crsOffsets = $bindable([]),
		crsColumnId = $bindable(0),
	}: {
		backgroundColorR: number;
		backgroundColorG: number;
		backgroundColorB: number;
		foregroundColorR: number;
		foregroundColorG: number;
		foregroundColorB: number;
		crsOffsets: number[];
		crsColumnId: number;
		crWords: string[];
		crClues: string[];
		crDescriptions: string[];
		crSolution: string;
	} = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.crosswordWithGuess()}</h2>
	</div>

	<div class="flex w-full flex-row justify-center gap-2">
		<!-- TODO edit buttons row -->
	</div>

	<CRS
		offsets={crsOffsets}
		columnId={crsColumnId}
		words={crWords}
		clues={crClues}
		descriptions={crDescriptions}
		solution={crSolution}
		{backgroundColorR}
		{backgroundColorG}
		{backgroundColorB}
		{foregroundColorR}
		{foregroundColorG}
		{foregroundColorB}
	/>
</div>
