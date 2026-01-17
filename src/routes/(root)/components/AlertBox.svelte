<script lang="ts">
	import InfoBox from './InfoBox.svelte';

	let { message = $bindable('') } = $props();
</script>

{#key message}
	{#if message.length > 0}
		<InfoBox
			cssClass="bg-linear-to-tr from-red-900 to-amber-600 text-white"
		>
			<div class="p-2 pb-0 font-medium">
				<i class="ri-pass-expired-line"></i>
				{message}
			</div>
		</InfoBox>
	{/if}
{/key}
