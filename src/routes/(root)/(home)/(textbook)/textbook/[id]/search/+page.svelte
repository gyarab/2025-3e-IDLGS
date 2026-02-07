<script lang="ts">
	import WideCard from '$component/WideCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import TextInput from '$component/TextInput.svelte';
	import LoadingAnimationHandler from '$component/LoadingAnimationHandler.svelte';
	import { wordSimilarity } from '$lib/text';

	let { data } = $props();

	let query = $state('');
	let searching = $state(false);

	console.log(
		'word similarity:',
		wordSimilarity('oxid uhlicity', 'oxidu uhelnateho'),
	);
</script>

<svelte:head>
	<title>
		{m.search()} - {data.textbook.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<!-- TODO categorize search, -->

<WideCard
	cssAddition="grow"
	r={data.textbook.red}
	g={data.textbook.green}
	b={data.textbook.blue}
>
	<div class="flex flex-row items-end gap-2">
		<h1>{data.textbook.name}</h1>
		<h2>{m.search()}</h2>
	</div>

	<TextInput
		placeholder={m.enterSearchQuery()}
		bind:value={query}
	/>

	{#if searching}
		<LoadingAnimationHandler />
	{:else if query.trim().length === 0}
		<div
			class="flex w-full grow flex-col items-center justify-center gap-0 text-center opacity-80"
		>
			{m.searchResultsWillShowUpHere()}.
			<br />
			{m.startTypingToSearch()}.
		</div>
	{:else}
		<div class="flex w-full flex-col gap-2">
			<!-- TODO show results -->
		</div>
	{/if}
</WideCard>
