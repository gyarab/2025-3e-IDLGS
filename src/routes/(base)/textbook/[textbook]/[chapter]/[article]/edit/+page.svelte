<script lang="ts">
	import type {
		ChapterType,
		TextbookType,
		ArticleType,
		UserType,
	} from '$lib/types';
	import Toolbar from './ui/Toolbar.svelte';

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
</script>

<div class="flex w-full grow flex-col items-center">
	<div class="flex w-1/2 flex-col gap-4 p-4">
		<Toolbar
			darkMode={data.darkMode}
			color={data.color}
		/>
	</div>
</div>
