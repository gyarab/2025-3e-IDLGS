<script lang="ts">
	//TODO command palette, simple navigation with keys only

	import { m } from "$lib/paraglide/messages";
	import { fade } from 'svelte/transition';
	import { disableScroll, enableScroll } from '$lib';
	import CPAction from "./components/CPAction.svelte";

	let {
		open = $bindable(false),
		darkMode,
	}: {
		open: boolean,
		darkMode: boolean
	} = $props();

	let dialog: HTMLDialogElement | undefined = $state();
	let query = $state("");

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
	<div class="flex flex-col items-center justify-center fixed top-0 left-0 w-screen! h-screen! bg-neutral-900/50 z-50!">
		<dialog 
			bind:this={dialog}
			class="absolute top-1/3 left-1/2 -translate-1/2 z-51! w-1/2 h-1/2 flex flex-col grow gap-2 rounded-xl p-5 {darkMode ? 'bg-neutral-700/70 text-white' : 'bg-neutral-100/70 text-black'}"
			transition:fade|global={{ duration: 250 }}
		>
			<h2>title of command palette?</h2>
			<p>{m.commandPaletteDescription()}</p>
			<input type="text" class="w-full" bind:value={query} />
			<hr>
			{#if query.length > 0}
				<p>results</p>
			{:else}
			<div class="flex flex-col justify-center items-center grow">
				start typing to search
			</div>
			{/if}
			<hr>
			quick actions with illustartions (grid SBB style TODO)
			<div class="grid grid-cols-4 gap-2 pb-2">
				<CPAction {darkMode} onclick={()=>{}}>action</CPAction>
				<CPAction {darkMode} onclick={()=>{}}>action</CPAction>
				<CPAction {darkMode} onclick={()=>{}}>action</CPAction>
				<CPAction {darkMode} onclick={()=>{}}>action</CPAction>
				<CPAction {darkMode} onclick={()=>{}}>action</CPAction>
				<CPAction {darkMode} onclick={()=>{}}>action</CPAction>
				<CPAction {darkMode} onclick={()=>{}}>action</CPAction>
				<CPAction {darkMode} onclick={()=>{}}>action</CPAction>
			</div>
			<hr>
		</dialog>
	</div>
{/if}