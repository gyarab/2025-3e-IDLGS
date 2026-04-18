<script lang="ts">
	let {
		done,
		current,
		text,
		color,
	}: {
		done: boolean,
		current: boolean,
		text: string,
		color: string,
	} = $props();
</script>

<div class="flex flex-row w-full items-center gap-1 relative z-50!">
	{#if current}
		<i class="text-3xl ri-login-circle-fill" style="color: {color} !important;"></i>
	{:else if done}
		<i class="text-3xl ri-checkbox-circle-fill text-green-600!"></i>
	{:else}
		<i class="text-3xl ri-checkbox-blank-circle-line"></i>
	{/if}
	<p class="text-lg">
		{text}
	</p>
</div>