<script lang="ts">
	import TextareaFormatting from "./about/sub/TextareaFormatting.svelte";
	import markdownit from 'markdown-it';

	let {
		value = $bindable(""),
		placeholder,
		formatting = true,
	}: {
		value: string;
		placeholder: string;
		formatting?: boolean;
	} = $props();

	const md = markdownit();

	let element: HTMLTextAreaElement | undefined = $state(undefined);
	let preview: boolean = $state(false);
	let content = $derived(preview ? md.render(value) : "");
</script>

<div class="flex flex-col grow gap-0 relative">
		{#if element && formatting}
			<TextareaFormatting 
				bind:value
				bind:preview
				bind:element
			/>
		{/if}

		{#if preview}
			<div class="grow! w-full! input-text idlgsText p-2">
				{@html content}
			</div>
		{/if}

		<textarea
			class="input-text grow w-full {preview ? "hidden" : ""}"
			bind:value={value}
			placeholder={placeholder}
			bind:this={element}
		></textarea>
</div>