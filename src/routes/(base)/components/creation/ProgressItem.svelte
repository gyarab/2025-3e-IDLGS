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

	const textSize = "text-2xl md:text-3xl";
</script>

<div class="relative z-50! flex w-full flex-row items-center gap-1">
	{#if current}
		<i
			class="ri-login-circle-fill {textSize}"
			style="color: {color} !important;"
		></i>
	{:else if done}
		<i class="ri-checkbox-circle-fill {textSize} text-green-600!"></i>
	{:else}
		<i class="ri-checkbox-blank-circle-line {textSize}"></i>
	{/if}
	<p class="sm:text-lg">
		{text}
	</p>
</div>
