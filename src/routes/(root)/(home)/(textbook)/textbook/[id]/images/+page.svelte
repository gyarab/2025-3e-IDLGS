<script lang="ts">
	import WideCard from '$component/WideCard.svelte';
	import type { TextbookType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';

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

<svelte:head>
	<title>
		{m.imageLibrary()} - {data.textbook.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<WideCard
	cssAddition="grow"
	r={data.textbook.red}
	g={data.textbook.green}
	b={data.textbook.blue}
>
	<div class="flex flex-row items-end gap-2">
		<h1>{data.textbook.name}</h1>
		<h2>{m.imageLibrary()}</h2>
	</div>

	<div></div>
</WideCard>
