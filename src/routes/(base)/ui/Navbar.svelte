<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';

	let open = $state(false);

	let {
		accentColor
	}: {
		accentColor: string;
	} = $props();
</script>

<button
	class="fixed top-0 z-50! h-[7svh] w-screen opacity-0"
	onclick={() => (open = !open)}
	aria-label={open ? m.closeNavbar() : m.openNavbar()}
></button>

{#if open}
	<div
		class="fixed z-10! flex h-[7svh] w-screen grow flex-col items-center justify-center gap-2 border-b-2 bg-neutral-100 shadow-xl"
		style="border-color: {accentColor};"
		transition:fly|global={{ y: -100, duration: 200, opacity: 0 }}
	>
		<div class="flex h-full w-2/3 flex-row items-center justify-center gap-4">
			
			<div class="grow"></div>
			<h2>DIGITALNI UCEBNICA</h2>
			<div class="grow"></div>
			
		</div>
	</div>
{:else}
	<div></div>
{/if}

<div class="z-0! h-[calc(7svh+calc(var(--spacing)*8))] w-screen"></div>
