<!--

RESIN
Graphical representation of a single RElement.
Author: Martin Bykov

-->

<script lang="ts">
	//TODO snap to 100%

	import { browser } from '$app/environment';
	import { RESIN_MIN_ELEMENT_SIZE, type RElement } from '$lib/interactive/element.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { RESIN_MAX_SNAP } from '$lib/interactive/interactive.svelte';

	let {
		el = $bindable(),
		uuidVariable = $bindable(),
		mousePosX,
		mousePosY,
		canvasWidth,
		canvasHeight,
	}: {
		el: RElement;
		uuidVariable: string;
		mousePosX: number;
		mousePosY: number;
		canvasWidth: number;
		canvasHeight: number;
	} = $props();

	let dragBeginX = $derived(mousePosX);
	let dragBeginY = $derived(mousePosY);
	let widthBegin = $state(0);
	let heightBegin = $state(0);
	let aspectBegin = $state(0);
	let xBegin = $state(0);
	let yBegin = $state(0);
	let isDragging = $state(false);
	let isDraggingPosition = $state(false);
	let shiftPressed = $state(false);

	const odoHandler = (e: DragEvent) => {
		if (!isDragging) return;

		if (!shiftPressed) {
			el.width = widthBegin + ((e.pageX - dragBeginX) / canvasWidth) * 100;
			el.height = heightBegin + ((e.pageY - dragBeginY) / canvasHeight) * 100;
		} else {
			el.width = widthBegin + ((e.pageX - dragBeginX) / canvasWidth) * 100 * aspectBegin;
			el.height = heightBegin + ((e.pageX - dragBeginX) / canvasHeight) * 100;
		}

		return false;
	};

	const odoPosHandler = (e: DragEvent) => {
		if (!isDraggingPosition) return;

		el.x = xBegin + ((e.pageX - dragBeginX) / canvasWidth) * 100;
		el.y = yBegin + ((e.pageY - dragBeginY) / canvasHeight) * 100;

		//x snap
		if(el.x < (50-el.width/2)+RESIN_MAX_SNAP && el.x > (50-el.width/2)-RESIN_MAX_SNAP) {
			el.x = 50-(el.width/2);	
		}

		//y snap
		if(el.y < (50-el.height/2)+RESIN_MAX_SNAP && el.y > (50-el.height/2)-RESIN_MAX_SNAP) {
			el.y = 50-(el.height/2);	
		}

		return false;
	};

	const keyHandler = (e: KeyboardEvent) => {
		shiftPressed = e.shiftKey;
	};

	onMount(() => {
		if (!browser) return;

		widthBegin = el.width;
		heightBegin = el.height;
		aspectBegin = widthBegin / heightBegin;

		addEventListener('dragover', odoHandler);
		addEventListener('dragover', odoPosHandler);
		addEventListener('keydown', keyHandler);
		addEventListener('keyup', keyHandler);
	});
	onDestroy(() => {
		if (!browser) return;

		removeEventListener('dragover', odoHandler);
		removeEventListener('dragover', odoPosHandler);
		removeEventListener('keydown', keyHandler);
		removeEventListener('keyup', keyHandler);
	});

	$effect(() => {
		el.x = Math.max(0, Math.min(el.x, 100-el.width));
		el.y = Math.max(0, Math.min(el.y, 100-el.height));
		el.width = Math.max(RESIN_MIN_ELEMENT_SIZE, Math.min(el.width, 100-el.x));
		el.height = Math.max(RESIN_MIN_ELEMENT_SIZE, Math.min(el.height, 100-el.y));
	});
</script>

<div
	class="absolute z-35 {el.visible ? '' : 'hidden'} 	{el.uuid === uuidVariable
		? 'border-2 border-violet-700'
		: ''}"
	style="
		top:              {el.y}%;
		left:             {el.x}%;
		width:            {el.width}%;
		height:           {el.height}%;
		border-radius:    {el.rounded}px;
		"
	role="main"
>
	<button
		class="
	h-full w-full overflow-hidden absolute z-36 top-0 left-0
	"
		id={el.uuid}
		style="
		background-color: {el.bgcolor};
		color:            {el.fgcolor};
		border-radius:    {el.rounded}px;
		opacity:          {el.opacity};
	"
		onclick={() => {
			if (uuidVariable == el.uuid) uuidVariable = '';
			else uuidVariable = el.uuid;
		}}
		ondragstart={(e) => {
		e.stopPropagation();
		isDraggingPosition = true;
		xBegin = el.x;
		yBegin = el.y;
	}}
	ondragend={() => {
		isDraggingPosition = false;
	}}
	draggable="true"
		aria-label="RESIN ELEMENT"
	>
		<div class="w-full h-full"></div>
	</button>

	{#if uuidVariable == el.uuid}
		<div
			class="absolute right-0 bottom-0 z-40 flex flex-row items-center gap-0 text-2xl opacity-100! text-violet-700"
			role="main"
			ondragstart={(e) => {
				e.stopPropagation();
				isDragging = true;
				widthBegin = el.width;
				heightBegin = el.height;
				aspectBegin = widthBegin / heightBegin;
			}}
			ondragend={() => {
				isDragging = false;
			}}
			draggable="true"
			aria-label="Element size"
		>
			<i class="ri-drag-move-2-line"></i>
		</div>
	{/if}
</div>
