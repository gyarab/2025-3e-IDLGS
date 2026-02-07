<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType } from '$lib/types';
	import NextPrevious from '../components/NextPrevious.svelte';
	import TextbookCard from '../../components/TextbookCard.svelte';
	import { onMount, onDestroy, untrack } from 'svelte';
	import TextInput from '$component/TextInput.svelte';
	import LoadingAnimationHandler from '$component/LoadingAnimationHandler.svelte';

	let {
		step = $bindable(0),
		selectedTextbookUuid = $bindable(''),
	}: {
		step: number;
		selectedTextbookUuid: string;
	} = $props();

	let ticksCounter: number = $state(0);
	let ticksCounterInterval: NodeJS.Timeout | undefined = $state(undefined);

	let query: string = $state('');
	let hasFetched = $derived(query.length < 3);
	let lastKeystroke: number = $state(0);

	let textbooks: Promise<TextbookType[]> = $state(
		new Promise((resolve) => {
			resolve([]);
		}),
	);

	onMount(() => {
		ticksCounterInterval = setInterval(() => {
			ticksCounter++;

			if (
				ticksCounter != 1 &&
				(lastKeystroke + 2 > ticksCounter || hasFetched)
			)
				return;

			//reload data
			textbooks = fetch('/home/creationModal/internalapi/getTextbooks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: query,
				}),
			})
				.then(async (res) => {
					const rd = await res.json();
					const data = rd.textbooks as TextbookType[];
					return data;
				})
				.finally(() => []);

			hasFetched = true;
		}, 100);
	});
	onDestroy(() => {
		clearInterval(ticksCounterInterval);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<h2>{m.selectTextbook()}</h2>
	<div class="flex w-full flex-row items-center gap-2">
		<TextInput
			bind:value={query}
			placeholder={m.findTextbook()}
			onchange={() => {
				hasFetched = false;
				lastKeystroke = ticksCounter;
			}}
		/>
	</div>
	{#await textbooks}
		<LoadingAnimationHandler />
	{:then textbooksActual}
		{#if textbooksActual.length > 0}
			<div
				class="grid max-h-full w-full grow grid-cols-4 gap-4 overflow-scroll"
			>
				{#each textbooksActual as item, i}
					<TextbookCard
						perspective={false}
						delay={i * 100}
						textbook={item}
						onclick={() => {
							selectedTextbookUuid = item.uuid;
						}}
						selected={item.uuid == selectedTextbookUuid}
						selection={true}
					/>
				{/each}
			</div>
		{:else}
			<div class="flex w-full grow flex-col items-center justify-center">
				{#if query.length == 0}
					<p class="opacity-80">{m.noTextbooksAvailable()}</p>
				{:else}
					<p class="opacity-80">{m.noTextbooksFound()}</p>
				{/if}
			</div>
		{/if}
	{/await}
	<NextPrevious
		currentStep={1}
		maxStep={6}
		onclickLast={() => {
			step = 0;
		}}
		onclickNext={() => {
			step = 2;
		}}
		disableConditionNext={selectedTextbookUuid.length == 0}
	/>
</div>
