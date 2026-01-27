<script lang="ts">
	import {
		ABOUT_ANIMATION_FIRST,
		isInViewport,
		ABOUT_ANIMATION_SECOND,
	} from '$lib';
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import type { TextbookType } from '$lib/types';
	import LoadingAnimationHandler from '../components/LoadingAnimationHandler.svelte';
	//import from homepage
	import TextbookCard from '../(home)/(protected)/home/components/TextbookCard.svelte';
	import { goto } from '$app/navigation';
	import WordBackground from '../components/WordBackground.svelte';
	import { getLocale } from '$lib/paraglide/runtime';

	let element: HTMLDivElement | undefined = $state(undefined);
	let loaded = $state(false);

	onMount(() => {
		isInViewport(element as HTMLElement).then(() => (loaded = true));
	});

	let {
		data,
	}: {
		data: {
			textbooks: Promise<TextbookType[]>;
		};
	} = $props();

	let differentMandela = $derived(
		getLocale() === 'ru' || getLocale() === 'de' || getLocale() === 'pl',
	);
</script>

<svelte:head>
	<title>
		{m.library()} - {m.textbookNameShort()}
	</title>
</svelte:head>

<div
	class="flex w-full grow flex-col items-center overflow-x-hidden overflow-y-scroll p-5"
>
	<div
		bind:this={element}
		class="mt-2 flex min-h-[30svh] w-full grow flex-col gap-2 max-xl:w-9/10 xl:w-4/6"
	>
		{#key loaded}
			<div
				class="flex w-full {differentMandela
					? 'flex-col'
					: 'flex-row'} gap-2"
			>
				<div class="flex flex-col gap-2">
					<div class="flex flex-row gap-2">
						<h2
							in:fly|global={ABOUT_ANIMATION_FIRST}
							class="flex-nowrap text-6xl font-medium text-nowrap text-violet-800"
						>
							{m.publicTextbooks()}.
						</h2>
						<h2
							in:fly|global={ABOUT_ANIMATION_SECOND}
							class="flex-nowrap text-6xl font-bold text-nowrap text-emerald-600"
						>
							{m.library()}.
						</h2>
					</div>
					<div
						class="flex w-full flex-col text-lg text-wrap text-neutral-700"
						in:fade|global={{
							duration: 500,
							delay: ABOUT_ANIMATION_SECOND.delay + 200,
						}}
					>
						{m.thisIsAListOfPublicTextbooksThatAnyoneCanAccess()}
						{m.selectATextbookToStartReading()}
						{m.pleaseNoteThatYouMustRespectTheCopyrightsAndLicensesOfEachTextbookAsWellAsOfIDLGS()}
					</div>
				</div>
				<div class="grow {differentMandela ? 'hidden' : ''}"></div>
				<div class="flex w-full grow flex-row gap-2">
					<div
						class="flex grow flex-col items-end gap-2 p-2! text-neutral-500"
					>
						<span class="italic">
							"{m.educationIsTheMostPowerfulToolWhichYouCanUseToChangeTheWorld()}"
						</span>
						<div class="flex w-full flex-row justify-end italic">
							- {m.nelsonMandela()}
						</div>
					</div>
					<div
						class="relative object-contain! {differentMandela
							? 'max-h-40 w-15'
							: 'w-full max-w-30'} overflow-hidden rounded-2xl"
					>
						<img
							width="0"
							height="0"
							class="absolute top-0 right-0 z-11 h-full w-full overflow-hidden rounded-2xl bg-transparent! object-contain!"
							src="/people/mandelaFilter.png"
							alt={m.nelsonMandela()}
						/>
					</div>
				</div>
			</div>

			<!-- list -->
			<div
				class="
				relative grid grow grid-cols-4 gap-2 rounded-2xl
				p-5 shadow-2xl
			"
			>
				{#await data.textbooks}
					<div
						class="absolute top-0 left-0 flex h-full w-full grow flex-col items-center justify-center"
					>
						<LoadingAnimationHandler />
					</div>
				{:then textbooks}
					<span
						class="absolute top-0 left-0 flex h-full w-full grow flex-col overflow-hidden rounded-2xl"
					>
						<WordBackground />
					</span>
					{#each textbooks as textbook, i (textbook.uuid)}
						<span class="z-10">
							<TextbookCard
								perspective={false}
								delay={i * 100}
								textbook={textbook as TextbookType}
								onclick={() =>
									goto(`/textbook/${textbook.uuid}`)}
							/>
						</span>
					{:else}
						<div
							class="flex flex-col w-full justify-center items-center"
						>
							{m.noPublicTextbooksAvailable()}
						</div>
					{/each}
				{/await}
			</div>
		{/key}
	</div>
</div>
