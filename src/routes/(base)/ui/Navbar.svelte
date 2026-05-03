<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';
	import { logout, setNavbarOpen } from '$lib';
	import Button from '../components/Button.svelte';
	import { resolve } from '$app/paths';

	let {
		accentColor,
		open = $bindable(false),
		darkMode,
	}: {
		accentColor: string;
		open: boolean;
		darkMode: boolean;
	} = $props();
</script>

{#if !open}
	<button
		class="fixed top-0 z-20 flex h-8 w-screen items-start justify-center"
		onclick={async () => {
			open = true;
			await setNavbarOpen(true);
		}}
		aria-label={m.openNavbar()}
	>
		<i
			class="ri-arrow-down-s-fill {darkMode
				? 'text-black'
				: 'text-white'} absolute -top-6 left-3/4 text-6xl!"
			transition:fly|global={{ y: -50, duration: 200, opacity: 0 }}
		></i>
	</button>
{/if}

{#if open}
	<div
		class="{darkMode
			? 'bg-neutral-800 text-white'
			: 'bg-white text-black'} fixed top-0 z-10 flex h-[7svh] w-screen items-center border-b-2 shadow-xl"
		style="border-color: {accentColor};"
		transition:fly|global={{ y: -100, duration: 200, opacity: 0 }}
	>
		<div class="flex h-full w-full items-center px-4">
			<div class="w-[7svh] shrink-0"></div>

			<img
				src="/logo.svg"
				alt="Logo"
				class="h-10"
			/>

			<h2
				class="text-sm+ hidden shrink-0 px-4 font-bold tracking-widest sm:block"
			>
				DIGITALNI UCEBNICA
			</h2>

			<div class="grow"></div>

			<nav
				class="flex h-full items-center gap-2 {darkMode
					? '**:text-white'
					: '**:text-black!'}"
			>
				<Button
					emoji="user"
					text={m.profile()}
					type="button"
					rmwhite={darkMode}
					hecss="text-lg"
					onclick={() => {
						goto('/profile');
					}}
				/>

				<Button
					emoji="settings"
					text={m.settings()}
					type="button"
					rmwhite={darkMode}
					hecss="text-lg"
					onclick={() => {
						goto('/settings');
					}}
				/>

				<Button
					emoji="logout-box"
					text={m.logout()}
					type="button"
					rmwhite={darkMode}
					hecss="text-lg"
					onclick={async () => {
						await logout();
						goto(resolve('/(protected)/login'));
					}}
				/>

				<Button
					emoji="close"
					text=""
					type="button"
					onclick={async () => {
						open = false;
						await setNavbarOpen(false);
					}}
					css="p-2 opacity-50 hover:opacity-100 hover:translate-0!"
					label={m.collapse()}
				/>
			</nav>
		</div>
	</div>

	<div class="h-[7svh] w-screen"></div>
{/if}
