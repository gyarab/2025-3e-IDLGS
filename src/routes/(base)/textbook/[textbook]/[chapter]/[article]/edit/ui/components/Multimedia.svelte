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
		emoji="box-3-line"
		label={m.model3d()}
		onclick={() => {

		}}
		{darkMode}
		{color}
	/>
</div>
