<!--

RESIN
Main page
Author: Martin Bykov

-->

<script lang="ts">
	//TODO translations

	import { browser } from '$app/environment';
	import { RInteractive } from '$lib/interactive/interactive.svelte';
	import { onDestroy, onMount } from 'svelte';
	import ResinElement from './element/ResinElement.svelte';

	import ResinListElement from './element/ResinListElement.svelte';
	import ResinSidebar from './ResinSidebar.svelte';
	import { RElement } from '$lib/interactive/element.svelte';
	import ResinElementAddition from './element/ResinElementAddition.svelte';
	import { gcd } from '$lib/math';

	let el: RInteractive = $state(new RInteractive());

	let mousePosX = $state(0);
	let mousePosY = $state(0);

	let elementWidthShowValue = $state(0);
	let elementHeightShowValue = $state(0);

	let selectedElementUuid = $state('');

	let dragBeginX = $derived(mousePosX);
	let dragBeginY = $derived(mousePosY);
	let widthBegin = $state(0);
	let heightBegin = $state(0);
	let isDragging = $state(false);

	let shiftPressed = $state(false);

	let widthMax = $state(0);
	let heightMax = $state(0);

	const keyHandler = (e: KeyboardEvent) => {
		shiftPressed = e.shiftKey;
	};

	const mmHandler = (e: MouseEvent) => {
		mousePosX = e.pageX;
		mousePosY = e.pageY;
	};

	const odoHandler = (e: DragEvent) => {
		if (!isDragging) return;

		if (!shiftPressed) {
			elementWidthShowValue = widthBegin + (e.pageX - dragBeginX) * 2;
			elementHeightShowValue = heightBegin + (e.pageY - dragBeginY) * 2;
			el.aspect = elementHeightShowValue / elementWidthShowValue;
		} else {
			elementWidthShowValue = widthBegin + (e.pageX - dragBeginX) * 2 * el.aspect;
			elementHeightShowValue = heightBegin + (e.pageX - dragBeginX) * 2;
		}
	};

	onMount(() => {
		if (!browser) return;

		const elem = document.getElementById('workspace');
		if (!elem) throw Error('No workspace element found!');
		const rect = elem.getBoundingClientRect();

		elementWidthShowValue = rect.width / 3;
		elementHeightShowValue = rect.height / 3;
		widthBegin = elementWidthShowValue;
		heightBegin = elementHeightShowValue;

		widthMax = rect.width;
		heightMax = rect.height;

		new ResizeObserver((data: ResizeObserverEntry[], observer: ResizeObserver) => {
			widthMax =  data[0].contentRect.width;
			heightMax = data[0].contentRect.height;

			elementWidthShowValue = Math.min(elementWidthShowValue, widthMax);
			elementHeightShowValue = Math.min(elementHeightShowValue, heightMax);

			observer.observe(elem);
		}).observe(elem);

		addEventListener('mousemove', mmHandler);
		addEventListener('dragover', odoHandler);
		addEventListener('keydown', keyHandler);
		addEventListener('keyup', keyHandler);
	});
	onDestroy(() => {
		if (!browser) return;

		removeEventListener('mousemove', mmHandler);
		removeEventListener('dragover', odoHandler);
		removeEventListener('keydown', keyHandler);
		removeEventListener('keyup', keyHandler);
	});

	let gcdAspect = $derived(gcd(elementWidthShowValue, elementHeightShowValue));

	$effect(() => {
		elementWidthShowValue = Math.min(Math.max(0, elementWidthShowValue), widthMax);
		elementHeightShowValue = Math.min(Math.max(0, elementHeightShowValue), heightMax);
		el.aspect = elementWidthShowValue / elementHeightShowValue;
	});
</script>

<svelte:head>
	<title>RESIN</title>
</svelte:head>

<div class="relative flex h-screen max-h-screen min-h-screen w-full grow flex-row">
	<div class="absolute top-2 left-3/10 flex w-fit max-w-1/2 flex-col gap-0 bg-black/40 z-50 text-xs">
		<div class="flex flex-row gap-2">
			<span>
				Canvas width: {elementWidthShowValue}px
			</span>
		</div>
		<div class="flex flex-row gap-2">
			<span>
				Canvas height: {elementHeightShowValue}px
			</span>
		</div>
		<div class="flex flex-col gap-2">
			<div>{el.parsed}</div>
		</div>
	</div>
	<div
		class="flex max-h-screen flex-col gap-2 overflow-hidden bg-neutral-500 p-5"
	>
		<h2>RESIN interactive element builder</h2>

		<ResinElementAddition {el} />

		<div class="flex grow flex-col gap-2 rounded-lg bg-neutral-600 p-5">
			<h3>Current elements</h3>
			{#key el}
				{#each el?.elements as element (element.uuid)}
					<ResinListElement
						el={element}
						bind:uuidVariable={selectedElementUuid}
					/>
				{:else}
					<div
						class="flex flex-col grow w-full justify-center items-center"
					>
						No elements yet.
					</div>
				{/each}
			{/key}
		</div>
		<div class="flex grow flex-col gap-2 rounded-lg bg-neutral-600 p-5">
			<h3>Manage RESIN</h3>
			<div class="flex flex-row gap-2">
				Aspect ratio: {el.aspect.toFixed(2)}:1
				<span class="italic opacity-70"
					>{elementWidthShowValue / gcdAspect}:{elementHeightShowValue / gcdAspect}</span
				>
			</div>
			<div class="flex flex-row items-center gap-2">
				Width:
				<input
					type="number"
					min="0"
					bind:value={elementWidthShowValue}
					name="width"
					class="input-text-resin grow"
					placeholder="Width"
				/>
				px
			</div>
			<div class="flex flex-row items-center gap-2">
				Height:
				<input
					type="number"
					min="0"
					bind:value={elementHeightShowValue}
					name="height"
					class="input-text-resin grow"
					placeholder="Width"
				/>
				px
			</div>
			<div class="grow"></div>
			<div class="grid grid-cols-2 gap-2">
				<button class="button-violet group">
					<i class="ri-import-line text-xl not-group-hover:hidden"
					></i>
					<i class="ri-import-fill text-xl group-hover:hidden"></i>
					Import
				</button>
				<button class="button-green group">
					<i class="ri-export-line text-xl not-group-hover:hidden"
					></i>
					<i class="ri-export-fill text-xl group-hover:hidden"></i>
					Export
				</button>
			</div>
		</div>
	</div>
	<div
		id="workspace"
		class="flex grow-20 flex-col items-center justify-center gap-2 bg-linear-to-tr from-violet-700 to-emerald-500"
	>
		<div
			class="relative max-h-screen rounded-lg bg-white"
			bind:clientWidth={elementWidthShowValue}
			bind:clientHeight={elementHeightShowValue}
			style="width: {elementWidthShowValue}px; height: {elementHeightShowValue}px;"
		>
			<span class="absolute h-full w-full">
				{#key el}
					{#each el?.elements as element, i (element.uuid)}
						<ResinElement
							bind:el={el.elements[i]}
							bind:uuidVariable={selectedElementUuid}
							{mousePosX}
							{mousePosY}
							canvasWidth={elementWidthShowValue}
							canvasHeight={elementHeightShowValue}
						/>
					{/each}
				{/key}
			</span>
			<div
				class="absolute right-0 bottom-0 z-40 flex flex-row items-center gap-0 text-emerald-500 text-2xl"
				role="main"
				ondragstart={() => {
					isDragging = true;
					dragBeginX = mousePosX;
					dragBeginY = mousePosY;
					widthBegin = elementWidthShowValue;
					heightBegin = elementHeightShowValue;
				}}
				draggable="true"
				ondragend={() => {
					isDragging = false;
				}}
			>
				<i class="ri-drag-move-2-line"></i>
			</div>
		</div>
	</div>
	{#if selectedElementUuid != ''}
		<ResinSidebar 
			el={el.getElementByUuid(selectedElementUuid) as RElement}
			{mousePosX}
			{mousePosY}
		 />
	{/if}
</div>
