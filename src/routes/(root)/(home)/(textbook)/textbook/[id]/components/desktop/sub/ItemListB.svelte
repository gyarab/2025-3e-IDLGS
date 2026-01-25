<script lang="ts">
	//Different and separate from ItemList in creation modal

	import { m } from '$lib/paraglide/messages';
	import type { ArticleType, ChapterType } from '$lib/types';

	let {
		name,
		placeholder,
		items,
		selected = $bindable(),
	}: {
		name: string;
		placeholder: string;
		items: ArticleType[] | ChapterType[];
		selected: string; //uuid
	} = $props();
</script>

<!-- TODO -->

<div class="flex min-w-0 grow flex-col gap-2">
	<h3>{name}</h3>
	<div
		class="flex w-full grow flex-col gap-2 overflow-scroll rounded-lg bg-neutral-700/40 p-2"
	>
		<div class="flex w-full grow flex-col gap-2 overflow-scroll">
			{#each items as item (item.uuid)}
				<div class="flex w-full flex-row items-center gap-2">
					{item.name}
				</div>
			{:else}
				<div
					class="flex flex-col grow justify-center items-center gap-2 opacity-70 w-full"
				>
					<p>{placeholder}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
