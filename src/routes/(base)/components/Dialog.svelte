<script lang="ts">
	import { fade } from 'svelte/transition';
	import { disableScroll, enableScroll } from '$lib';
	import type { Snippet } from 'svelte';

	let dialog: HTMLDialogElement | undefined = $state(undefined);

	let {
		open = $bindable(true),
		darkMode,
		children,
		css,
	}: {
		open: boolean;
		darkMode: boolean;
		children: Snippet;
		css?: string;
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
		class="fixed top-0 left-0 z-50! flex h-screen! w-screen! flex-col items-center justify-center bg-neutral-800/50"
	>
		<dialog
			bind:this={dialog}
			class="absolute top-1/2 left-1/2 z-51! flex min-h-40 sm:top-2/5 {css} 
				min-w-4/5 grow -translate-1/2 flex-col gap-2 rounded-xl border border-neutral-400/40
				p-5 backdrop-blur-xs sm:min-w-1/2
				{darkMode ? 'bg-neutral-800/80 text-white' : 'bg-neutral-100/80 text-black'}"
			transition:fade|global={{ duration: 200 }}
		>
			{@render children()}
		</dialog>
	</div>
{/if}
