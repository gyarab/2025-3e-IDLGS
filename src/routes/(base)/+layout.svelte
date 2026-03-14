<script lang="ts">
	import { onDestroy, onMount, type Snippet } from "svelte";
	import Navbar from "./ui/Navbar.svelte";
	import Footer from "./ui/Footer.svelte";
	import Sidebar from "./ui/Sidebar.svelte";
	import CommandPalette from "./ui/CommandPalette.svelte";
	import Background from "./ui/components/Background.svelte";
	import { browser } from "$app/environment";

	let {
		children,
		data
	}: {
		children: Snippet,
		data: {
			color: string
		},
	} = $props();

	let commandPaletteOpen = $state(false);

	let windowScroll = $state(0);
	const updateWindowScroll = () => {
		windowScroll = window.scrollY;
	}

	let documentHeight = $state(1);
	const updateDocumentHeight = () => {
		documentHeight = document.documentElement.scrollHeight;
	}

	let percentArticleRead = $derived.by(() => {
		if(browser) {
			return windowScroll / (documentHeight - window.innerHeight) * 100;
		}
		else return 0;
	});

	onMount(() => {
		if(browser) {
			addEventListener("scroll", updateWindowScroll);
			addEventListener("resize", updateDocumentHeight);

			updateWindowScroll();
			updateDocumentHeight();
		}
	})
	onDestroy(() => {
		if(browser) {
			removeEventListener("scroll", updateWindowScroll);
			removeEventListener("resize", updateDocumentHeight);
		}
	})
</script>

<Navbar accentColor={data.color} />
<Sidebar accentColor={data.color} bind:commandPaletteOpen />

<div class="relative flex flex-col grow w-screen min-h-screen overflow-x-hidden overflow-y-scroll items-center **:z-5">
	{#key percentArticleRead}
	<Background accentColor={data.color} percentRead={percentArticleRead} />
	{/key}

	{@render children()}

	<CommandPalette bind:open={commandPaletteOpen} />
</div>

<Footer	/>