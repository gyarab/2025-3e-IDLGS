<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex, isInViewport } from '$lib';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();

	let container: HTMLDivElement | undefined = $state(undefined);
	let ready = $state(false);

	onMount(() => {
		if (!browser) return;
		setTimeout(() => {
			isInViewport(container!).then(() => {
				ready = true;
			});
		}, 100);
	});
</script>

<div
	class="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden p-6"
	style="background: linear-gradient(135deg, {color}, {darkenHex(
		color,
		80,
	)}); --brand: {color};"
	bind:this={container}
>
	<i
		class="ri-rocket-2-line absolute top-1/6 right-1/15 scale-150 rotate-12 text-8xl text-white opacity-10"
	></i>
	<i
		class="ri-lightbulb-line absolute bottom-1/4 left-1/15 scale-150 -rotate-12 text-8xl text-white opacity-10"
	></i>

	{#if ready}
		<div
			class="z-10 flex w-full max-w-5xl flex-col gap-8 rounded-3xl p-8 shadow-2xl backdrop-blur-xs sm:rounded-4xl md:p-12 {darkMode
				? 'bg-black/60 text-white'
				: 'bg-white/80 text-black'}"
			in:fade={{ duration: 400 }}
		>
			<header class="max-w-2xl">
				<h1
					class="mb-4 text-3xl font-extrabold tracking-tight sm:text-5xl"
					in:fly={{ y: 30, duration: 600 }}
				>
					{m.features()}
				</h1>
				<p
					class="text-lg leading-relaxed opacity-70"
					in:fly={{ y: 30, duration: 600, delay: 100 }}
				>
					{m.heroDescription()}
				</p>
			</header>

			<hr class="opacity-10" />

			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				<!-- Interactive Content -->
				<div
					class="group flex flex-col gap-4 rounded-2xl border p-6 transition-all hover:scale-105 {darkMode
						? 'border-white/10 bg-neutral-800/50'
						: 'border-black/5 bg-white/50'}"
					in:fly={{ y: 40, duration: 600, delay: 200 }}
				>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand) text-2xl text-white shadow-lg"
					>
						<i class="ri-cursor-line"></i>
					</div>
					<h2 class="text-xl font-bold">{m.interactiveContent()}</h2>
					<p class="text-sm leading-relaxed opacity-60">
						{m.featureInteractiveDesc()}
					</p>
				</div>

				<!-- Cutting Edge -->
				<div
					class="group flex flex-col gap-4 rounded-2xl border p-6 transition-all hover:scale-105 {darkMode
						? 'border-white/10 bg-neutral-800/50'
						: 'border-black/5 bg-white/50'}"
					in:fly={{ y: 40, duration: 600, delay: 300 }}
				>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand) text-2xl text-white shadow-lg"
					>
						<i class="ri-cpu-line"></i>
					</div>
					<h2 class="text-xl font-bold">{m.cuttingEdgeFeatures()}</h2>
					<p class="text-sm leading-relaxed opacity-60">
						{m.featureCuttingEdgeDesc()}
					</p>
				</div>

				<!-- Multimedia -->
				<div
					class="group flex flex-col gap-4 rounded-2xl border p-6 transition-all hover:scale-105 {darkMode
						? 'border-white/10 bg-neutral-800/50'
						: 'border-black/5 bg-white/50'}"
					in:fly={{ y: 40, duration: 600, delay: 400 }}
				>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand) text-2xl text-white shadow-lg"
					>
						<i class="ri-play-circle-line"></i>
					</div>
					<h2 class="text-xl font-bold">{m.multimediaSupport()}</h2>
					<p class="text-sm leading-relaxed opacity-60">
						{m.featureMultimediaDesc()}
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>
