<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex } from '$lib';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	const FEATURES = [
		{
			icon: 'ri-cursor-line',
			title: m.interactiveContent(),
			desc: m.featureInteractiveDesc(),
			delay: 200,
		},
		{
			icon: 'ri-cpu-line',
			title: m.cuttingEdgeFeatures(),
			desc: m.featureCuttingEdgeDesc(),
			delay: 300,
		},
		{
			icon: 'ri-play-circle-line',
			title: m.multimediaSupport(),
			desc: m.featureMultimediaDesc(),
			delay: 400,
		},
	];

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();

	let ready = $state(false);

	onMount(() => {
		setTimeout(() => {
			ready = true;
		}, 100);
	});
</script>

<div
	class="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden p-4 sm:p-6"
	style="background: linear-gradient(135deg, {color}, {darkenHex(
		color,
		80,
	)}); --brand: {color};"
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
				{#each FEATURES as feature}
					<div
						class="group flex flex-col gap-4 rounded-2xl border p-6
							shadow-sm transition-all hover:scale-105 {darkMode
							? 'border-white/10 bg-neutral-800/50'
							: 'border-black/5 bg-neutral-50/60'}"
						in:fly={{ y: 40, duration: 600, delay: feature.delay }}
					>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-(--brand) text-2xl text-white shadow-lg"
						>
							<i class={feature.icon}></i>
						</div>
						<h2 class="text-xl font-bold">{feature.title}</h2>
						<p class="text-sm leading-relaxed opacity-70">
							{feature.desc}
						</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
