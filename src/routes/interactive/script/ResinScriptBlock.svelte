<!--

RESIN
Single script block
Author: Martin Bykov

-->

<script lang="ts">
	import type { RScriptBlock } from '$lib/interactive/script/block.svelte';
	import type { RProgram } from '$lib/interactive/script/program.svelte';
	import { m } from '$lib/paraglide/messages';
	import { onDestroy, onMount } from 'svelte';

	let id = $state(crypto.randomUUID());
	let canvas: HTMLCanvasElement | undefined = $state(undefined);
	let context: CanvasRenderingContext2D | undefined = $state(undefined);

	let {
		block = $bindable(),
		uuid = $bindable(""),
		mousePosX,
		mousePosY,
		editorWidth,
		editorHeight,
		program = $bindable()
	}: {
		block: RScriptBlock;
		uuid: string;
		mousePosX: number;
		mousePosY: number;
		editorWidth: number;
		editorHeight: number;
		program: RProgram;
	} = $props();
	
	let isDragging = $state(false);
	let xBegin = $state(0);
	let yBegin = $state(0);
	let dragBeginX = $derived(mousePosX);
	let dragBeginY = $derived(mousePosY);

	program.blocks.toSorted((a, b) => a.x - b.x);

	const odoHandler = (e: DragEvent) => {
		if (!isDragging) return;

		block.x = xBegin + ((e.pageX - dragBeginX) / editorWidth) * 100;
		block.y = yBegin + ((e.pageY - dragBeginY) / editorHeight) * 100;

		//snapping to all blocks TODO better than O(n2)
		//

		return false;
	};

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

		addEventListener('dragover', odoHandler);
	});
	onDestroy(() => {
		removeEventListener('dragover', odoHandler);
	});
</script>

<div
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
>
	<button
		onclick={() => {
			uuid = block.uuid;
		}}
		class="absolute top-0 left-0 z-41 h-full w-full"
		aria-label="RESIN SCRIPT BLOCK"
		ondragstart={(e) => {
			e.stopPropagation();
			xBegin = block.x;
			yBegin = block.y;
			isDragging = true;
		}}
		ondragend={() => {
			isDragging = false;
		}}
		draggable="true"
	>
		<div class="w-full h-full flex flex-row gap-2 items-center">
			<div class="grow-2"></div>
			<div class="grow z-42">{block.text}</div>
			<div class="grow-7"></div>
		</div>	
	</button>
	<canvas {id} class="absolute top-0 left-0 z-40 h-full w-full">Canvas not supported.</canvas>
	<div 
		class="absolute bottom-2 right-2 z-41 text-2xl flex flex-row gap-2"
	>
		<!-- add comment -->
		<button 
			aria-label={m.addCommentToScriptBlock()}
			onclick={() => {
				//program.addComment();
			}}
			class="w-fit h-fit button-none"
		>
			<i class="ri-chat-4-line"></i>
		</button>
		<i class="ri-drag-move-2-line"></i>
	</div>
</div>
