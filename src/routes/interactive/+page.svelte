<script lang="ts">
	//TODO translations

	import { browser } from '$app/environment';
	import { error } from '@sveltejs/kit';
	import { onDestroy, onMount } from 'svelte';
	import * as resin from '$lib/interactive/index';

	let canvas: HTMLCanvasElement = $state() as HTMLCanvasElement;
	let ie: resin.RInteractive | undefined = $state();

	onMount(() => {
		if (!browser) return;

		let rect = document.getElementById('workspace')?.getBoundingClientRect();
		if (!rect) throw error(418);

		canvas.width = rect?.width;
		canvas.height = rect?.height;

		ie = new resin.RInteractive();
	});
	onDestroy(() => {});
</script>

<svelte:head>
	<title>RESIN</title>
</svelte:head>

<div class="flex w-full grow flex-row">
	<div class="flex grow-3 flex-col gap-2 bg-neutral-500 p-5">
		<h2>RESIN interactive elements</h2>
		<div class="flex grow flex-col rounded-lg bg-neutral-600 p-5">
			<h3>Add new elements</h3>
		</div>
		<div class="flex grow flex-col rounded-lg bg-neutral-600 p-5">
			<h3>Current elements</h3>
		</div>
		<div class="flex grow flex-col rounded-lg bg-neutral-600 p-5">
			<h3>Manage RESIN element</h3>

			<div class="grow"></div>
			<div class="grid grid-cols-2 gap-2">
				<button class="button-violet group">
					<i class="text-xl ri-import-line not-group-hover:hidden"></i>
					<i class="text-xl ri-import-fill group-hover:hidden"></i>
					Import
				</button>
				<button class="button-green group">
					<i class="text-xl ri-export-line not-group-hover:hidden"></i>
					<i class="text-xl ri-export-fill group-hover:hidden"></i>
					Export
				</button>
			</div>
		</div>
	</div>
	<div
		id="workspace"
		class="flex grow-20 flex-col items-center justify-center gap-2 bg-linear-to-tr from-violet-700 to-emerald-500"
	>
		<div class="relative rounded-lg bg-white p-5">
			<canvas class="absolute z-50 h-full w-full" bind:this={canvas}>
				Canvas not supported.
			</canvas>
		</div>
	</div>
</div>
