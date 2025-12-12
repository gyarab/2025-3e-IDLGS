<script lang="ts">
	import Head from './Head.svelte';
	import About from './About.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>
		{m.textbookNameShort()} - {m.textbookNameLong()}
	</title>
</svelte:head>

<Head />

<About />
