<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TextareaFormattingButton from './TextareaFormattingButton.svelte';

	let {
		value = $bindable(''),
		preview = $bindable(false),
		element = $bindable(),
	}: {
		value: string;
		preview: boolean;
		element: HTMLTextAreaElement;
	} = $props();

	let cursorBeginning = $derived(element.selectionStart);
	let cursorEnd = $derived(element.selectionEnd);
</script>

<div
	class="flex w-full flex-row flex-nowrap items-center gap-0 overflow-x-scroll overflow-y-hidden"
>
	<button
		type="button"
		onclick={() => {
			preview = !preview;
		}}
	>
		{#if !preview}
			<i class="ri-eye-line"></i>
			{m.preview()}
		{:else}
			<i class="ri-eye-off-line"></i>
			{m.edit()}
		{/if}
	</button>

	<TextareaFormattingButton
		message={m.bold()}
		emoji="bold"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'**' +
				value.slice(cursorBeginning, cursorEnd) +
				'**' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.italic()}
		emoji="italic"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'*' +
				value.slice(cursorBeginning, cursorEnd) +
				'*' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.underline()}
		emoji="underline"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'<u>' +
				value.slice(cursorBeginning, cursorEnd) +
				'</u>' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.subscript()}
		emoji="subscript-2"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'<sub>' +
				value.slice(cursorBeginning, cursorEnd) +
				'</sub>' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.superscript()}
		emoji="superscript-2"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'<sup>' +
				value.slice(cursorBeginning, cursorEnd) +
				'</sup>' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.strikethrough()}
		emoji="strikethrough"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'~~' +
				value.slice(cursorBeginning, cursorEnd) +
				'~~' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.alignLeft()}
		emoji="align-left"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'<div style="text-align: left; width: 100%;">' +
				value.slice(cursorBeginning, cursorEnd) +
				'</div>' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.alignCenter()}
		emoji="align-center"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'<div style="text-align: center; width: 100%;">' +
				value.slice(cursorBeginning, cursorEnd) +
				'</div>' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.alignRight()}
		emoji="align-right"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'<div style="text-align: right; width: 100%;">' +
				value.slice(cursorBeginning, cursorEnd) +
				'</div>' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.header1()}
		emoji="h-1"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'# ' +
				value.slice(cursorBeginning, cursorEnd) +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.header2()}
		emoji="h-2"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'## ' +
				value.slice(cursorBeginning, cursorEnd) +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.header3()}
		emoji="h-3"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'### ' +
				value.slice(cursorBeginning, cursorEnd) +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.quote()}
		emoji="double-quotes-l"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'> ' +
				value.slice(cursorBeginning, cursorEnd) +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.codeBlock()}
		emoji="code-view"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'```\n' +
				value.slice(cursorBeginning, cursorEnd) +
				'\n```' +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.orderedList()}
		emoji="list-ordered"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'1. ' +
				value.slice(cursorBeginning, cursorEnd) +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.unorderedList()}
		emoji="list-unordered"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'- ' +
				value.slice(cursorBeginning, cursorEnd) +
				value.slice(cursorEnd);
		}}
	/>
	<TextareaFormattingButton
		message={m.link()}
		emoji="link"
		onclick={() => {
			value =
				value.slice(0, cursorBeginning) +
				'[' +
				value.slice(cursorBeginning, cursorEnd) +
				'](url)' +
				value.slice(cursorEnd);
		}}
	/>

	<div class="grow"></div>

	<div class="opacity-50">
		{m.formattedUsingMarkdown()}.
	</div>
</div>
