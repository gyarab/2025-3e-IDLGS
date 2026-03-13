<script lang="ts">
	import { fly } from "svelte/transition";
	import { m } from "$lib/paraglide/messages";

	let open = $state(false);

	let {
		accentColor
	}: {
		accentColor: string
	} = $props();
</script>

<button class="fixed h-screen w-[7svh] opacity-0 left-0 z-49! top-0"
	onclick={() => (open = !open)}
	aria-label={open ? m.closeSidebar() : m.openSidebar()}
></button>

{#if open}
	<div
		class="left-0 top-0 fixed flex h-screen w-[7svh] grow flex-col bg-neutral-100 border-r-2 shadow-xl"
		style="border-color: {accentColor};"
		transition:fly|global={{ x: -100, duration: 200, opacity: 0 }}
>
	</div>
{:else}
	<div></div>
{/if}
