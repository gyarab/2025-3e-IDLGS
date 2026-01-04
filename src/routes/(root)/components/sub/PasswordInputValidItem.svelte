<script lang="ts">
	let {
		success,
		text,
	}: {
		success: boolean;
		text: string;
	} = $props();
</script>

<li class="flex w-full grow flex-row items-center">
	<span class="text-2xl">
		{#if success}
			<i class="ri-check-line"></i>
		{:else}
			<i class="ri-close-line"></i>
		{/if}
	</span>
	<span class={success ? 'font-light' : 'font-medium'}>
		{text}
	</span>
</li>
