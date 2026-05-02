<script lang="ts">
	import type { ArticleType, TextbookType } from "$lib/types";
	import { m } from "$lib/paraglide/messages";

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			textbook: TextbookType;
			articles: ArticleType[];
		};
	} = $props();
</script>

<div class="flex min-h-[33svh] w-1/2 flex-col rounded-2xl p-4 shadow-xl gap-4">
	{#each data.articles as article}
		<div>{JSON.stringify(article)}</div>
	{/each}
</div>	