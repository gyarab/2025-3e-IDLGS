<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import TextArea from "$src/routes/(base)/components/TextArea.svelte"

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

<div class="flex flex-col gap-4 w-full">
	<TextArea 
		darkMode={darkMode}
		color={color}
		bind:value={articleText}
		placeholder={m.enterArticleText()}
	/>
</div>
