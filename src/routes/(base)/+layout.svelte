<script lang="ts">
	import type { Snippet } from "svelte";
	import Navbar from "./ui/Navbar.svelte";
	import Footer from "./ui/Footer.svelte";
	import Sidebar from "./ui/Sidebar.svelte";
	import CommandPalette from "./ui/CommandPalette.svelte";

	let {
		children,
		data
	}: {
		children: Snippet,
		data: {
			color: string
		},
	} = $props();
</script>

<Navbar accentColor={data.color} />
<Sidebar accentColor={data.color} />

<div class="flex flex-col grow w-screen h-screen overflow-x-hidden overflow-y-scroll items-center">
	{@render children()}
</div>

<Footer	/>

<CommandPalette />