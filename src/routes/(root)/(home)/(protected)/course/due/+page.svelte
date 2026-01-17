<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Desktop from './Desktop.svelte';
	import Mobile from './Mobile.svelte';

	let {
		data,
	}: {
		data: {};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.myAssignments()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<!-- TODO -->
<Desktop />
<Mobile />
