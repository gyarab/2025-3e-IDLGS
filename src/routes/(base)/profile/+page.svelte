<script lang="ts">
	import { darkenHex } from '$lib';
	import type { TextbookType, UserType } from '$lib/types';
	import { m } from '$lib/paraglide/messages';
	import Button from '../components/Button.svelte';
	import { goto } from '$app/navigation';

	let {
		data,
	}: {
		data: {
			darkMode: boolean;
			color: string;
			user: UserType;
			textbooks: TextbookType[];
		};
	} = $props();

	let profile = {
		stats: [
			// { label: 'Time Spent Reading', value: '1240 min' },
			// { label: 'Textbooks Finished', value: '8' },
		],
	};

	// TODO @AY-GA fix this so it shows correct data
</script>

<svelte:head>
	<title>{data.user.name} | {m.profile()} | {m.idlgs()}</title>
</svelte:head>

<div
	class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4"
	style="background: linear-gradient(135deg, {data.color}, {darkenHex(
		data.color,
		80,
	)}); --brand: {data.color};"
>
	<i
		class="ri-user-line absolute right-1/20 bottom-1/6 scale-200 rotate-15 text-9xl text-white opacity-20"
	></i>
	<i
		class="ri-book-open-line absolute top-1/4 left-1/20 scale-200 -rotate-15 text-9xl text-white opacity-20"
	></i>

	<div
		class="z-10 flex w-full max-w-lg flex-col gap-6 rounded-3xl p-6 shadow-2xl backdrop-blur-sm sm:rounded-4xl md:p-8 {data.darkMode
			? 'bg-neutral-800/80 text-white'
			: 'bg-white/90 text-black'}"
	>
		<header class="flex items-center gap-6">
			<div
				class="flex h-20 w-20 items-center justify-center rounded-2xl border-2 sm:h-24 sm:w-24"
				style:border-color="var(--brand)"
			>
				<span
					class="px-2 text-center text-xs font-bold tracking-wider uppercase"
					style:color="var(--brand)">Student Profile</span
				>
			</div>
			<div>
				<h1 class="text-2xl font-bold sm:text-3xl">{data.user.name}</h1>
				{#if data.user.degree && data.user.institution}
					<p class="text-sm font-medium opacity-60 sm:text-base">
						{data.user.degree} • {data.user.institution}
					</p>
				{/if}
			</div>
		</header>

		<hr class="opacity-20" />

		<div class="grid grid-cols-2 gap-4">
			{#each profile.stats as { label, value }}
				<div
					class="flex flex-col items-center justify-center rounded-2xl border p-2 text-center transition-transform hover:scale-105 md:px-6 {data.darkMode
						? 'border-white/10 bg-neutral-700'
						: 'border-orange-100 bg-orange-50'}"
				>
					<p
						class="mb-1 text-sm font-semibold tracking-tighter uppercase opacity-60"
						style="font-size: clamp(.5rem, 2.5vw, 1rem);"
					>
						{label}
					</p>
					<p
						class="font-extrabold"
						style="color: var(--brand); font-size: clamp(1rem, 5vw, 1.6rem);"
					>
						{value}
					</p>
				</div>
			{/each}
		</div>

		<section class="mt-2">
			<h2
				class="mb-6 text-xl font-bold tracking-tight uppercase opacity-80"
			>
				Recently opened
			</h2>
			<div class="space-y-6">
				{#each data.textbooks as { title, description, uuid }}
					<div class="flex items-center justify-between gap-4">
						<div class="flex-1">
							<h3
								class="text-sm leading-tight font-semibold sm:text-base"
							>
								{title}
							</h3>
							<p class="text-sm opacity-50">{description}</p>
						</div>
						<div class="flex items-center gap-3">
							<Button
								text="Open"
								emoji="book-open"
								type="button"
								css="rounded-full px-4 py-2 text-sm font-semibold hover:bg-white/20"
								style="background-color: {darkenHex(
									data.color,
									20,
								)};"
								onclick={() => goto(`/textbook/${uuid}`)}
							/>
							<!--
							<div
								class="h-2.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10"
							>
								<div
									class="h-full transition-all duration-1000"
									style:width="{title}%"
									style:background-color="var(--brand)"
								></div>
							</div>
							<span
								class="w-10 text-sm font-black"
								style:color="var(--brand)">{title}%</span
							>
							-->
						</div>
					</div>
				{/each}
			</div>
		</section>
	</div>
</div>
