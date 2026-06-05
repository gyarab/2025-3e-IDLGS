<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import { goto, invalidateAll } from '$app/navigation';
	import { logout, setDarkMode } from '$lib';
	import Dialog from '../(base)/components/Dialog.svelte';
	import ConfirmCancel from '../(base)/components/ConfirmCancel.svelte';
	import { resolve } from '$app/paths';
	import NavButton from '../(base)/components/NavButton.svelte';
	import { onMount } from 'svelte';

	let {
		accentColor,
		darkMode,
	}: {
		accentColor: string;
		darkMode: boolean;
	} = $props();

	let showLogoutConfirm = $state(false);
	let visible = $state(false);
	onMount(() => {
		visible = true;
	});
</script>

<div
	class="pointer-events-none fixed bottom-4 z-40 w-full sm:top-4"
	in:fly={{ y: -40, duration: 300 }}
>
	<div
		class="pointer-events-auto mx-auto flex h-12 w-full max-w-5xl items-center justify-center px-4 sm:px-8"
	>
		<nav
			class="relative flex w-full items-center overflow-x-visible overflow-y-hidden
				rounded-full border text-sm shadow-[0_8px_40px_rgba(80,80,80,0.5)]
				backdrop-blur-sm transition-all sm:px-4 sm:shadow-[0_-8px_32px_rgba(80,80,80,0.4)]
                {darkMode
				? 'border-white/30 bg-black/30 text-white'
				: 'border-black/30 bg-white/60 text-black'}"
		>
			<div class="flex shrink-0 items-center gap-3 ps-2">
				<a href="/">
					<img
						src="/logo.svg"
						alt="Logo"
						class="h-12 w-12 transition-transform active:scale-90"
					/>
				</a>
				<h2
					class="my-auto hidden font-black tracking-widest text-nowrap uppercase md:inline"
				>
					Digitalni Ucebnica
				</h2>
			</div>

			<div class="grow"></div>

			<div class="flex items-center">
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
					css="buttonPrimary text-nowrap -mx-1"
					txtcss="hidden lg:inline"
					onclick={() => goto(resolve('/(base)/textbook'))}
				/>

				<NavButton
					emoji="settings-4"
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
						goto('/help');
					}}
					emoji="question"
					css="buttonPrimary"
					label={m.help()}
					{darkMode}
				/>

				<NavButton
					onclick={async () => {
						await setDarkMode(!darkMode);
						await invalidateAll();
					}}
					emoji={darkMode ? 'sun' : 'moon'}
					css="buttonPrimary -mx-1"
					label={darkMode ? m.lightMode() : m.darkMode()}
					{darkMode}
				/>

				<NavButton
					emoji="logout-box"
					{darkMode}
					css="buttonPrimary"
					label={m.logout()}
					onclick={() => (showLogoutConfirm = true)}
				/>
			</div>
		</nav>
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
				<p class="text-sm font-medium opacity-60">
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
