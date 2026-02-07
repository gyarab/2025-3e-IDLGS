<!--

RESIN
Main page
Author: Martin Bykov

-->

<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	import { browser } from '$app/environment';
	import { RInteractive } from '$lib/interactive/interactive.svelte';
	import { onDestroy, onMount } from 'svelte';
	import ResinElement from './element/ResinElement.svelte';

	import ResinListElement from './element/ResinListElement.svelte';
	import ResinSidebar from './ResinSidebar.svelte';
	import { RElement } from '$lib/interactive/element.svelte';
	import ResinElementAddition from './element/ResinElementAddition.svelte';
	import { gcd } from '$lib/math';
	import Dragger from './components/Dragger.svelte';

	let el: RInteractive = $state(new RInteractive());

	let ro: ResizeObserver | undefined = $state(undefined);

	let workspaceElement: HTMLDivElement | undefined = $state(undefined);
	let dragSizeElement: HTMLDivElement | undefined = $state(undefined);

	let elementWidthShowValue: number = $state(0);
	let elementHeightShowValue: number = $state(0);

	let snappingAllowed: boolean = $state(true);

	let selectedElementUuid: string = $state('');

	let shiftPressed: boolean = $state(false);

	let widthMax: number = $state(0);
	let heightMax: number = $state(0);

	const keyHandler = (e: KeyboardEvent) => {
		shiftPressed = e.shiftKey;
	};

	const keyDownHandler = (e: KeyboardEvent) => {
		if (selectedElementUuid) {
			let elem = el.getElementByUuid(selectedElementUuid);
			if (elem) {
				switch (e.key) {
					case 'ArrowLeft':
						elem.x--;
						break;
					case 'ArrowUp':
						elem.y--;
						break;
					case 'ArrowRight':
						elem.x++;
						break;
					case 'ArrowDown':
						elem.y++;
						break;
					case 'Escape':
						selectedElementUuid = '';
						break;
				}
			}
		}
	};

	onMount(() => {
		if (!browser) return;
		if (!workspaceElement || !dragSizeElement) return;

		const rect = workspaceElement.getBoundingClientRect();

		elementWidthShowValue = rect.width / 3;
		elementHeightShowValue = rect.height / 3;

		widthMax = rect.width;
		heightMax = rect.height;

		ro = new ResizeObserver((data: ResizeObserverEntry[]) => {
			widthMax = data[0].contentRect.width;
			heightMax = data[0].contentRect.height;

			elementWidthShowValue = Math.min(elementWidthShowValue, widthMax);
			elementHeightShowValue = Math.min(
				elementHeightShowValue,
				heightMax,
			);
		});

		ro.observe(workspaceElement);

		addEventListener('keydown', keyHandler);
		addEventListener('keydown', keyDownHandler);
		addEventListener('keyup', keyHandler);
	});
	onDestroy(() => {
		if (!browser) return;

		removeEventListener('keydown', keyHandler);
		removeEventListener('keydown', keyDownHandler);
		removeEventListener('keyup', keyHandler);

		ro?.disconnect();
	});

	let gcdAspect = $derived(
		gcd(elementWidthShowValue, elementHeightShowValue),
	);

	$effect(() => {
		elementWidthShowValue = Math.min(
			Math.max(0, elementWidthShowValue),
			widthMax,
		);
		elementHeightShowValue = Math.min(
			Math.max(0, elementHeightShowValue),
			heightMax,
		);
		el.aspect = elementWidthShowValue / elementHeightShowValue;
	});
</script>

<svelte:head>
	<title>RESIN</title>
</svelte:head>

<div
	class="relative flex h-screen max-h-screen min-h-screen w-full grow flex-row"
>
	<div
		class="absolute top-2 left-3/10 z-50 flex w-fit max-w-1/2 flex-col gap-0 bg-black/40 text-xs"
	>
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
		class="flex max-h-screen max-w-3/10 flex-col gap-2 overflow-hidden bg-neutral-500 p-5"
	>
		<h2>RESIN {m.interactiveElementEditor()}</h2>

		<ResinElementAddition {el} />

		<div class="flex grow flex-col gap-2 rounded bg-neutral-600 p-5">
			<h3>{m.currentlyAddedElements()}</h3>
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
						{m.noElementsYetAddSome()}
					</div>
				{/each}
			{/key}
		</div>
		<div class="flex grow flex-col gap-2 rounded bg-neutral-600 p-5">
			<h3>{m.manageElement()}</h3>
			<div class="flex flex-row gap-2">
				{m.aspectRatio()}
				{el.aspect.toFixed(2)}:1
				<span class="italic opacity-80"
					>{elementWidthShowValue /
						gcdAspect}:{elementHeightShowValue / gcdAspect}</span
				>
			</div>
			<div class="flex flex-row items-center gap-2">
				{m.width()}:
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
				{m.height()}:
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
			<div class="flex flex-row items-center gap-2">
				{m.snapping()}:
				<input
					type="checkbox"
					bind:checked={snappingAllowed}
					name="snapping"
					class="input-checkbox"
				/>
			</div>
			<div class="grow"></div>
			<div class="grid grid-cols-2 gap-2">
				<button class="button-violet group">
					<i class="ri-import-line text-xl not-group-hover:hidden"
					></i>
					<i class="ri-import-fill text-xl group-hover:hidden"></i>
					{m.import()}
				</button>
				<!-- TODO confirmation modal -->
				<button
					class="button-green group"
					onclick={() => {
						el = new RInteractive();
					}}
				>
					<i
						class="ri-delete-bin-2-line text-xl not-group-hover:hidden"
					></i>
					<i class="ri-delete-bin-2-fill text-xl group-hover:hidden"
					></i>
					{m.clear()}
				</button>
				<button class="button-green group">
					<i class="ri-export-line text-xl not-group-hover:hidden"
					></i>
					<i class="ri-export-fill text-xl group-hover:hidden"></i>
					{m.export()}
				</button>
				<button class="button-violet group">
					<i class="ri-cpu-line text-xl not-group-hover:hidden"></i>
					<i class="ri-cpu-fill text-xl group-hover:hidden"></i>
					{m.compileAndExport()}
				</button>
			</div>
		</div>
	</div>
	<div
		id="workspace"
		bind:this={workspaceElement}
		class="flex grow-20 flex-col items-center justify-center gap-2 bg-linear-to-tr from-violet-800 to-emerald-600"
	>
		<div
			class="relative max-h-screen rounded bg-white"
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
							canvasWidth={elementWidthShowValue}
							canvasHeight={elementHeightShowValue}
							{snappingAllowed}
						/>
					{/each}
				{/key}
			</span>
			<div
				class="absolute right-0 bottom-0 flex flex-row items-center gap-0 text-2xl text-emerald-600"
				bind:this={dragSizeElement}
			>
				<i class="ri-drag-move-2-line"></i>
			</div>
		</div>
	</div>
	{#if selectedElementUuid != ''}
		<ResinSidebar
			el={el.getElementByUuid(selectedElementUuid) as RElement}
			canvasX={elementWidthShowValue}
			canvasY={elementHeightShowValue}
			{snappingAllowed}
		/>
	{/if}
</div>

<Dragger
	bind:x={elementWidthShowValue}
	bind:y={elementHeightShowValue}
	overrideDragFunction={(dx, dy) => {
		if (!shiftPressed) {
			elementWidthShowValue += dx * 2;
			elementHeightShowValue += dy * 2;
			el.aspect = elementHeightShowValue / elementWidthShowValue;
		} else {
			elementWidthShowValue += dx * 2 * el.aspect;
			elementHeightShowValue += dy * 2;
		}
	}}
	element={dragSizeElement}
/>
