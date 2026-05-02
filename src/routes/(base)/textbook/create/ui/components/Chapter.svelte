<script lang="ts">
	import type { ChapterType } from '$lib/types';
	import { fly } from 'svelte/transition';

	let {
		chapter,
		darkMode,
	}: {
		chapter: ChapterType;
		darkMode: boolean;
	} = $props();
</script>

<div class="flex w-full flex-row gap-2">
	<div class="grow"></div>
</div>
