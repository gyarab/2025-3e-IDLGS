<script lang="ts">
	import type { TextbookType } from '$lib/types';
	import type { UserTypeLimited } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import WideCard from '$component/WideCard.svelte';
	import Author from './components/Author.svelte';
	import Summary from './components/Summary.svelte';
	import Button from '$component/Button.svelte';

	let {
		data,
	}: {
		data: {
			textbook: TextbookType;
			isEditor: boolean;
			isOwner: boolean;
		};
	} = $props();
</script>

<WideCard cssAddition="grow">
	<h1>{data.textbook.name}</h1>

	<Author
		authors={data.textbook.authors as UserTypeLimited[]}
		createdAt={data.textbook.createdAt}
		modifedAt={data.textbook.modifiedAt}
	/>

	<Summary
		text={data.textbook.summary}
		red={data.textbook.red}
		green={data.textbook.green}
		blue={data.textbook.blue}
	/>

	<div class="flex w-full grow flex-col gap-2">
		{@html data.textbook.description}
	</div>

	<div
		class="grid {data.isEditor || data.isOwner
			? 'grid-cols-3'
			: 'grid-cols-2'} gap-2"
	>
		<Button
			btn="button-primary"
			emoji="book-open"
			onclick={() => {
				window.location.href = `/textbook/${data.textbook.uuid}/${data.textbook.chapters![0]?.uuid}`;
			}}
			disabled={data.textbook.chapters!.length === 0}
		>
			{m.startReading()}
		</Button>
		<Button
			btn="button-primary"
			emoji="file-list"
			onclick={() => {
				window.location.href = `/textbook/${data.textbook.uuid}/definitions`;
			}}
		>
			{m.openWordDefinitions()}
		</Button>
		{#if data.isEditor || data.isOwner}
			<Button
				btn="button-primary"
				emoji="pencil"
				onclick={() => {
					window.location.href = `/textbook/${data.textbook.uuid}/edit`;
				}}
			>
				{m.editTextbook()}
			</Button>
		{/if}
	</div>
</WideCard>
