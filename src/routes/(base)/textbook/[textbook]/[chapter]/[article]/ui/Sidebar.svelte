<script lang="ts">
	import { fly } from "svelte/transition";
	import { m } from "$lib/paraglide/messages";
	import SidebarButton from "./components/SidebarButton.svelte";
	import { enhance } from "$app/forms";

	let extended = $state(false);

	let {
		accentColor,
		commandPaletteOpen = $bindable(false),
		open = $bindable(false),
		darkMode = $bindable(false),
	}: {
		accentColor: string,
		commandPaletteOpen: boolean,
		open: boolean,
		darkMode: boolean,
	} = $props();
</script>

{#if open}
	<div
		class="pt-5 pb-5 {extended ? ' w-[24svh]' : ' w-[7svh]'} z-12! left-0 top-0 fixed flex h-screen grow gap-5 flex-col bg-neutral-800 hover:bg-neutral-800/70 shadow-xl **:z-20! transition-all duration-200"
		transition:fly|global={{ x: -100, duration: 200, opacity: 0 }}
>
	<SidebarButton
		onclick={() => {commandPaletteOpen = !commandPaletteOpen}}
		emoji="compass-discover"
		description={m.navigator()}
		bind:extended
	/>
	<SidebarButton 
		onclick={() => {}}
		emoji="home-2"
		description={m.textbookHome()}
		bind:extended
	/>
	<SidebarButton 
		onclick={() => {}}
		emoji="book-3"
		description={m.library()}
		bind:extended
	/>
	<SidebarButton 
		onclick={() => {}}
		emoji="target"
		description={m.practice()}
		bind:extended
	/>
	<button 
		class="grow opacity-0 w-full"
		onclick={() => (open = false)}
		aria-label={m.closeSidebar()}
	></button>
	<form 
		class=""
		method="POST"
		action="/?/setDarkMode"
		use:enhance
	>
	<SidebarButton 
		type="submit"
		formname="darkMode"
		formvalue={darkMode ? "light" : "dark"}
		onclick={() => {}}
		emoji={darkMode ? "sun" : "moon"}
		description={darkMode ? m.lightMode() : m.darkMode()}
		bind:extended
	/>
	</form>
	<SidebarButton 
		textSize="text-5xl"
		onclick={() => {extended = !extended}}
		emoji={extended ? "arrow-left-s" : "arrow-right-s"}
		description={extended ? m.collapseSidebar() : m.extendSidebar()}
		bind:extended
	/>
	</div>
{:else}
	<button class="fixed h-screen w-[7svh] left-0 z-50! top-0 flex flex-col"
	onclick={() => (open = true)}
	aria-label={m.openSidebar()}
>
	<div class="grow"></div>
	<i 
		class="ri-arrow-right-s-fill text-black text-6xl -ms-4"
		transition:fly|global={{ x: -100, duration: 200, opacity: 0 }}
	></i>
</button>
{/if}
