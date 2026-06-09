<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex, isInViewport } from '$lib';
	import { getLocale } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();

	let ready = $state(false);
	let mainElement: HTMLDivElement | undefined = $state(undefined);

	onMount(() => {
		if (!browser) return;
		isInViewport(mainElement!).then((inViewport) => {
			ready = true;
		});
	});
</script>

<div
	class="flex w-full flex-col overflow-hidden"
	bind:this={mainElement}
>
	{#if ready}
		{#key ready}
			<div
				class="relative flex h-[30svh] w-full flex-col items-center justify-center bg-linear-to-br from-white from-0% to-white to-100%"
				style="--tw-gradient-from: {color}; --tw-gradient-to: {darkenHex(
					color,
					100,
				)};"
			>
				<div
					class="flex flex-col text-3xl font-extrabold text-white"
					in:fly|global={{ y: 50, duration: 1000, opacity: 0 }}
				>
					{m.soundsInteresting()}?
					<div class=""></div>
				</div>
			</div>
		{/key}
	{/if}
</div>
