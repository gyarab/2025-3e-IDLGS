<script lang="ts">
	//use this
	import UserLink from '$src/routes/(base)/components/UserLink.svelte';
	import { m } from '$lib/paraglide/messages';
	import type {
		TextbookType,
		ChapterTypeRaw,
		UserTypeInfo,
	} from '$lib/types';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			textbook: TextbookType;
			chapters: ChapterTypeRaw[];
			authors: UserTypeInfo[];
			user: UserTypeInfo | undefined;
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.textbookAuthorsList()} | {data.textbook.title} | {m.idlgs()}
	</title>
</svelte:head>

<div
	class="flex min-h-[33svh] w-1/2 flex-col gap-4 rounded-2xl p-4 shadow-xl {data.darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-200 text-gray-800'}"
>
	<h1>{m.textbookAuthorsList()}</h1>

	{#each data.authors as author}
		<UserLink user={author} />
	{/each}
</div>
