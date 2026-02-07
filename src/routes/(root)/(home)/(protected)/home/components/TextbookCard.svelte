<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType } from '$lib/types';
	import Card from '$component/Card.svelte';
	import Button from '$component/Button.svelte';

	let {
		textbook,
		delay = 0,
		perspective,
		onclick = () => {},
		disable = false,
		selected = false,
		selection = false,
	}: {
		textbook: TextbookType;
		delay: number;
		perspective: boolean;
		onclick?: () => void;
		disable?: boolean;
		selected?: boolean;
		selection?: boolean;
	} = $props();
</script>

<Card
	{disable}
	r={textbook.red}
	g={textbook.green}
	b={textbook.blue}
	{delay}
	{perspective}
	{onclick}
	css={selected ? 'border-neutral-500! brightness-110' : ''}
	forceSquare={true}
>
	<div
		class="relative flex w-full grow flex-col gap-0 overflow-hidden p-2 text-left"
	>
		<h2 class="flex w-full flex-row items-center gap-1 text-left">
			<div class="flex flex-row items-center gap-1 text-xl">
				<i class="ri-book-ai-line text-3xl"></i>
				{textbook.name}
			</div>
			<div class="text-lg font-light opacity-80">
				{textbook.subject}
			</div>
		</h2>
		<div class="flex flex-col gap-1">
			{#each textbook.authors as author (author.uuid)}
				<div class="flex w-full flex-row items-center gap-1">
					<i class="ri-user-3-line text-lg"></i>

					<span class="text-left opacity-80">
						{author.name}
						{author.surname}
					</span>
				</div>
			{/each}
		</div>
		<p
			class="w-full overflow-scroll! text-justify text-sm font-light text-ellipsis opacity-80"
		>
			{@html textbook.description.split('\n')[0]}
		</p>
	</div>

	{#if !selection}
		<Button
			emoji="arrow-right"
			btn="button-primary w-full"
		>
			{m.open()}
		</Button>
	{/if}
</Card>
