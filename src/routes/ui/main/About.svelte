<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex } from '$lib';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	const PILLARS = [
		{ icon: 'ri-instance-line', text: '3D Models' },
		{ icon: 'ri-play-list-add-line', text: 'Multimedia' },
		{ icon: 'ri-shield-flash-line', text: 'Innovation' },
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
	class="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden p-6"
	style="background: linear-gradient(135deg, {color}, {darkenHex(
		color,
		80,
	)}); --brand: {color};"
>
	<i
		class="ri-information-line absolute right-1/10 bottom-1/10 scale-150 rotate-12 text-9xl text-white opacity-10"
	></i>
	<i
		class="ri-global-line absolute top-1/10 left-1/10 scale-150 -rotate-12 text-9xl text-white opacity-10"
	></i>

	{#if ready}
		<div
			class="z-10 flex w-full max-w-5xl flex-col gap-4 rounded-3xl p-8 shadow-xl backdrop-blur-xs sm:gap-8 sm:rounded-4xl md:p-12 {darkMode
				? 'bg-black/60 text-white'
				: 'bg-white/80 text-black'}"
			in:fade={{ duration: 400 }}
		>
			<header class="flex items-center gap-6">
				<h1
					class="text-3xl font-extrabold tracking-tight sm:text-5xl"
					in:fly={{ x: 20, duration: 600 }}
				>
					{m.aboutUs()}
				</h1>
			</header>

			<hr class="opacity-10" />

			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div class="relative md:col-span-2">
					<span
						class="absolute -top-3 -left-2 font-serif text-5xl opacity-10 sm:-top-6 sm:-left-4 sm:text-7xl"
					>
						“
					</span>

					<p
						class="relative z-10 text-lg leading-relaxed opacity-80 md:text-xl md:leading-relaxed"
						in:fly={{ y: 20, duration: 600, delay: 200 }}
					>
						{m.aboutDescription()}
					</p>
				</div>

				<div
					class="flex flex-col justify-center gap-4 rounded-2xl border border-white/10
						p-4 shadow-sm {darkMode
						? 'border-white/10 bg-neutral-800/50'
						: 'border-black/5 bg-neutral-50/60'}"
					in:fly={{ x: 20, duration: 600, delay: 400 }}
				>
					<p
						class="mb-3 text-xs font-bold tracking-widest uppercase opacity-50"
					>
						Core Pillars
					</p>
					<ul class="space-y-3">
						{#each PILLARS as item}
							<li class="flex items-center gap-3">
								<i class="{item.icon} text-(--brand)"></i>
								<span class="text-sm font-semibold">
									{item.text}
								</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div>
