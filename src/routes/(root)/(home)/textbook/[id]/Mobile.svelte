<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});

	let { data } = $props();
</script>

<div class="relative flex w-full grow flex-col items-center xl:hidden"></div>
