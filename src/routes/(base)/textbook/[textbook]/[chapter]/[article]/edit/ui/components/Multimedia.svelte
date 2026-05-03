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

<div>
	<ToolbarButton
		emoji=""
		label=""
		onclick={() => {}}
		{darkMode}
		{color}
	/>
</div>
