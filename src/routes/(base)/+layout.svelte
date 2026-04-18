<script lang="ts">
	import type { Snippet } from "svelte";
import Navbar from "./ui/Navbar.svelte";
	import Footer from "./ui/Footer.svelte";
	import { browser } from "$app/environment";
	import { onMount, onDestroy } from "svelte";

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
	let navbarOpen = $state(false);

		const keyboardHandler = (e: KeyboardEvent) => {
		if(e.key === "f") {
			e.preventDefault();
			navbarOpen = !navbarOpen;
		}
		}

		onMount(() => {
			if(browser) {
				addEventListener("keydown", keyboardHandler);
			}
	})
	onDestroy(() => {
		if(browser) {
			removeEventListener("keydown", keyboardHandler);
		}
	})
</script>

<Navbar {darkMode} bind:open={navbarOpen} accentColor={data.color} />

<div class="{data.darkMode ? "**:text-white" : "**:text-black"} relative flex flex-col grow w-screen min-h-screen overflow-x-hidden overflow-y-scroll items-center **:z-5">
	{@render children()}
</div>

<Footer	/>