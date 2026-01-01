<script lang="ts">
	import TextareaFormatting from './sub/TextareaFormatting.svelte';
	import markdownit from 'markdown-it';
	import hljs from 'highlight.js';
	import { m } from '$lib/paraglide/messages';

	let {
		value = $bindable(''),
		placeholder,
		formatting = true,
	}: {
		value: string;
		placeholder: string;
		formatting?: boolean;
	} = $props();

	const md = markdownit({
		html: true,
		linkify: true,
		typographer: true,
		xhtmlOut: true,
		langPrefix: 'language-',
		highlight: (str: string, lang: string) => {
			return hljs.highlightAuto(str, [lang]).value;
		},
	});

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
		class="input-text w-full grow {preview ? 'hidden' : ''}"
		bind:value
		{placeholder}
		bind:this={element}
	></textarea>
</div>
