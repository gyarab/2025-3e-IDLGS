<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { darkenHex } from '$lib';
	import Progress from './Progress.svelte';

	let runAnim: boolean = $state(false);

	onMount(() => {
		runAnim = true;
	});

	let {
		children,
		color,
		darkMode,
		texts,
		title,
		helpLink,
		backLink,
		stage = $bindable(0),
		emoji,
	}: {
		children: Snippet;
		color: string;
		darkMode: boolean;
		texts: string[];
		title: string;
		helpLink: string;
		backLink: string;
		stage: number;
		emoji: string;
	} = $props();
</script>

<!-- OOBE style creation dialogue -->

{#if runAnim}
	{#key runAnim}
		<div
			class="relative flex h-screen! w-screen! max-w-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-white from-0% to-white to-100%"
			style="--tw-gradient-from: {color}; --tw-gradient-to: {darkenHex(
				color,
				80,
			)};"
		>
			<i
				in:fade={{ delay: 100, duration: 500 }}
				class="{emoji} absolute right-1/25 bottom-1/8 scale-200 rotate-15 text-9xl text-white! opacity-30"
			></i>
			<i
				in:fade={{ delay: 200, duration: 500 }}
				class="{emoji} absolute top-2/8 left-1/25 scale-200 -rotate-15 text-9xl text-white! opacity-30"
			></i>
			<div
				in:fly={{ duration: 300, x: 0, y: -100, opacity: 0 }}
				class="shadow-lg backdrop-blur-xs {darkMode
					? 'bg-neutral-700/70 text-white!'
					: 'bg-neutral-100/70 text-black!'} flex h-full w-full flex-col gap-2 overflow-hidden rounded-xl sm:h-5/6 sm:w-5/6"
			>
				<div class="flex w-full grow flex-row overflow-hidden">
					<Progress
						bind:stage
						{darkMode}
						{color}
						{title}
						{backLink}
						{helpLink}
						{texts}
						{emoji}
					/>
					<div
						class="flex w-full grow flex-col gap-4 overflow-x-hidden overflow-y-auto p-4"
					>
						{@render children()}
					</div>
				</div>
			</div>
		</div>
	{/key}
{/if}
