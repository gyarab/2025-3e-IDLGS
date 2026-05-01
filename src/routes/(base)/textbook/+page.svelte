<script lang="ts">
	import TextbookCard from './ui/TextbookCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType, UserType } from '$lib/types';
	import Button from '../components/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let {
		data,
	}: {
		data: {
			color: string;
			darkMode: boolean;
			textbooks: TextbookType[];
			user: UserType | undefined;
		};
	} = $props();
</script>

<svelte:head>
	<title>{m.yourTextbooks()} | {m.idlgs()}</title>
</svelte:head>

<div
	class="flex min-h-[33svh] w-1/2 flex-col rounded-2xl p-4 shadow-xl {data.darkMode
		? 'bg-neutral-800'
		: 'bg-neutral-200'}"
>
	<div class="flex w-full flex-row items-center gap-2">
		<h1>{m.yourTextbooks()}</h1>
		<div class="grow"></div>
		<Button
			text={m.createTextbook()}
			emoji="health-book"
			type="button"
			css="buttonPrimary"
			style="background-color: {data.color};"
			onclick={() => {
				goto(resolve("/(base)/textbook/create"));
			}}
		/>
	</div>
	<div class="grid w-full grow grid-cols-3 gap-2">
		{#each data.textbooks as textbook}
			<TextbookCard
				{textbook}
				darkMode={data.darkMode}
				color={data.color}
			/>
		{/each}
	</div>
</div>
