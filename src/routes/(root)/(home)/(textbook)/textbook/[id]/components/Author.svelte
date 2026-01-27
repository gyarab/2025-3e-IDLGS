<script lang="ts">
	import { writeDegree } from '$lib';
	import type { UserTypeLimited } from '$lib/types';
	import HorizontalLine from '$component/HorizontalLine.svelte';

	let {
		authors,
		createdAt,
		modifedAt,
	}: {
		authors: UserTypeLimited[];
		createdAt: Date;
		modifedAt: Date;
	} = $props();
</script>

<div class="flex w-full flex-col items-center gap-2">
	<HorizontalLine color="#ffffff" />
	<div class="flex w-full flex-row flex-wrap gap-2">
		{#each authors as author (author.uuid)}
			<div class="flex flex-row gap-1">
				{#if author.degree != 'none'}
					<span class="font-medium">{writeDegree(author.degree)}</span
					>
				{/if}
				<span>{author.name}</span>
				<span class="font-medium">{author.surname}</span>
			</div>
		{/each}
		<div class="grow"></div>
		<div>
			<span class="font-medium">
				{modifedAt.getDate()}.{modifedAt.getMonth() +
					1}.{modifedAt.getFullYear()}
			</span>
			{#if createdAt.getTime() != modifedAt.getTime()}
				<span>
					({createdAt.getDate()}.{createdAt.getMonth() +
						1}.{createdAt.getFullYear()})
				</span>
			{/if}
		</div>
	</div>
	<HorizontalLine color="#ffffff" />
</div>
