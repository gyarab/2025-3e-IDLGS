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
			class="relative flex h-[99svh] w-full flex-col items-center justify-center bg-linear-to-br from-white from-0% to-white to-100% text-center"
			style="--tw-gradient-from: {color}; --tw-gradient-to: {darkenHex(
				color,
				80,
			)};"
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
				class="flex flex-col text-4xl font-extrabold text-white sm:text-5xl"
				in:fly|global={{ y: 50, duration: 1000, opacity: 0 }}
			>
				<img
					src="/logo.svg"
					alt="Logo"
					class="h-24 sm:h-30"
				/>
				{m.theInteractiveDigitalTextbook()}
			</div>
			<div
				class="floating-text absolute bottom-15 left-0 flex w-full flex-row justify-center text-white italic opacity-70"
				in:fly|global={{
					y: 50,
					duration: 1000,
					opacity: 0,
					delay: 500,
				}}
			>
				<i class="ri-arrow-down-double-line"></i>
				{m.scrollDownToExploreMore()}
				<i class="ri-arrow-down-double-line"></i>
			</div>
		</div>
	{/key}
{/if}

<style>
	.floating-text {
		animation: float-and-pause 4s ease-in-out infinite;
	}

	@keyframes float-and-pause {
		0%,
		100%,
		50% {
			transform: translateY(0);
		}
		75% {
			transform: translateY(10px);
		}
	}
</style>
