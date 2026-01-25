<script lang="ts">
	import type { ChapterType } from '$lib/types';
	import Button from '$src/routes/(root)/components/Button.svelte';

	let {
		chapter,
		textbookUuid,
	}: {
		chapter: ChapterType;
		textbookUuid: string;
	} = $props();

	let isOpen = $state(false);
</script>

<div class="flex w-full flex-col gap-1">
	<div class="flex w-full flex-row items-center justify-start gap-1">
		<a href="/textbook/{textbookUuid}/{chapter.uuid}">
			{chapter.name}
		</a>
		<Button
			emoji={isOpen ? 'arrow-up-s' : 'arrow-down-s'}
			btn="button-none"
			onclick={() => {
				isOpen = !isOpen;
			}}
		/>
	</div>

	{#if isOpen}
		{#each chapter.articlesLimited as article (article.uuid)}
			<a
				class="ml-4 flex w-full flex-col gap-0"
				href="/textbook/{textbookUuid}/{chapter.uuid}/{article.uuid}"
			>
				{article.name}
			</a>
		{/each}
	{/if}
</div>
