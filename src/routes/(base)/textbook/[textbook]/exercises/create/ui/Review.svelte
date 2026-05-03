<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { fly } from 'svelte/transition';

	let {}: {} = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.review()}</h2>
	</div>

	<div class="flex w-full grow flex-col"></div>
</div>
