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
				class="flex w-full flex-col text-lg text-neutral-700"
				in:fade|global={{
					duration: 500,
					delay: ABOUT_ANIMATION_SECOND.delay + 200,
				}}
			>
				{m.thisIsAListOfPublicTextbooksThatAnyoneCanAccess()}
				{m.selectATextbookToStartReading()}
				<br />
				<span class="font-medium">
					{m.pleaseNoteThatYouMustRespectTheCopyrightsAndLicensesOfEachTextbookAsWellAsOfIDLGS()}
				</span>
			</div>

			<!-- list -->
			<div
				class="
				relative grid grow grid-cols-4 gap-2 rounded-2xl
				p-5 shadow-2xl
			"
			>
				{#await data.textbooks}
					<div class="absolute top-0 left-0 flex h-full w-full grow flex-col justify-center items-center">
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
