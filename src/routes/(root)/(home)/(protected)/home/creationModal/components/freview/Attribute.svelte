<script lang="ts">
	let { type, course, textbook, value, valueLong = false } = $props();
</script>

<div
	class="flex items-center gap-2 text-xl {valueLong
		? 'flex-col'
		: 'flex-row'}"
>
	<div>
		{#if type == 'course'}
			{course}:
		{:else}
			{textbook}:
		{/if}
	</div>
	<div
		class={valueLong
			? 'w-full grow text-lg italic opacity-70'
			: 'font-medium'}
	>
		{value}
	</div>
</div>
