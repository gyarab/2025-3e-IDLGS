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
	import ResinElement from './ResinElement.svelte';
	import ResinItemSelect from './ResinItemSelect.svelte';
	import { RElementAIChat } from '$lib/interactive/elements/aichat';
	import ResinListElement from './ResinListElement.svelte';
	import ResinSidebar from './ResinSidebar.svelte';
	import { RElement } from '$lib/interactive/element.svelte';
	import { RElementArrowPoint } from '$lib/interactive/elements/arrowpoint';
	import { RElementCard } from '$lib/interactive/elements/card';
	import { RElementCartesian } from '$lib/interactive/elements/cartesian';
	import { RElementCheckbox } from '$lib/interactive/elements/checkbox';
	import { RElementCodeInput } from '$lib/interactive/elements/codeinput';
	import { RElementEmbedFrame } from '$lib/interactive/elements/embed';
	import { RElementGraph } from '$lib/interactive/elements/graph';
	import { RElementImage } from '$lib/interactive/elements/image';
	import { RElementInputTextSmall } from '$lib/interactive/elements/inputtextsmall';
	import { RElementInputTextArea } from '$lib/interactive/elements/inputtextarea';
	import { RElementLetterInput } from '$lib/interactive/elements/letterinput';
	import { RElementText } from '$lib/interactive/elements/text';
	import { RElementVideoPlayer } from '$lib/interactive/elements/video';

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

	const mmHandler = (e: MouseEvent) => {
		mousePosX = e.pageX;
		mousePosY = e.pageY;
	};

	const odoHandler = (e: DragEvent) => {
		if (!isDragging) return;

		e.preventDefault();
		elementWidthShowValue = widthBegin + (e.pageX - dragBeginX) * 2;
		elementHeightShowValue = heightBegin + (e.pageY - dragBeginY) * 2;
	};

	onMount(() => {
		if (!browser) return;

		let rect = document.getElementById('workspace')?.getBoundingClientRect();
		if (!rect) throw Error('No workspace element found!');

		elementWidthShowValue = rect.width / 3;
		elementHeightShowValue = rect.height / 3;
		widthBegin = elementWidthShowValue;
		heightBegin = elementHeightShowValue;

		addEventListener('mousemove', mmHandler);
		addEventListener('dragover', odoHandler);
	});
	onDestroy(() => {
		if (!browser) return;

		removeEventListener('mousemove', mmHandler);
		removeEventListener('dragover', odoHandler);
	});
</script>

<svelte:head>
	<title>RESIN</title>
</svelte:head>

<div class="relative flex w-full grow flex-row">
	<div class="absolute top-2 left-3/10 flex flex-col gap-0">
		<div class="flex w-full flex-row gap-2">
			<span>
				Canvas width: {elementWidthShowValue}px
			</span>
		</div>
		<div class="flex w-full flex-row gap-2">
			<span>
				Canvas height: {elementHeightShowValue}px
			</span>
		</div>
		<div class="flex w-full flex-col gap-2 max-w-1/2">
			<div>{el.parsed}</div>
		</div>
	</div>
	<div class="flex max-h-screen flex-col gap-2 overflow-hidden bg-neutral-500 p-5">
		<h2>RESIN interactive element builder</h2>
		<div class="flex max-h-1/3 grow flex-col gap-2 rounded-lg bg-neutral-600 p-5">
			<h3>Add new elements</h3>
			<div class="grid grid-cols-3 gap-2 overflow-scroll">
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementAIChat());
					}}
					name={'AI Chat'}
					icon={'speak-ai'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementArrowPoint());
					}}
					name={'Arrow point'}
					icon={'arrow-left-right'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementCard());
					}}
					name={'Card'}
					icon={'checkbox-blank'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementCartesian());
					}}
					name={'Cartesian'}
					icon={'layout-grid'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementCheckbox());
					}}
					name={'Checkbox'}
					icon={'checkbox'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementCodeInput());
					}}
					name={'Code input'}
					icon={'code-s-slash'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementEmbedFrame());
					}}
					name={'Embed'}
					icon={'artboard'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementGraph());
					}}
					name={'Graph'}
					icon={'bar-chart-grouped'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementImage());
					}}
					name={'Image'}
					icon={'image-2'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementInputTextArea());
					}}
					name={'Input text area'}
					icon={'keyboard-box'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementInputTextSmall());
					}}
					name={'Input text small'}
					icon={'keyboard'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementLetterInput());
					}}
					name={'Letter input'}
					icon={'edit-box'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementText());
					}}
					name={'Text'}
					icon={'file-text'}
				/>
				<ResinItemSelect
					onclick={() => {
						el?.addElementDone(new RElementVideoPlayer());
					}}
					name={'Video'}
					icon={'video'}
				/>
			</div>
		</div>
		<div class="flex grow flex-col gap-2 rounded-lg bg-neutral-600 p-5">
			<h3>Current elements</h3>
			{#key el}
				{#each el?.elements as element (element.uuid)}
					<ResinListElement el={element} bind:uuidVariable={selectedElementUuid} />
				{:else}
					<div class="flex flex-col grow w-full justify-center items-center">No elements yet.</div>
				{/each}
			{/key}
		</div>
		<div class="flex grow flex-col gap-2 rounded-lg bg-neutral-600 p-5">
			<h3>Manage RESIN</h3>
			Aspect ratio TODO
			<div class="grow"></div>
			<div class="grid grid-cols-2 gap-2">
				<button class="button-violet group">
					<i class="ri-import-line text-xl not-group-hover:hidden"></i>
					<i class="ri-import-fill text-xl group-hover:hidden"></i>
					Import
				</button>
				<button class="button-green group">
					<i class="ri-export-line text-xl not-group-hover:hidden"></i>
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
			class="relative rounded-lg bg-white p-5"
			bind:clientWidth={elementWidthShowValue}
			bind:clientHeight={elementHeightShowValue}
			style="width: {elementWidthShowValue}px; height: {elementHeightShowValue}px;"
		>
			{#key el}
				{#each el?.elements as element (element.uuid)}
					<ResinElement
						bind:x={element.x}
						bind:y={element.y}
						bind:width={element.width}
						bind:height={element.height}
						visible={element.visible}
						bgcolor={element.bgcolor}
						fgcolor={element.fgcolor}
						rounded={element.rounded}
						uuid={element.uuid}
						bind:uuidVariable={selectedElementUuid}
						{mousePosX}
						{mousePosY}
						canvasWidth={elementWidthShowValue}
						canvasHeight={elementHeightShowValue}
						opacity={element.opacity}
					/>
				{/each}
			{/key}
			<div
				class="absolute -right-10 -bottom-10 z-40 flex flex-row items-center gap-0 rounded-full bg-violet-700 text-2xl"
				role="main"
				ondragstart={(e) => {
					isDragging = true;
					e.stopPropagation();
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
				<span class="p-1 text-base"> Canvas size </span>
			</div>
		</div>
	</div>
	{#if selectedElementUuid != ''}
		<ResinSidebar el={el.getElementByUuid(selectedElementUuid) as RElement} />
	{/if}
</div>
