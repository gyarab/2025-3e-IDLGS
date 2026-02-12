<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { Snippet } from 'svelte';
	import AdminSidebar from './components/desktop/sidebar/AdminSidebar.svelte';
	import AdminContentPositioning from './components/desktop/AdminContentPositioning.svelte';

	let {
		children,
	}: {
		children: Snippet;
	} = $props();
</script>

<svelte:head>
	<title>{m.schoolAdministration()} - {m.textbookNameShort()}</title>
</svelte:head>

<div
	class="
	relative flex w-full grow flex-row justify-center *:flex
	*:flex-col
"
>
	<AdminSidebar />
	<AdminContentPositioning>
		{@render children()}
	</AdminContentPositioning>
</div>
