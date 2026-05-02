<script lang="ts">
	import type { ArticleType } from "$lib/types";
	import { fly } from "svelte/transition";

	let {
		article,
		darkMode,
	}: {
		article: ArticleType;
		darkMode: boolean;
	} = $props();
</script>

<div class="flex flex-row w-full gap-2">
	<div class="grow"></div>
</div>