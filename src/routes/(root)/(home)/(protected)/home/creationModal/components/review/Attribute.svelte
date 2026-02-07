<script lang="ts">
	let {
		type,
		course,
		textbook,
		value,
		valueLong = false,
		html = false,
	}: {
		type: string;
		course: string;
		textbook: string;
		value: string;
		valueLong?: boolean;
		html?: boolean;
	} = $props();
</script>

<div
	class="flex gap-2 text-xl {valueLong
		? 'grow flex-col'
		: 'flex-row items-center'}"
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
			? 'w-full grow text-lg italic opacity-80'
			: 'font-medium'}
	>
		{#if html}
			{@html value}
		{:else}
			{value}
		{/if}
	</div>
</div>
