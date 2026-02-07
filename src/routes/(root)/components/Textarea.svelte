<script lang="ts">
	import TextareaFormatting from './sub/TextareaFormatting.svelte';
	import { m } from '$lib/paraglide/messages';
	import { renderMarkdown } from '$lib/markdown';

	const id = $state(crypto.randomUUID());

	let {
		value = $bindable(''),
		placeholder,
		formatting = true,
		maxLength = undefined,
		name = '',
	}: {
		value?: string;
		placeholder: string;
		formatting?: boolean;
		maxLength?: number | undefined;
		name?: string;
	} = $props();

	let element: HTMLTextAreaElement | undefined = $state(undefined);
	let preview: boolean = $state(false);
	let content = $derived(preview ? renderMarkdown(value) : '');
	let cursorBeginning = $state(0);
	let cursorEnd = $state(0);
</script>

<div class="relative flex grow flex-col gap-0">
	{#if element && formatting}
		<TextareaFormatting
			bind:value
			bind:preview
			{cursorBeginning}
			{cursorEnd}
		/>
	{/if}

	{#if preview}
		<div class="input-text idlgsText relative z-11 w-full! grow! p-2">
			{@html content}
			<div class="absolute right-2 bottom-2 z-10 text-2xl opacity-30">
				<i class="ri-eye-line"></i>
				{m.preview()}
			</div>
		</div>
	{/if}

	<textarea
		{id}
		class="input-text w-full grow {preview ? 'hidden' : ''} resize-none"
		bind:value
		{placeholder}
		bind:this={element}
		onselectionchange={(e) => {
			//add amount of newlines since cursor does wierd shit
			const elem = e.target as HTMLTextAreaElement;
			cursorBeginning = elem.selectionStart;
			cursorEnd = elem.selectionEnd;
		}}
		maxlength={maxLength}
		{name}
	></textarea>

	{#if maxLength && !preview}
		<div
			class="
			absolute right-2 bottom-2 z-10 text-base opacity-80
			{value.length >= maxLength ? 'font-medium text-red-700' : ''}
		"
		>
			{value.length}/{maxLength}
		</div>
	{/if}
</div>
