<script lang="ts">
	import { browser } from '$app/environment';
	import type { RScriptBlock } from '$lib/interactive/script/block.svelte';
	import type { RProgram } from '$lib/interactive/script/program.svelte';
	import { m } from '$lib/paraglide/messages';
	import { onDestroy, onMount } from 'svelte';
	import Dragger from '../components/DraggerRaw.svelte';

	let id = $state(crypto.randomUUID());
	let canvas: HTMLCanvasElement | undefined = $state(undefined);
	let context: CanvasRenderingContext2D | undefined = $state(undefined);

	let element: HTMLElement | undefined = $state(undefined);

	let {
		block = $bindable(),
		uuid = $bindable(''),
		editorWidth,
		editorHeight,
		program = $bindable(),
		snappingAllowed,
	}: {
		block: RScriptBlock;
		uuid: string;
		editorWidth: number;
		editorHeight: number;
		program: RProgram;
		snappingAllowed: boolean;
	} = $props();

	let ro: ResizeObserver | undefined = $state(undefined);

	let collisionX = $derived(program.blocks.toSorted((a, b) => a.x - b.x));
	let collisionY = $derived(program.blocks.toSorted((a, b) => a.y - b.y));

	onMount(() => {
		if (!browser) return;

		context = canvas?.getContext('2d') as CanvasRenderingContext2D;
		if (!context) throw Error("Canvas doesn't canvas...");

		ro = new ResizeObserver((data: ResizeObserverEntry[]) => {
			(canvas as HTMLCanvasElement).width = data[0].contentRect.width;
			(canvas as HTMLCanvasElement).height = data[0].contentRect.height;

			context = canvas?.getContext('2d') as CanvasRenderingContext2D;
			block.drawBackground(context);
		});

		if (canvas) ro.observe(canvas);

		block.drawBackground(context);
	});
	onDestroy(() => {
		if (!browser) return;

		ro?.disconnect();
	});

	$effect(() => {
		block.x = Math.max(0, Math.min(block.x, 100 - block.width));
		block.y = Math.max(0, Math.min(block.y, 100 - block.height));
	});
</script>

<div
	class="
absolute z-40 flex flex-row items-center rounded p-2 font-medium
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
		bind:this={element}
		onclick={() => {
			uuid = block.uuid;
		}}
		class="absolute top-0 left-0 z-41 h-full w-full"
	>
		<div class="flex h-full w-full grow flex-row items-center gap-2">
			<div class="grow-2"></div>
			<div class="z-42 grow">{block.text}</div>
			<div class="grow-7"></div>
		</div>
	</button>
	<canvas
		{id}
		bind:this={canvas}
		class="absolute top-0 left-0 z-40 h-full w-full"
		>Canvas not supported.</canvas
	>
	<div class="absolute right-2 bottom-2 flex flex-row gap-2 text-2xl">
		<!-- add comment -->
		<button
			aria-label={m.addCommentToScriptBlock()}
			onclick={() => {
				//program.addComment();
			}}
			class="button-none h-fit w-fit"
		>
			<i class="ri-chat-4-line z-41"></i>
		</button>
		<i class="ri-drag-move-2-line z-40!"></i>
	</div>
</div>

<Dragger
	bind:x={block.x}
	bind:y={block.y}
	width={editorWidth}
	height={editorHeight}
	snappingFunction={() => {
		if (snappingAllowed) {
			//TODO
		}
	}}
	{element}
/>
