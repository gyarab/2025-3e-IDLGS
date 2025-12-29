<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});

	let { data } = $props();
</script>

<!-- TODO finish, this is just desktop UI mockup -->
<div
	class="
	relative flex w-full grow flex-row justify-center *:flex
	*:flex-col max-xl:hidden
"
>
	<div class="min-w-1/5 bg-red-900">Sidebar</div>
	<div class="grow bg-green-900">Article</div>
</div>
