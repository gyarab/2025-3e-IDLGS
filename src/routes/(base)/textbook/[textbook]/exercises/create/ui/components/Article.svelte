<script lang="ts">
	import type { ArticleTypeRawUuid } from '$lib/types';
	import HoverEmoji from '$src/routes/(base)/components/HoverEmoji.svelte';

	let {
		darkMode,
		article,
		onclick,
	}: {
		darkMode: boolean;
		article: ArticleTypeRawUuid;
		onclick: () => void;
	} = $props();
</script>

<button
	class="group flex w-full flex-row rounded-lg p-2 {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-black'}"
	{onclick}
>
	<h2 class="text-xl font-bold">{article.title}</h2>
	<div class="grow"></div>
	<HoverEmoji
		emoji="plus"
	/>
</button>
