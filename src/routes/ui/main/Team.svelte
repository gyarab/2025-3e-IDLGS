<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex } from '$lib';
	import { onMount } from 'svelte';
	import TeamSvelte from './components/TeamSvelte.svelte';
	import { fly, fade } from 'svelte/transition';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();

	let ready = $state(false);

	onMount(() => {
		setTimeout(() => {
			ready = true;
		}, 100);
	});
</script>

<div
	class="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden p-6"
	style="background: linear-gradient(135deg, {color}, {darkenHex(
		color,
		80,
	)}); --brand: {color};"
>
	<div
		class="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-white opacity-5 blur-3xl"
	></div>
	<div
		class="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-(--brand) opacity-60 backdrop-blur-xs"
	></div>

	<i
		class="ri-group-line absolute top-1/4 right-1/12 scale-150 rotate-12 text-9xl text-white opacity-10"
	></i>
	<i
		class="ri-code-s-slash-line absolute bottom-1/4 left-1/12 scale-150 -rotate-12 text-9xl text-white opacity-10"
	></i>

	{#if ready}
		<div
			class="z-10 flex w-full max-w-5xl flex-col gap-6 rounded-4xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl sm:rounded-[3rem] md:p-12 {darkMode
				? 'bg-black/60 text-white'
				: 'bg-white/70 text-black'}"
			in:fade={{ duration: 400 }}
		>
			<header
				class="flex flex-col justify-between md:flex-row md:items-end"
			>
				<div class="max-w-2xl">
					<h1
						class="mb-4 text-3xl font-black tracking-tight sm:text-5xl"
						in:fly={{ y: 20, duration: 600 }}
					>
						{m.theTeam()}
					</h1>
					<p
						class="text-lg leading-relaxed font-medium opacity-70"
						in:fly={{ y: 20, duration: 600, delay: 100 }}
					>
						{m.team_description()}
					</p>
				</div>
			</header>

			<div
				class="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent mb-2"
			></div>

			<div class="flex flex-col gap-6">
				<div
					class="overflow-hidden rounded-tl-[4rem] rounded-tr-3xl rounded-br-lg rounded-bl-3xl border-l-4 border-(--brand) shadow-2xl"
					in:fly={{ x: -30, duration: 700, delay: 200 }}
				>
					<TeamSvelte
						name="Martin Bykov"
						role="Project Manager"
						description={m.martin_desc()}
						{darkMode}
					/>
				</div>

				<div
					class="w-full self-end overflow-hidden rounded-tl-3xl rounded-tr-[4rem] rounded-br-3xl rounded-bl-lg border-r-4 border-(--brand) shadow-2xl sm:w-5/6"
					in:fly={{ x: 30, duration: 700, delay: 400 }}
				>
					<TeamSvelte
						name="Ali Yunussov"
						role="Lead Designer"
						description={m.ali_desc()}
						{darkMode}
						reverse={true}
					/>
				</div>

				<div
					class="overflow-hidden rounded-tl-[4rem] rounded-tr-3xl rounded-br-lg rounded-bl-3xl border-l-4 border-(--brand) shadow-2xl"
					in:fly={{ x: -30, duration: 700, delay: 600 }}
				>
					<TeamSvelte
						name="Kira Stepanova"
						role="Education Lead"
						description={m.kira_desc()}
						{darkMode}
					/>
				</div>
			</div>
		</div>
	{/if}
</div>
