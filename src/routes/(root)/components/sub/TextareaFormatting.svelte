<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TextareaFormattingButton from './TextareaFormattingButton.svelte';
	import type { Snippet } from 'svelte';

	let {
		value = $bindable(''),
		preview = $bindable(false),
		cursorBeginning,
		cursorEnd,
		children,
	}: {
		value: string;
		preview: boolean;
		cursorBeginning: number;
		cursorEnd: number;
		children?: Snippet;
	} = $props();
</script>

<div
	class="flex w-full flex-row flex-nowrap items-center gap-0.5 overflow-x-scroll overflow-y-hidden"
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
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '**' + part2 + '**' + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.italic()}
		emoji="italic"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '*' + part2 + '*' + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.underline()}
		emoji="underline"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '<u>' + part2 + '</u>' + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.subscript()}
		emoji="subscript-2"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '<sub>' + part2 + '</sub>' + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.superscript()}
		emoji="superscript-2"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '<sup>' + part2 + '</sup>' + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.strikethrough()}
		emoji="strikethrough"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '~~' + part2 + '~~' + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.alignLeft()}
		emoji="align-left"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value =
				part1 +
				'<div style="text-align: left; width: 100%;">' +
				part2 +
				'</div>' +
				part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.alignCenter()}
		emoji="align-center"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value =
				part1 +
				'<div style="text-align: center; width: 100%;">' +
				part2 +
				'</div>' +
				part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.alignRight()}
		emoji="align-right"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value =
				part1 +
				'<div style="text-align: right; width: 100%;">' +
				part2 +
				'</div>' +
				part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.header1()}
		emoji="h-1"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '# ' + part2 + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.header2()}
		emoji="h-2"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '## ' + part2 + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.header3()}
		emoji="h-3"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '### ' + part2 + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.quote()}
		emoji="double-quotes-l"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '> ' + part2 + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.codeBlock()}
		emoji="code-view"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '```\n' + part2 + '\n```' + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.orderedList()}
		emoji="list-ordered"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '1. ' + part2 + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.unorderedList()}
		emoji="list-unordered"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '- ' + part2 + part3;
		}}
	/>
	<TextareaFormattingButton
		message={m.link()}
		emoji="link"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '[' + part2 + '](url)' + part3;
		}}
	/>

	<TextareaFormattingButton
		message={m.horizontalSeparator()}
		emoji="separator"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '\n---\n' + part2 + part3;
		}}
	/>

	<!-- LaTeX: we process LaTeX first, HTML output is ignored by markdownit -->
	<TextareaFormattingButton
		message={m.mathEquationLatex()}
		emoji="function"
		onclick={() => {
			const part1 = value.slice(0, cursorBeginning);
			const part2 = value.slice(cursorBeginning, cursorEnd);
			const part3 = value.slice(cursorEnd);
			value = part1 + '$' + part2 + '$' + part3;
		}}
	/>

	<!-- additional buttons -->
	{@render children?.()}

	<div class="grow"></div>

	<div class="opacity-80">
		{m.formattedUsingMarkdown()}.
	</div>
</div>
