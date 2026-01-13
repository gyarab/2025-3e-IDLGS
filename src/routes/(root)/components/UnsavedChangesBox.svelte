<script lang="ts">
	import InfoBox from './InfoBox.svelte';
	import { m } from '$lib/paraglide/messages';

	let {
		show,
	}: {
		show: boolean;
	} = $props();
</script>

{#if show}
	<InfoBox
		cssClass="bg-linear-to-tr from-amber-900 to-yellow-600 text-white p-2"
	>
		<div class="flex flex-row gap-1">
			<i class="ri-alarm-warning-line"></i>
			{m.youHaveUnsavedChanges()}
		</div>
	</InfoBox>
{/if}
