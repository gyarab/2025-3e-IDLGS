<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';

	let {
		darkMode,
		color,
		articleText = $bindable(''),
	}: {
		darkMode: boolean;
		color: string;
		articleText: string;
	} = $props();
</script>

<div
	class="flex max-h-[80svh] min-h-[30svh] w-full flex-col gap-4 overflow-x-hidden overflow-y-visible"
>
	<TextArea
		{darkMode}
		{color}
		bind:value={articleText}
		placeholder={m.enterArticleText() + ' (raw Markdown)'}
		css="w-full h-full grow"
	/>
</div>
