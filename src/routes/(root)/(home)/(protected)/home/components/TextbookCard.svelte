<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType } from '$lib/types';
	import Card from '$component/Card.svelte';
	import Button from '$src/routes/(root)/components/Button.svelte';

	let {
		textbook,
		delay = 0,
		perspective,
		onclick = () => {},
		disable = false,
		selected = false,
	}: {
		textbook: TextbookType;
		delay: number;
		perspective: boolean;
		onclick?: () => void;
		disable?: boolean;
		selected?: boolean;
	} = $props();
</script>

<!-- TODO finish -->

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
	<div class="relative flex w-full grow flex-col p-2">
		<h2 class="flex w-full flex-row items-center gap-2 text-left text-xl">
			<i class="ri-book-ai-line text-3xl"></i>
			{textbook.name}
		</h2>
		<p class="w-full text-left text-sm opacity-70">
			{@html textbook.description}
		</p>
	</div>

	<Button
		emoji="arrow-right"
		btn="button-primary w-full"
	>
		{m.open()}
	</Button>
</Card>
