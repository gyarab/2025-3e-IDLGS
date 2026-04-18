<script lang="ts">
	import { darkMode, m } from "$lib/paraglide/messages";
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import Progress from "./ui/Progress.svelte";
	import TypeSelection from "./ui/TypeSelection.svelte";
	import { darkenHex } from "$lib";

	let {
		data,
	}: {
		data: {
			darkMode: boolean,
			color: string,
		},
	} = $props();

	let runAnim = $state(false);

	let stage = $state(0);

	onMount(() => {
		runAnim = true;
	})
</script>

<svelte:head>
	<title>
		{m.createExercise()} | {m.idlgs()}
	</title>
</svelte:head>

<!-- OOBE style creation dialogue -->

{#key runAnim}
<div
	class="flex flex-col w-screen! h-screen! overflow-hidden justify-center items-center relative bg-linear-to-br from-0% to-100% from-white to-white"
	style="--tw-gradient-from: {data.color}; --tw-gradient-to: {darkenHex(data.color, 80)};"
>
	<i in:fade={{delay: 100, duration: 500}} class="ri-function-add-line absolute text-9xl opacity-30 text-white! bottom-1/8 right-1/25 rotate-15 scale-200"></i>
	<i in:fade={{delay: 200, duration: 500}} class="ri-function-add-line absolute text-9xl opacity-30 text-white! top-2/8 left-1/25 -rotate-15 scale-200"></i>

	<div 
			in:fly={{duration: 300, x: 0, y: -100, opacity: 0}}
	class="shadow-lg backdrop-blur {data.darkMode ? "bg-neutral-700/70 text-white!" : "bg-neutral-100/70 text-black!"} flex flex-col gap-2 w-3/4 h-4/5 rounded-lg overflow-hidden"
	>
		<div class="flex flex-row grow w-full">
			<Progress bind:stage darkMode={data.darkMode} color={data.color} />
			{#if stage == 0}
				<TypeSelection color={data.color} darkMode={data.darkMode} bind:stage />
			{/if}
		</div>
	</div>
</div>
{/key}