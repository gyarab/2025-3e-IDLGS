<script lang="ts">
	import type { TextbookType } from "$lib/types";

	
	let {
		textbook,
		darkMode,
		color,
	}: {
		textbook: TextbookType;
		darkMode: boolean;
		color: string;
	} = $props();

</script>

<div>
	{JSON.stringify(textbook)}
</div>