<script lang="ts">
	import { m } from '$lib/paraglide/messages';
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
		el,
	}: {
		el: RInteractive;
	} = $props();
</script>

<div class="flex max-h-1/3 grow flex-col gap-2 rounded-lg bg-neutral-600 p-5">
	<h3>{m.addNewElement()}</h3>
	<div class="grid grid-cols-3 gap-2 overflow-scroll">
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementAIChat());
			}}
			name={m.aiChat()}
			icon="speak-ai"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementArrowPoint());
			}}
			name={m.arrowPoint()}
			icon="arrow-left-right"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementCard());
			}}
			name={m.card()}
			icon="checkbox-blank"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementCartesian());
			}}
			name={m.cartesianCoordinateSystem()}
			icon="layout-grid"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementCheckbox());
			}}
			name={m.checkbox()}
			icon="checkbox"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementCodeInput());
			}}
			name={m.codeInputArea()}
			icon="code-s-slash"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementEmbedFrame());
			}}
			name={m.webpage()}
			icon="artboard"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementGraph());
			}}
			name={m.graph()}
			icon="bar-chart-grouped"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementImage());
			}}
			name={m.image()}
			icon="image-2"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementInputTextArea());
			}}
			name={m.inputTextArea()}
			icon="keyboard-box"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementInputTextSmall());
			}}
			name={m.inputTextAreaShortAnswers()}
			icon="keyboard"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementLetterInput());
			}}
			name={m.singleLetterInput()}
			icon="edit-box"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementText());
			}}
			name={m.textboxInfo()}
			icon="file-text"
		/>
		<ResinItemSelect
			onclick={() => {
				el?.addElementDone(new RElementVideoPlayer());
			}}
			name={m.videoPlayer()}
			icon="video"
		/>
	</div>
</div>
