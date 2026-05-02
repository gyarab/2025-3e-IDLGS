<script lang="ts">
	import type { ArticleType } from '$lib/types';
	import { fly } from 'svelte/transition';

	let {
		article,
		darkMode,
	}: {
		article: ArticleType;
		darkMode: boolean;
	} = $props();
</script>

<div class="flex w-full flex-row gap-2">
	<div class="grow"></div>
</div>
