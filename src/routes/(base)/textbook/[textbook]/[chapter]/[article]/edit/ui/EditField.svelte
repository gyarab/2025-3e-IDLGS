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

<div class="flex w-full flex-col gap-4 min-h-[30vh] max-h-[80svh] overflow-x-hidden overflow-y-visible">
	<TextArea
		{darkMode}
		{color}
		bind:value={articleText}
		placeholder={m.enterArticleText()}
		css="w-full h-full grow"
	/>
</div>
