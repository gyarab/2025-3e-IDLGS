<script lang="ts">
	import WideCard from '$src/routes/(root)/components/WideCard.svelte';
	import type { TextbookType, ArticleType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			textbook: TextbookType;
			article: ArticleType;
		};
	} = $props();
</script>

<WideCard
	cssAddition="grow"
	r={data.textbook.red / 5 + 80}
	g={data.textbook.green / 5 + 80}
	b={data.textbook.blue / 5 + 80}
>
	<div></div>
</WideCard>
