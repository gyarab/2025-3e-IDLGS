<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import type { Snippet } from "svelte";

	//TODO school OOBE - not for users

	let {
		children
	}: {
		children: Snippet
	} = $props();
</script>

<svelte:head>
	<title>
		{m.welcomeToIDLGS()}
	</title>
</svelte:head>

<div>
	{@render children()}
</div>