<!--

RESIN
Graphical representation of a single RElement.
Author: Martin Bykov

-->

<script lang="ts">
	//TODO snap to 100%

	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	let {
		x = $bindable(),
		y = $bindable(),
		width = $bindable(),
		height = $bindable(),
		visible,
		bgcolor,
		fgcolor,
		rounded,
		uuid,
		uuidVariable = $bindable(),
		mousePosX,
		mousePosY,
		canvasWidth,
		canvasHeight,
		opacity
	}: {
		x: number;
		y: number;
		width: number;
		height: number;
		visible: boolean;
		bgcolor: string;
		fgcolor: string;
		rounded: number;
		uuid: string;
		uuidVariable: string;
		mousePosX: number;
		mousePosY: number;
		canvasWidth: number;
		canvasHeight: number;
		opacity: number;
	} = $props();

	let dragBeginX = $derived(mousePosX);
	let dragBeginY = $derived(mousePosY);
	let widthBegin = $state(0);
	let heightBegin = $state(0);
	let xBegin = $state(0);
	let yBegin = $state(0);
	let isDragging = $state(false);
	let isDraggingPosition = $state(false);

	const odoHandler = (e: DragEvent) => {
		if (!isDragging) return;

		e.preventDefault();

		width = widthBegin + ((e.pageX - dragBeginX) / canvasWidth) * 100;
		height = heightBegin + ((e.pageY - dragBeginY) / canvasHeight) * 100;

		return false;
	};

	const odoPosHandler = (e: DragEvent) => {
		if (!isDraggingPosition) return;

		e.preventDefault();

		x = xBegin + ((e.pageX - dragBeginX) / canvasWidth) * 100;
		y = yBegin + ((e.pageY - dragBeginY) / canvasHeight) * 100;

		return false;
	};

	onMount(() => {
		if (!browser) return;

		widthBegin = width;
		heightBegin = height;

		addEventListener('dragover', odoHandler);
		addEventListener('dragover', odoPosHandler);
	});
	onDestroy(() => {
		if (!browser) return;

		removeEventListener('dragover', odoHandler);
		removeEventListener('dragover', odoPosHandler);
	});
</script>

<div
	class="absolute z-45 {visible ? '' : 'hidden'} 	{uuid === uuidVariable
		? 'border-2 border-violet-700'
		: ''}"
	style="
		top:              {y}%;
		left:             {x}%;
		width:            {width}%;
		height:           {height}%;
		border-radius:    {rounded}px;
		"
	role="main"
	ondragstart={(e) => {
		e.stopPropagation();
		isDraggingPosition = true;
		xBegin = x;
		yBegin = y;
	}}
	ondragend={() => {
		isDraggingPosition = false;
	}}
	draggable="true"
>
	<button
		class="
	h-full w-full overflow-hidden
	"
		id={uuid}
		style="
		background-color: {bgcolor};
		color:            {fgcolor};
		border-radius:    {rounded}px;
		opacity:          {opacity};
	"
		onclick={() => {
			if (uuidVariable == uuid) uuidVariable = '';
			else uuidVariable = uuid;
		}}
		aria-label={'RESIN ELEMENT'}
	>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque fugiat dignissimos, facilis et
		suscipit repudiandae molestias placeat sint. Ad voluptates tempora mollitia illo quas error
		commodi modi minus fuga repudiandae.
	</button>

	{#if uuidVariable == uuid}
		<div
			class="absolute -right-10 -bottom-10 z-50 flex flex-row items-center gap-0 rounded-full bg-emerald-500 text-2xl opacity-100!"
			role="main"
			ondragstart={(e) => {
				e.stopPropagation();
				isDragging = true;
				widthBegin = width;
				heightBegin = height;
			}}
			ondragend={() => {
				isDragging = false;
			}}
			draggable="true"
		>
			<i class="ri-drag-move-2-line"></i>
			<span class="p-1 text-base"> Element size </span>
		</div>
	{/if}
</div>
