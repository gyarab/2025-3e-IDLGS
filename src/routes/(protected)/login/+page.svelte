<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import Form from '$src/routes/(base)/components/Form.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { darkenHex } from '$lib';
	import { goto } from '$app/navigation';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
		};
	} = $props();

	let solved = $state(false); // captcha
</script>

<svelte:head>
	<script
		src="https://cdn.jsdelivr.net/npm/@cap.js/widget"
		async
		defer
	></script>
	<title>
		{m.login()} | {m.idlgs()}
	</title>
</svelte:head>

<div
	class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4"
	style="background: linear-gradient(135deg, {data.color}, {darkenHex(
		data.color,
		80,
	)}); --brand: {data.color};"
>
	<i
		class="ri-login-box-line absolute right-1/15 bottom-1/6 scale-200 rotate-15 text-9xl text-white opacity-20"
	></i>
	<i
		class="ri-lock-password-line absolute top-1/4 left-1/15 scale-200 -rotate-15 text-9xl text-white opacity-20"
	></i>

	<div
		class="z-10 flex w-full max-w-md flex-col gap-4 rounded-3xl p-4 shadow-2xl backdrop-blur-sm sm:gap-6 sm:rounded-4xl sm:p-8 {data.darkMode
			? 'bg-neutral-800/80 text-white'
			: 'bg-white/90 text-black'}"
	>
		<header class="flex flex-col items-center gap-1 pt-2 text-center">
			<img
				src="/logo.svg"
				alt="Logo"
				class="h-12 sm:h-14"
			/>
			<div>
				<h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
					{m.login()}
				</h1>
			</div>
		</header>

		<hr class="opacity-20" />

		<Form
			target="?/login"
			darkMode={data.darkMode}
			css="flex flex-col gap-4"
			success={async () => {
				goto('/profile/');
			}}
			failure={async () => {}}
			color={data.color}
		>
			<div class="space-y-4">
				<TextInput
					type="email"
					name="email"
					darkMode={data.darkMode}
					color={data.color}
					placeholder={m.enterYourEmail()}
				/>

				<TextInput
					type="password"
					name="password"
					darkMode={data.darkMode}
					color={data.color}
					placeholder={m.enterYourPassword()}
				/>
			</div>

			<div class="flex justify-center py-2">
				<cap-widget
					id="cap"
					class={data.darkMode ? 'darkCap' : 'lightCap'}
					style="width: 100% !important; max-width: 300px;"
					data-cap-api-endpoint="https://captcha.martinbykov.eu/5a4899a4b6"
					onsolve={() => {
						solved = true;
					}}
				></cap-widget>
			</div>

			<Button
				css="buttonPrimary"
				emoji="login-box"
				text={m.login()}
				type="submit"
				style="background-color: {solved ? data.color : '#9ca3af'};"
				disabled={!solved}
				onclick={() => {}}
			/>
		</Form>

		{#if !data.darkMode}
			<p class="text-center text-xs opacity-40">
				{m.secureEncryptedLogin()}
			</p>
		{/if}
	</div>
</div>
