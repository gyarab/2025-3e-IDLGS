<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex } from '$lib';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { getLocale } from '$lib/paraglide/runtime';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();

	let locale = $derived(getLocale());

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});
</script>

{#if ready}
	{#key ready}
		<div
			class="relative flex h-[93svh] w-full flex-col items-center justify-center bg-linear-to-br from-white from-0% to-white to-100%"
			style="
		--tw-gradient-from: {color};
		--tw-gradient-to: {darkenHex(color, 100)};
	"
		>
			<i
				in:fade|global={{ delay: 500, duration: 1000 }}
				class="ri-book-fill absolute right-1/15 bottom-1/8 z-10 scale-200 rotate-15 animate-pulse text-9xl text-white! opacity-30"
			></i>
			<i
				in:fade|global={{ delay: 1000, duration: 1000 }}
				class="ri-pencil-ai-fill absolute top-1/3 left-1/15 z-10 scale-200 -rotate-15 animate-pulse text-9xl text-white! opacity-30"
			></i>
			<i
				in:fade|global={{ delay: 1500, duration: 1000 }}
				class="ri-home-2-fill absolute top-1/8 left-2/3 z-10 scale-200 -rotate-25 animate-pulse text-9xl text-white! opacity-30"
			></i>
			<div
				class="text-5xl font-extrabold text-white flex flex-col"
				in:fly|global={{ y: 50, duration: 1000, opacity: 0 }}
			>
				<img
					src="/logo.svg"
					alt="Logo"
					class="hidden h-30 sm:inline"
				/>
				{m.theInteractiveDigitalTextbook()}
			</div>
			<div
				class="absolute bottom-15 left-0 flex w-full flex-row justify-center text-white italic opacity-70"
				in:fly|global={{ y: 50, duration: 1000, opacity: 0, delay: 500 }}
			>
				<i class="ri-arrow-down-double-line"></i>
				{m.scrollDownToExploreMore()}
				<i class="ri-arrow-down-double-line"></i>
			</div>
		</div>
	{/key}
{/if}
