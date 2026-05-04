<script lang="ts">
	import TextbookCard from './ui/TextbookCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { TextbookType, UserType } from '$lib/types';
	import Button from '../components/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { darkenHex } from '$lib';
	import { textbooks } from '$lib/plural';

	let {
		data,
	}: {
		data: {
			color: string;
			darkMode: boolean;
			textbooks: TextbookType[];
			user: UserType | undefined;
		};
	} = $props();
</script>

<svelte:head>
	<title>{m.yourTextbooks()} | {m.idlgs()}</title>
</svelte:head>

<div
	class="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden px-4 py-8"
	style="background: linear-gradient(135deg, {data.color}, {darkenHex(
		data.color,
		80,
	)}); --brand: {data.color};"
>
	<i
		class="ri-book-3-line absolute right-1/20 bottom-1/6 scale-200 rotate-15 text-9xl text-white opacity-20"
	></i>
	<i
		class="ri-stack-line absolute top-1/4 left-1/20 scale-200 -rotate-15 text-9xl text-white opacity-20"
	></i>

	<div
		class="z-10 flex w-full max-w-4xl flex-col gap-6 rounded-3xl p-6 shadow-2xl backdrop-blur-sm sm:rounded-4xl md:p-8 {data.darkMode
			? 'bg-neutral-800/80 text-white'
			: 'bg-white/90 text-black'}"
	>
		<header
			class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
		>
			<div>
				<h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
					{m.yourTextbooks()}
				</h1>
				<p class="text-sm font-medium opacity-60">
					{data.textbooks.length}
					{textbooks(4)}
				</p>
			</div>

			<Button
				text={m.createTextbook()}
				emoji="health-book"
				type="button"
				css="rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg transition-transform hover:scale-105"
				style="background-color: var(--brand); color: white;"
				onclick={() => {
					goto(resolve('/(base)/textbook/create'));
				}}
			/>
		</header>

		<hr class="opacity-20" />

		<section class="custom-scrollbar max-h-[60vh] overflow-y-auto pr-2">
			{#if data.textbooks.length > 0}
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{#each data.textbooks as textbook, i (textbook.uuid || i)}
						<div
							class="transition-transform duration-200 hover:scale-[1.02]"
						>
							<TextbookCard {textbook} />
						</div>
					{/each}
				</div>
			{:else}
				<div
					class="flex flex-col items-center justify-center py-12 opacity-40"
				>
					<i class="ri-book-open-line text-6xl"></i>
					<p class="mt-4 font-medium">No textbooks found</p>
				</div>
			{/if}
		</section>
	</div>
</div>
