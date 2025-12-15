<!--

RESIN
Single script block
Author: Martin Bykov

-->

<script lang="ts">
	import type { RScriptBlock } from '$lib/interactive/script/block.svelte';
	import { onDestroy, onMount } from 'svelte';

	let id = $state(crypto.randomUUID());
	let canvas: HTMLCanvasElement | undefined = $state(undefined);
	let context: CanvasRenderingContext2D | undefined = $state(undefined);
	
	onMount(() => {
		canvas = document.getElementById(id) as HTMLCanvasElement;
		context = canvas.getContext('2d') as CanvasRenderingContext2D;

		new ResizeObserver((data: ResizeObserverEntry[], observer: ResizeObserver) => {
			(canvas as HTMLCanvasElement).width = data[0].contentRect.width;
			(canvas as HTMLCanvasElement).height = data[0].contentRect.height;

			context = canvas?.getContext('2d') as CanvasRenderingContext2D;
			block.drawBackground(context);

			observer.observe(canvas as HTMLCanvasElement);
		}).observe(canvas);

		block.drawBackground(context);
	});
	onDestroy(() => {});

	let {
		block,
		uuid = $bindable(""),
	}: {
		block: RScriptBlock;
		uuid: string;
	} = $props();
</script>

<button
	class="
absolute z-40 flex flex-row rounded-lg p-2 font-medium items-center
"
	style="
	background-color: #00000000;
	color:            {block.fgcolor};
	top:              {block.y}%;
	left:             {block.x}%;
	width:            {block.width}%;
	height:           {block.height}%;
"
onclick={() => {
	uuid = block.uuid;
}}
>
	<canvas {id} class="absolute top-0 left-0 z-41 h-full w-full">Canvas not supported.</canvas>
	<div class="grow-2"></div>
	<div class="grow z-42">{block.text}</div>
	<div class="grow-7"></div>
</button>
