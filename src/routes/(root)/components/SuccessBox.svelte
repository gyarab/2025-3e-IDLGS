<script lang="ts">
	import InfoBox from './InfoBox.svelte';

	let {
		message = $bindable(''),
	}: {
		message: string;
	} = $props();
</script>

{#key message}
	{#if message.length > 0}
		<InfoBox
			cssClass="bg-linear-to-tr from-green-900 to-green-600 text-white p-2"
		>
			{message}
		</InfoBox>
	{/if}
{/key}
