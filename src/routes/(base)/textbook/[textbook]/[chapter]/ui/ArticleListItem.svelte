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
<a
    href={resolve('/(base)/textbook/[textbook]/[chapter]/[article]', {
        article: article.uuid,
        chapter: page.params.chapter!,
        textbook: page.params.textbook!,
    })}
    class="flex w-full flex-row font-bold"
    title="{m.openArticle()} {article.title}"
    aria-label="{m.openArticle()} {article.title}"
>
    <h2>{article.title}</h2>
    <i
        class="ri-arrow-right-s-line transition-transform group-hover:translate-x-10"
    ></i>
</a>