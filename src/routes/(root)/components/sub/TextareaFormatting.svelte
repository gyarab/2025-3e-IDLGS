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
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.superscript()}
		emoji="superscript-2"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.strikethrough()}
		emoji="strikethrough"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.alignLeft()}
		emoji="align-left"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.alignCenter()}
		emoji="align-center"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.alignRight()}
		emoji="align-right"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.header1()}
		emoji="h-1"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.header2()}
		emoji="h-2"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.header3()}
		emoji="h-3"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.quote()}
		emoji="double-quotes-l"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.codeBlock()}
		emoji="code-view"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.orderedList()}
		emoji="list-ordered"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.unorderedList()}
		emoji="list-unordered"
		onclick={() => {}}
	/>
	<TextareaFormattingButton
		message={m.link()}
		emoji="link"
		onclick={() => {}}
	/>

	<div class="grow"></div>

	<div class="opacity-50">
		{m.formattedUsingMarkdown()}.
	</div>
</div>
