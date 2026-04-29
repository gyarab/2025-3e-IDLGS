<script lang="ts">
	import { fade } from 'svelte/transition';
	import { disableScroll, enableScroll } from '$lib';
	import type { Snippet } from 'svelte';

	let dialog: HTMLDialogElement | undefined = $state(undefined);

	let {
		open = $bindable(true),
		darkMode,
		children,
	}: {
		open: boolean;
		darkMode: boolean;
		children: Snippet;
	} = $props();

	$effect(() => {
		if (open) {
			dialog?.showModal();
			disableScroll();
		} else {
			dialog?.close();
			enableScroll();
		}
	});
</script>

{#if open}
	<div
		class="fixed top-0 left-0 z-50! flex h-screen! w-screen! flex-col items-center justify-center bg-neutral-900/50"
	>
		<dialog
			bind:this={dialog}
			class="absolute top-1/3 left-1/2 z-51! flex h-1/2 w-1/2 grow -translate-1/2 flex-col gap-2 rounded-xl p-5 {darkMode
				? 'bg-neutral-800 text-white'
				: 'bg-neutral-100 text-black'}"
			transition:fade|global={{ duration: 250 }}
		>
			{@render children()}
		</dialog>
	</div>
{/if}
