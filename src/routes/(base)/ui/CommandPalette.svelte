<script lang="ts">
	//TODO command palette, simple navigation with keys only

	import { m } from "$lib/paraglide/messages";
	import { fade } from 'svelte/transition';
	import { disableScroll, enableScroll } from '$lib';

	let {
		open = $bindable(false),
		cannotClickOutside = false
	}: {
		open: boolean,
		cannotClickOutside?: boolean
	} = $props();

	let dialog: HTMLDialogElement | undefined = $state();

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
			class="absolute top-1/3 left-1/2 -translate-1/2 z-51! w-1/2 h-1/2 flex flex-col grow gap-2 rounded-xl p-5"
			transition:fade|global={{ duration: 250 }}
		>
			<h2>title of command palette?</h2>
			<p>{m.commandPaletteDescription()}</p>
			<input type="text" class="w-full" />	
			<hr>
			quick actions with illustartions (grid SBB style TODO)
			<div class="grid grid-cols-4 gap-4 *:odd:bg-red-600 *:even:bg-blue-700 *:flex *:flex-col *:grow *:w-full *:h-full">
				<div>action</div>
				<div>action</div>
				<div>action</div>
				<div>action</div>
				<div>action</div>
				<div>action</div>
				<div>action</div>
				<div>action</div>
				
			</div>
		</dialog>
	</div>
{/if}