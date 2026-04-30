<script lang="ts">
	//TODO command palette, simple navigation with keys only

	import { m } from '$lib/paraglide/messages';
	import { fade } from 'svelte/transition';
	import { disableScroll, enableScroll } from '$lib';
	import CPAction from './components/CPAction.svelte';

	let {
		open = $bindable(false),
		darkMode,
	}: {
		open: boolean;
		darkMode: boolean;
	} = $props();

	let dialog: HTMLDialogElement | undefined = $state();
	let query = $state('');

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
			class="absolute top-1/3 left-1/2 z-51! flex h-1/2 w-1/2 grow -translate-1/2 flex-col gap-2 rounded-xl p-5
				{darkMode ? 'bg-neutral-800/70 text-white' : 'bg-neutral-50/70 text-black'} backdrop-blur-sm"
			transition:fade|global={{ duration: 250 }}
		>
			<h2>title of command palette?</h2>
			<p>{m.commandPaletteDescription()}</p>
			<input
				type="text"
				class="w-full"
				bind:value={query}
			/>
			<hr />
			{#if query.length > 0}
				<p>results</p>
			{:else}
				<div class="flex grow flex-col items-center justify-center">
					start typing to search
				</div>
			{/if}
			<hr />
			quick actions with illustartions (grid SBB style TODO)
			<div class="grid grid-cols-4 gap-2 pb-2">
				<CPAction
					{darkMode}
					onclick={() => {}}>action</CPAction
				>
				<CPAction
					{darkMode}
					onclick={() => {}}>action</CPAction
				>
				<CPAction
					{darkMode}
					onclick={() => {}}>action</CPAction
				>
				<CPAction
					{darkMode}
					onclick={() => {}}>action</CPAction
				>
				<CPAction
					{darkMode}
					onclick={() => {}}>action</CPAction
				>
				<CPAction
					{darkMode}
					onclick={() => {}}>action</CPAction
				>
				<CPAction
					{darkMode}
					onclick={() => {}}>action</CPAction
				>
				<CPAction
					{darkMode}
					onclick={() => {}}>action</CPAction
				>
			</div>
			<hr />
		</dialog>
	</div>
{/if}
