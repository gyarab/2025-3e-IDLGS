<script lang="ts">
	import { darkMode, m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Progress from './ui/Progress.svelte';
	import TypeSelection from './ui/TypeSelection.svelte';
	import { darkenHex } from '$lib';
	import BasicInformation from './ui/BasicInformation.svelte';
	import PageControl from '../../../../components/PageControl.svelte';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
		};
	} = $props();

	let runAnim = $state(false);

	let stage = $state(0);

	//exercise temp data
	let type = $state('');
	let name = $state('');
	let description = $state('');

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
						/>
					{:else if stage == 2}
						{#if type == 'CRS'}{:else if type == 'CRW'}{:else if type == 'DEF'}{:else if type == 'GRP'}{:else if type == 'GEO'}{:else if type == 'EXT'}{/if}
					{/if}
					{#if stage != 0}
						<PageControl
							bind:stage
							darkMode={data.darkMode}
							color={data.color}
							disableNext={(stage == 1 &&
								(name.length == 0 ||
									description.length == 0)) ||
								false}
							disablePrev={false}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/key}
