<script lang="ts">
	import { goto } from '$app/navigation';
	import { makeHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType, ChapterType } from '$lib/types';
	import { resolve } from '$app/paths';

	let {
		chapter,
		textbook,
		textbookColor,
	}: {
		chapter: ChapterType;
		textbook: TextbookType;
		textbookColor: string;
	} = $props();

	const chapterString: string = $derived(
		`${m.openChapter()} ${chapter.title}`,
	);
</script>

<button
	title={chapterString}
	aria-label={chapterString}
	class="flex min-h-[15vh] w-full flex-col rounded-lg p-2 shadow-xl"
	style="background-color: {textbookColor}; border: 1px solid {textbookColor};"
	onclick={() => {
		goto(
			resolve('/(base)/textbook/[textbook]/[chapter]', {
				textbook: textbook.uuid,
				chapter: chapter.uuid,
			}),
		);
	}}
>
	<div class="grow"></div>
	<div class="flex w-full flex-row">
		<div class="grow"></div>
		<h1 class="font-light">{chapter.title}</h1>
	</div>
</button>
