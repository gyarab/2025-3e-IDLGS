<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { browser } from '$app/environment';
	import {
		RESIN_MIN_ELEMENT_SIZE,
		type RElement,
	} from '$lib/interactive/element.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { RESIN_MAX_SNAP } from '$lib/interactive/interactive.svelte';
	import Dragger from '../components/Dragger.svelte';

	let {
		el = $bindable(),
		uuidVariable = $bindable(),
		canvasWidth,
		canvasHeight,
		snappingAllowed,
	}: {
		el: RElement;
		uuidVariable: string;
		canvasWidth: number;
		canvasHeight: number;
		snappingAllowed: boolean;
	} = $props();

	let elementElement: HTMLElement | undefined = $state(undefined);
	let sizeElement: HTMLElement | undefined = $state(undefined);
	let aspectBegin: number = $state(0);
	let shiftPressed: boolean = $state(false);

	const keyHandler = (e: KeyboardEvent) => {
		shiftPressed = e.shiftKey;
	};

	onMount(() => {
		if (!browser) return;

		aspectBegin = el.width / el.height;

		addEventListener('keydown', keyHandler);
		addEventListener('keyup', keyHandler);
	});
	onDestroy(() => {
		if (!browser) return;

		removeEventListener('keydown', keyHandler);
		removeEventListener('keyup', keyHandler);
	});

	$effect(() => {
		el.x = Math.max(0, Math.min(el.x, 100 - el.width));
		el.y = Math.max(0, Math.min(el.y, 100 - el.height));
		el.width = Math.max(
			RESIN_MIN_ELEMENT_SIZE,
			Math.min(el.width, 100 - el.x),
		);
		el.height = Math.max(
			RESIN_MIN_ELEMENT_SIZE,
			Math.min(el.height, 100 - el.y),
		);
	});
</script>

<div
	bind:this={elementElement}
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
>
	<button
		class="
	absolute top-0 left-0 z-36 h-full w-full overflow-hidden
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
		aria-label={'RESIN'}
	>
		<div class="h-full w-full"></div>
	</button>
	{#if uuidVariable == el.uuid}
		<div
			class="absolute right-0 bottom-0 z-40 flex flex-row items-center gap-0 text-2xl text-violet-700 opacity-100!"
			aria-label={m.elementSize()}
			bind:this={sizeElement}
		>
			<i class="ri-drag-move-2-line"></i>
		</div>
	{/if}
</div>

<Dragger
	bind:x={el.x}
	bind:y={el.y}
	width={canvasWidth}
	height={canvasHeight}
	overrideDragFunction={(dx, dy) => {
		el.x += dx;
		el.y += dy;
	}}
	snappingFunction={() => {
		if (snappingAllowed) {
			//x snap
			if (
				el.x < 50 - el.width / 2 + RESIN_MAX_SNAP &&
				el.x > 50 - el.width / 2 - RESIN_MAX_SNAP
			) {
				el.x = 50 - el.width / 2;
			}

			//y snap
			if (
				el.y < 50 - el.height / 2 + RESIN_MAX_SNAP &&
				el.y > 50 - el.height / 2 - RESIN_MAX_SNAP
			) {
				el.y = 50 - el.height / 2;
			}
		}
	}}
	element={elementElement}
/>

<Dragger
	bind:x={el.width}
	bind:y={el.height}
	width={canvasWidth}
	height={canvasHeight}
	overrideDragFunction={(dx, dy) => {
		console.log(shiftPressed);
		if (!shiftPressed) {
			el.width += dx;
			el.height += dy;
			aspectBegin = el.width / el.height;
		} else {
			el.width += dx * aspectBegin;
			el.height += dx;
		}
	}}
	element={sizeElement}
/>
