<script lang="ts">
	import ResinItemSelect from './ResinItemSelect.svelte';
	import { RElementAIChat } from '$lib/interactive/elements/aichat';
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
	import type { RInteractive } from '$lib/interactive/interactive.svelte';

	let {
		el
	}: {
		el: RInteractive
	} = $props();
</script>

<div class="flex max-h-1/3 grow flex-col gap-2 rounded-lg bg-neutral-600 p-5">
	<h3>Add new elements</h3>
	<div class="grid grid-cols-3 gap-2 overflow-scroll">
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementAIChat());
			}}
			name="AI Chat"
			icon="speak-ai"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementArrowPoint());
			}}
			name="Arrow point"
			icon="arrow-left-right"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementCard());
			}}
			name="Card"
			icon="checkbox-blank"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementCartesian());
			}}
			name="Cartesian"
			icon="layout-grid"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementCheckbox());
			}}
			name="Checkbox"
			icon="checkbox"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementCodeInput());
			}}
			name="Code input"
			icon="code-s-slash"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementEmbedFrame());
			}}
			name="Embed"
			icon="artboard"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementGraph());
			}}
			name="Graph"
			icon="bar-chart-grouped"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementImage());
			}}
			name="Image"
			icon="image-2"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementInputTextArea());
			}}
			name="Input text area"
			icon="keyboard-box"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementInputTextSmall());
			}}
			name="Input text small"
			icon="keyboard"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementLetterInput());
			}}
			name="Letter input"
			icon="edit-box"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementText());
			}}
			name="Text"
			icon="file-text"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementVideoPlayer());
			}}
			name="Video"
			icon="video"
		/>
	</div>
</div>
