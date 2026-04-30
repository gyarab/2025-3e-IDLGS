<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import SidebarButton from './components/SidebarButton.svelte';
	import { enhance } from '$app/forms';

	let extended = $state(false);

	let {
		accentColor,
		commandPaletteOpen = $bindable(false),
		open = $bindable(false),
		darkMode = $bindable(false),
	}: {
		accentColor: string;
		commandPaletteOpen: boolean;
		open: boolean;
		darkMode: boolean;
	} = $props();
</script>

{#if open}
	<div
		class="pt-5 pb-5 {extended ? ' w-[24svh]' : ' w-[7svh]'} 
			fixed top-0 left-0 z-12! flex h-screen grow flex-col gap-5
			transition-all duration-200 **:z-20!
			{darkMode ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-200 text-neutral-800'}"
		transition:fly|global={{ x: -100, duration: 200, opacity: 0 }}
	>
		<SidebarButton
			onclick={() => {
				commandPaletteOpen = !commandPaletteOpen;
			}}
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
			class="w-full grow opacity-0"
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
				formvalue={darkMode ? 'light' : 'dark'}
				onclick={() => {}}
				emoji={darkMode ? 'sun' : 'moon'}
				description={darkMode ? m.lightMode() : m.darkMode()}
				bind:extended
			/>
		</form>
		<SidebarButton
			textSize="text-5xl"
			onclick={() => {
				extended = !extended;
			}}
			emoji={extended ? 'arrow-left-s' : 'arrow-right-s'}
			description={extended ? m.collapse() : m.extendSidebar()}
			bind:extended
		/>
	</div>
{:else}
	<button
		class="fixed top-0 left-0 z-50! flex h-screen w-[7svh] flex-col text-white!"
		onclick={() => (open = true)}
		aria-label={m.openSidebar()}
	>
		<div class="grow"></div>
		<i
			class="ri-arrow-right-s-fill -ms-4 text-6xl text-black"
			transition:fly|global={{ x: -100, duration: 200, opacity: 0 }}
		></i>
	</button>
{/if}
