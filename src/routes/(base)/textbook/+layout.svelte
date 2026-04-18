<script lang="ts">
	import { onDestroy, onMount, type Snippet } from "svelte";
	import Sidebar from "./ui/Sidebar.svelte";
	import CommandPalette from "../ui/CommandPalette.svelte";
	import Background from "./ui/components/Background.svelte";
	import { browser } from "$app/environment";

	let {
		children,
		data
	}: {
		children: Snippet,
		data: {
			color: string,
			darkMode: boolean
		},
	} = $props();

	let darkMode = $derived(data.darkMode);

	let commandPaletteOpen = $state(false);
	let sidebarOpen = $state(true);
	let focusMode = $state(false);

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

	//TODO finish, make editable (remappable)
	const keyboardHandler = (e: KeyboardEvent) => {
		//Ctrl+K or Cmd+K to open command palette
		if(e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			commandPaletteOpen = !commandPaletteOpen;
		}
		//F for focus mode (hide navbar and sidebar)
		else if(e.key === "f") {
			e.preventDefault();
			focusMode = !focusMode;

			sidebarOpen = focusMode;
			commandPaletteOpen = focusMode;
		}
		//go to top with u
		else if(e.key === "u") {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		else {}
	}

	onMount(() => {
		if(browser) {
			addEventListener("scroll", updateWindowScroll);
			addEventListener("resize", updateDocumentHeight);
			addEventListener("keydown", keyboardHandler);

			updateWindowScroll();
			updateDocumentHeight();
		}
	})
	onDestroy(() => {
		if(browser) {
			removeEventListener("scroll", updateWindowScroll);
			removeEventListener("resize", updateDocumentHeight);
			removeEventListener("keydown", keyboardHandler);
		}
	})
</script>

<Sidebar bind:darkMode accentColor={data.color} bind:commandPaletteOpen={commandPaletteOpen} bind:open={sidebarOpen} />

<div class="relative flex flex-col grow w-screen min-h-screen overflow-x-hidden overflow-y-scroll items-center **:z-5">
	{#key percentArticleRead}
	<Background accentColor={data.color} percentRead={percentArticleRead} {darkMode} />
	{/key}

	{@render children()}

	<CommandPalette bind:open={commandPaletteOpen} {darkMode} />
</div>

