<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type {
		ChapterType,
		TextbookType,
		ArticleType,
		UserType,
	} from '$lib/types';
	import EditField from './ui/EditField.svelte';
	import Toolbar from './ui/Toolbar.svelte';
	import WYSIWYG from './ui/WYSIWYG.svelte';

	let {
		data,
	}: {
		data: {
			textbook: TextbookType;
			chapter: ChapterType;
			article: ArticleType;
			user: UserType;
			darkMode: boolean;
			color: string;
		};
	} = $props();

	let advancedMode = $state(false);
</script>

<svelte:head>
	<title>
		{m.edit()} {data.article.title} 
	</title>
</svelte:head>

<div class="flex w-full grow flex-col items-center">
	<div class="flex w-1/2 flex-col gap-4 p-4">
		<Toolbar
			darkMode={data.darkMode}
			color={data.color}
			bind:advancedMode
		/>

		{#if advancedMode}
			<EditField
				darkMode={data.darkMode}
				color={data.color}
			/>
		{:else}
			<WYSIWYG />
		{/if}
	</div>
</div>
