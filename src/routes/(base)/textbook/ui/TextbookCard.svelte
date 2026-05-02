<script lang="ts">
	import { goto } from '$app/navigation';
	import { makeHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType } from '$lib/types';
	import { resolve } from '$app/paths';

	let {
		textbook,
	}: {
		textbook: TextbookType;
	} = $props();

	const textbookColor: string = $derived(
		makeHex(textbook.r, textbook.g, textbook.b),
	);
	const textbookString: string = $derived(
		`${m.openTextbook()} ${textbook.title}`,
	);
</script>

<button
	title={textbookString}
	aria-label={textbookString}
	class="flex w-full flex-col rounded-lg p-2 shadow-xl"
	style="background-color: {textbookColor}; border: 1px solid {textbookColor};"
	onclick={() => {
		goto(
			resolve('/(base)/textbook/[textbook]', { textbook: textbook.uuid }),
		);
	}}
>
	<div class="grow"></div>
	<div class="flex w-full flex-row">
		<div class="grow"></div>
		<h1 class="font-light">{textbook.title}</h1>
	</div>
</button>
