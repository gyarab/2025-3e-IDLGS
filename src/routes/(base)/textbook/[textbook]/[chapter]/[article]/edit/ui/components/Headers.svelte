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
		emoji="h-1"
		label={m.heading1()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="h-2"
		label={m.heading2()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="h-3"
		label={m.heading3()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
</div>
