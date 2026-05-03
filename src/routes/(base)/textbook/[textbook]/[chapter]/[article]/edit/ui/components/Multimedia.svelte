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
		emoji="file-image-line"
		label={m.image()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="link-line"
		label={m.embed()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="file-video-line"
		label={m.video()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="box-3-line"
		label={m.model3d()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="file-line"
		label={m.document()}
		onclick={() => {}}
		{darkMode}
		{color}
	/>
</div>
