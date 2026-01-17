<script lang="ts">
	import type { TextbookType } from "$lib/types";
	import WideCard from "$src/routes/(root)/components/WideCard.svelte";

	let {
		textbook
	}: {
		textbook: TextbookType
	} = $props();
</script>

<WideCard
	cssAddition="grow"
>
	<h2>
		{textbook.name}
	</h2>
</WideCard>