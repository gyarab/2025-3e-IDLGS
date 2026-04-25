<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Progress from './ui/Progress.svelte';
	import TypeSelection from './ui/TypeSelection.svelte';
	import { darkenHex } from '$lib';
	import BasicInformation from './ui/BasicInformation.svelte';
	import PageControl from '../../../../components/PageControl.svelte';
	import CRSEditor from './editor/CRSEditor.svelte';
	import CRWEditor from './editor/CRWEditor.svelte';
	import DEFEditor from './editor/DEFEditor.svelte';
	import GRPEditor from './editor/GRPEditor.svelte';
	import GEOEditor from './editor/GEOEditor.svelte';
	import EXTEditor from './editor/EXTEditor.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
		};
	} = $props();

	let runAnim: boolean = $state(false);

	let stage: number = $state(0);

	//exercise temp data
	let type: string = $state('');
	let name: string = $state('');
	let description: string = $state('');
	let thumbnail: string = $state('');

	let backgroundColorR: number = $state(255);
	let backgroundColorG: number = $state(255);
	let backgroundColorB: number = $state(255);
	let foregroundColorR: number = $state(0);
	let foregroundColorG: number = $state(0);
	let foregroundColorB: number = $state(0);
	
	//crossword (crs/crw) specific data
	let crWords: string[] = $state([]);
	let crClues: string[] = $state([]);
	let crDescriptions: string[] = $state([]);	
	let crSolution: string = $state("");

	//crs specific data
	let crsOffsets: number[] = $state([]);
	let crsColumnId: number = $state(0);

	onMount(() => {
		runAnim = true;
	});
</script>

<svelte:head>
	<title>
		{m.createExercise()} | {m.idlgs()}
	</title>
</svelte:head>

<!-- OOBE style creation dialogue -->

{#key runAnim}
	<div
		class="relative flex h-screen! w-screen! flex-col items-center justify-center overflow-hidden bg-linear-to-br from-white from-0% to-white to-100%"
		style="--tw-gradient-from: {data.color}; --tw-gradient-to: {darkenHex(
			data.color,
			80,
		)};"
	>
		<i
			in:fade={{ delay: 100, duration: 500 }}
			class="ri-function-add-line absolute right-1/25 bottom-1/8 scale-200 rotate-15 text-9xl text-white! opacity-30"
		></i>
		<i
			in:fade={{ delay: 200, duration: 500 }}
			class="ri-function-add-line absolute top-2/8 left-1/25 scale-200 -rotate-15 text-9xl text-white! opacity-30"
		></i>

		<div
			in:fly={{ duration: 300, x: 0, y: -100, opacity: 0 }}
			class="shadow-lg backdrop-blur {data.darkMode
				? 'bg-neutral-700/70 text-white!'
				: 'bg-neutral-100/70 text-black!'} flex h-4/5 w-3/4 flex-col gap-2 overflow-hidden rounded-lg"
		>
			<div class="flex w-full grow flex-row">
				<Progress
					bind:stage
					darkMode={data.darkMode}
					color={data.color}
				/>
				<div class="flex w-full grow flex-col gap-4 p-4">
					{#if stage == 0}
						<TypeSelection
							color={data.color}
							darkMode={data.darkMode}
							bind:stage
							bind:type
						/>
					{:else if stage == 1}
						<BasicInformation
							darkMode={data.darkMode}
							color={data.color}
							bind:stage
							bind:name
							bind:description
							bind:thumbnail
						/>
					{:else if stage == 2}
						{#if type == 'CRS'}
							<CRSEditor
								bind:backgroundColorR
								bind:backgroundColorG
								bind:backgroundColorB
								bind:foregroundColorR
								bind:foregroundColorG
								bind:foregroundColorB
								bind:crsOffsets
								bind:crsColumnId
								bind:crWords
								bind:crClues
								bind:crDescriptions
								bind:crSolution
							/>
						{:else if type == 'CRW'}
							<CRWEditor
							
							/>
						{:else if type == 'DEF'}
							<DEFEditor
							
							/>
						{:else if type == 'GRP'}
							<GRPEditor
							
							/>
						{:else if type == 'GEO'}
							<GEOEditor
							
							/>
						{:else if type == 'EXT'}
							<EXTEditor
							
							/>
						{/if}
					{/if}
					{#if stage != 0}
						<PageControl
							bind:stage
							darkMode={data.darkMode}
							color={data.color}
							disableNext={(stage == 1 &&
								(name.length == 0 ||
									description.length == 0 ||
									thumbnail.length == 0)) ||
									(stage == 2) ||
								false}
							disablePrev={false}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/key}
