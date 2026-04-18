<script lang="ts">
	let {
		done,
		current,
		text,
		color,
	}: {
		done: boolean;
		current: boolean;
		text: string;
		color: string;
	} = $props();
</script>

<div class="relative z-50! flex w-full flex-row items-center gap-1">
	{#if current}
		<i
			class="ri-login-circle-fill text-3xl"
			style="color: {color} !important;"
		></i>
	{:else if done}
		<i class="ri-checkbox-circle-fill text-3xl text-green-600!"></i>
	{:else}
		<i class="ri-checkbox-blank-circle-line text-3xl"></i>
	{/if}
	<p class="text-lg">
		{text}
	</p>
</div>
