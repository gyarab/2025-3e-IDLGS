<script lang="ts">
	import type { ArticleType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let {
		article,
	}: {
		article: ArticleType;
	} = $props();
</script>

<button 
	class="flex flex-row w-full"
	title="{m.openArticle()} {article.title}}"
	aria-label="{m.openArticle()} {article.title}}"
	onclick={() => {
		goto(resolve("/(base)/textbook/[textbook]/[chapter]/[article]", {
			article: article.uuid,
			chapter: page.params.chapter!,
			textbook: page.params.textbook!
		}));
	}}
>
	<h2>{article.title}</h2>
</button>