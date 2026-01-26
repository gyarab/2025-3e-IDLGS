<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$src/routes/(root)/components/WideCard.svelte';
	import type { TextbookType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			textbook: TextbookType;
			isEditor: boolean;
			isOwner: boolean;
		};
	} = $props();
</script>

<WideCard 
	cssAddition="grow"
	r={data.textbook.red}
	g={data.textbook.green}
	b={data.textbook.blue}
>
	<h2>{m.articleName()}</h2>
</WideCard>
