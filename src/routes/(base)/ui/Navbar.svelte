<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';

	let {
		accentColor,
		open = $bindable(false),
		darkMode
	}: {
		accentColor: string;
		open: boolean,
		darkMode: boolean,
	} = $props();
</script>

<button
	class="fixed top-0 z-11! h-[7svh] w-screen"
	onclick={() => (open = !open)}
	aria-label={open ? m.closeNavbar() : m.openNavbar()}
>
	{#if !open}
		<i 
		class="ri-arrow-down-s-fill {darkMode ? 'text-neutral-700' : 'text-white'} text-6xl! absolute -top-6 left-3/4 opacity-100!"
		transition:fly|global={{ y: -50, duration: 200, opacity: 0 }}
	></i>
	{/if}
</button>

{#if open}
	<div
		class="{darkMode ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-black'} fixed z-10! flex h-[7svh] w-screen grow flex-col items-center justify-center gap-2 border-b-2 shadow-xl"
		style="border-color: {accentColor};"
		transition:fly|global={{ y: -100, duration: 200, opacity: 0 }}
	>
		<div class="flex h-full w-2/3 flex-row items-center justify-center gap-4">
			
			<div class="grow"></div>
			<h2>DIGITALNI UCEBNICA</h2>
			<div class="grow"></div>
			
		</div>
	</div>
	<div class="z-0! h-[7svh] w-screen"></div>
{/if}

