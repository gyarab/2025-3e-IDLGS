<script lang="ts">
	import ToolbarButton from './ToolbarButton.svelte';
	import { m } from '$lib/paraglide/messages';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();
</script>

<div class="flex flex-row items-center gap-1">
	<ToolbarButton
		emoji=""
		label=""
		onclick={() => {}}
		{darkMode}
		{color}
	/>
</div>
