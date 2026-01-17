<script lang="ts">
	import TextareaFormatting from './sub/TextareaFormatting.svelte';
	import markdownit from 'markdown-it';
	import { m } from '$lib/paraglide/messages';
	import { MARKDOWN_CONFIG_OPTIONS } from '$lib';

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

	const md = markdownit(MARKDOWN_CONFIG_OPTIONS);

	let element: HTMLTextAreaElement | undefined = $state(undefined);
	let preview: boolean = $state(false);
	let content = $derived(preview ? md.render(value) : '');
</script>

<div class="relative flex grow flex-col gap-0">
	{#if element && formatting}
		<TextareaFormatting
			bind:value
			bind:preview
			bind:element
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
		class="input-text w-full grow {preview ? 'hidden' : ''} resize-none"
		bind:value
		{placeholder}
		bind:this={element}
		maxlength={maxLength}
		name={name}
	></textarea>

	{#if maxLength && !preview}
		<div class="
			absolute right-2 bottom-2 z-10 text-base opacity-50
			{value.length >= maxLength ? 'text-red-700 font-medium' : ''}
		">
			{value.length}/{maxLength}
		</div>
	{/if}
</div>
