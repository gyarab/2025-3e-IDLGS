<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Desktop from './Desktop.svelte';
	import Mobile from './Mobile.svelte';
	import type { UserType } from '$lib/types';

	let {
		data,
	}: {
		data: {
			user: UserType;
		};
	} = $props();
</script>

<svelte:head>
	<title>
		{m.settings()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<Desktop {data} />
<Mobile {data} />