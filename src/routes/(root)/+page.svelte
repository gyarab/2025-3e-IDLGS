<script lang="ts">
	import Head from './Head.svelte';
	import About from './About.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
	<!-- TODO -->
	<title>
		{m.hello_world({ name: 'idlgs' })}
	</title>
</svelte:head>

<Head />

<About />
