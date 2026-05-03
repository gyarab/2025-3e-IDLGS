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
		emoji="bold"
		label={m.bold()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="italic"
		label={m.italic()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="underline"
		label={m.underline()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="strikethrough"
		label={m.strikethrough()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
</div>
