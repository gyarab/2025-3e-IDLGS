<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType } from '$lib/types';
	import Card from '$component/Card.svelte';

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
	css="{selected ? 'border-neutral-500! brightness-110' : ''} w-[35svh] h-[35svh]"
>
	<div class="relative flex w-full grow flex-col">
		<h2 class="w-full text-left text-xl flex flex-row items-center gap-2">
			<i class="ri-book-ai-line text-3xl"></i>
			{textbook.name}
		</h2>
		<p class="w-full text-left text-sm opacity-70">
			{textbook.description}
		</p>
	</div>
</Card>
