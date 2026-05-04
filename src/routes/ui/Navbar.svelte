<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
import { goto, invalidateAll } from '$app/navigation';
	import { logout, setDarkMode } from '$lib';
	import Button from '../(base)/components/Button.svelte';
	import Dialog from '../(base)/components/Dialog.svelte';
	import ConfirmCancel from '../(base)/components/ConfirmCancel.svelte';
	import { resolve } from '$app/paths';
	import NavButton from '../(base)/components/NavButton.svelte';

	let {
		accentColor,
		darkMode,
	}: {
		accentColor: string;
		darkMode: boolean;
	} = $props();

	let showLogoutConfirm = $state(false);
</script>

<div 
    class="fixed top-0 left-0 z-30 h-16 w-full pointer-events-none"
    style="
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        background: linear-gradient(to bottom, 
            {darkMode ? 'rgba(80,80,80,0.4)' : 'rgba(240,240,240,0.2)'} 0%,
            transparent 100%
        );
    "
></div>
<div
	class="fixed top-0 z-40 mt-4 w-full"
	transition:fly={{ y: -50, duration: 300 }}
>
	<div
		class="mx-auto flex h-[7svh] w-full max-w-6xl items-center justify-center px-4"
	>
		<div
			class="relative flex w-full items-center rounded-full border px-4 text-sm shadow-lg backdrop-blur-xs transition-colors
                {darkMode
				? 'border-white/20 bg-black/20 text-white'
				: 'border-white/40 bg-white/50 text-black'}"
		>
			<div class="flex items-center gap-3 sm:px-2">
				<img
					src="/logo.svg"
					alt="Logo"
					class="h-12 w-12"
				/>
				<h2
					class="hidden text-nowrap font-black tracking-widest uppercase sm:inline"
				>
					Digitalni Ucebnica
				</h2>
			</div>

			<div class="grow"></div>

			<nav class="flex items-center">
				<NavButton
					emoji="user"
					text={m.profile()}
					{darkMode}
					css="buttonPrimary text-nowrap"
					txtcss="hidden lg:inline"
					onclick={() => goto('/profile')}
				/>

				<NavButton
					emoji="book"
					text={m.textbooks()}
					{darkMode}
					css="buttonPrimary text-nowrap"
					txtcss="hidden lg:inline"
					onclick={() => goto(resolve('/(base)/textbook'))}
				/>

				<NavButton
					emoji="settings"
					text={m.settings()}
					{darkMode}
					css="buttonPrimary text-nowrap"
					txtcss="hidden lg:inline"
					onclick={() => goto('/settings')}
				/>

				<div
					class="mx-1 h-6 w-px {darkMode
						? 'bg-white/40'
						: 'bg-black/20'}"
				></div>

				<NavButton
					onclick={async () => {
						await setDarkMode(!darkMode);
						await invalidateAll();
					}}
					text=""
					emoji={darkMode ? 'sun' : 'moon'}
					css="buttonPrimary"
					label={darkMode ? m.lightMode() : m.darkMode()}
					{darkMode}
				/>

				<NavButton
					emoji="logout-box"
					text=""
					{darkMode}
					css="buttonPrimary"
					label={m.logout()}
					onclick={() => (showLogoutConfirm = true)}
				/>
			</nav>
		</div>
	</div>
</div>

{#if showLogoutConfirm}
	<Dialog
		{darkMode}
		open={showLogoutConfirm}
		css="p-6 rounded-3xl border border-white/10 backdrop-blur-xl"
	>
		<div class="flex flex-col items-center gap-6 text-center">
			<div
				class="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-500"
			>
				<i class="ri-logout-circle-line text-3xl"></i>
			</div>
			<div>
				<h3 class="text-xl font-bold">{m.logout()}?</h3>
				<p class="text-sm opacity-60 font-medium">
					Are you sure you want to end your session?
				</p>
			</div>
			<ConfirmCancel
				dangerous={true}
				color={accentColor}
				open={showLogoutConfirm}
				confirm={async () => {
					await logout();
					goto(resolve('/(protected)/login'));
				}}
				cancel={async () => {
					showLogoutConfirm = false;
				}}
			/>
		</div>
	</Dialog>
{/if}
