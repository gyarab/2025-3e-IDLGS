<script lang="ts">
	import WideCard from '$component/WideCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import TextInput from '$component/TextInput.svelte';
	import LoadingAnimationHandler from '$component/LoadingAnimationHandler.svelte';
	import { searchInText, searchPreprocess } from '$lib/text/index.js';
	import Button from '$component/Button.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data } = $props();

	let query = $state('');

	const processedData = $derived(
		data.text.map((v) => searchPreprocess(v.text)),
	);

	$inspect(processedData); //TODO remove

	let results = $derived.by(() => {
		const trimmedQuery = query.trim();
		if (trimmedQuery.length <= 3) return [];

		let temp = [];
		for (let i = 0; i < processedData.length; i++) {
			temp.push(
				...searchInText(trimmedQuery, processedData[i]).map((v) => {
					return {
						...v,
						id: i,
						chapter: data.text[i].chapter,
						article: data.text[i].article,
						uuid: data.text[i].uuid,
						chapterUuid: data.text[i].chapterUuid,
					};
				}),
			);
		}
		return temp;
	});
</script>

<svelte:head>
	<title>
		{m.search()} - {data.textbook.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<!-- TODO categorize search, -->

<WideCard
	cssAddition="grow"
	r={data.textbook.red / 5 + 80}
	g={data.textbook.green / 5 + 80}
	b={data.textbook.blue / 5 + 80}
>
	<div class="flex flex-row items-end gap-2">
		<h1>{data.textbook.name}</h1>
		<h2>{m.search()}</h2>
	</div>

	<TextInput
		placeholder={m.enterSearchQuery()}
		bind:value={query}
		maxLength={30}
	/>

	{#if false}
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
			{#each results as result, i (result.start / result.end)}
				<WideCard
					delay={i * 100}
					cssOverride="flex-row! gap-1! p-2! text-ellipsis! overflow-hidden! text-nowrap"
				>
					<Button
						btn="button-none"
						type="button"
						cssClass="flex flex-row gap-0 text-ellipsis overflow-hidden text-nowrap"
						emoji=""
						onclick={() => {
							let address = `/textbook/${page.params.id}`;

							if (result.chapter) {
								address += `/${result.chapterUuid}`;
							} else if (result.article) {
								address += `/${result.chapterUuid}`;
								address += `/${result.uuid}`;
							}

							address += `/?searchStart=${result.start}&searchEnd=${result.end}`;

							goto(address);
						}}
					>
						<span class="font-medium">
							{data.text[result.id!].text.substring(
								result.start,
								result.end,
							)}
						</span>
						<span
							class="overflow-hidden! text-ellipsis! italic opacity-80"
						>
							{data.text[result.id!].text.substring(result.end)}
						</span>
					</Button>
				</WideCard>
			{:else}
				<div
					class="flex flex-row w-full items-center justify-center grow"
				>
					<!-- TODO -->
				</div>
			{/each}
		</div>
	{/if}
</WideCard>
