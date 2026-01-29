<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import type { TextbookType } from '$lib/types';
	import type { ArticleType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			article: ArticleType;
			textbook: TextbookType;
			isEditor: boolean;
			isOwner: boolean;
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.article()} {data.article.name} - {data.textbook.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<WideCard
	cssAddition="grow"
	r={data.textbook.red}
	g={data.textbook.green}
	b={data.textbook.blue}
>
	<h2>{data.article.name}</h2>
</WideCard>
