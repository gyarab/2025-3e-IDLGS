<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex, isInViewport } from '$lib';
	import { getLocale } from '$lib/paraglide/runtime';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let locale = $derived(getLocale());

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();

	let container: HTMLDivElement | undefined = $state(undefined);
	let ready = $state(false);

	onMount(() => {
		if (!browser) return;
		isInViewport(container!).then(() => {
			ready = true;
		});
	});
</script>

<div
	class="flex w-1/2 flex-col p-2"
	bind:this={container}
>
	{#if ready}
		{#key ready}
			<h1 in:fly|global={{ x: 1000, duration: 500 }}>{m.features()}</h1>
			<p class="text-justify" in:fly|global={{ x: 1000, duration: 500, delay: 200, opacity: 0 }}>
				<!-- better to do like this, translations strings aren't great fo this and are for strings used more than once (usually) -->
				{#if locale === 'cs'}
					IDLGS přínáší revoluci ve vzdělávání - interaktivní
					digitální učebnici - která za pomocí vědecky potvrzených
					metod zvyšuje motivaci a zapojení studentů.
				{:else if locale === 'pl'}
					IDLGS przynosi rewolucję w edukacji - interaktywny
					podręcznik cyfrowy - który za pomocą naukowo potwierdzonych
					metod zwiększa motywację i zaangażowanie uczniów.
				{:else}
					IDLGS brings a revolution in education - the interactive
					digital textbook - which, using scientifically proven
					methods, increases student motivation and engagement.
				{/if}
			</p>
			<div
				class="grid grid-cols-3 gap-4 *:flex *:aspect-square *:flex-col *:rounded-2xl *:border-2 *:border-neutral-500/50 *:bg-neutral-500/50 *:p-2 *:backdrop-blur-sm"
			>
				<div
					class=""
					in:fly={{ y: 20, duration: 500 }}
				>
					<h2 class="text-neutral-700">{m.interactiveContent()}</h2>
					<p class="text-justify text-black">
						{#if locale === 'cs'}
							Naše učebnice obsahují interaktivní cvičení, kvízy a
							multimediální prvky, které zvyšují zapojení studentů
							a usnadňují pochopení složitých konceptů.
						{:else if locale === 'pl'}
							Nasze podręczniki zawierają interaktywne ćwiczenia,
							quizy i elementy multimedialne, które zwiększają
							zaangażowanie uczniów i ułatwiają zrozumienie
							skomplikowanych koncepcji.
						{:else}
							Our textbooks feature interactive exercises,
							quizzes, and multimedia elements that enhance
							student engagement and facilitate understanding of
							complex concepts.
						{/if}
					</p>
				</div>
				<div
					class=""
					in:fly={{ y: 20, duration: 500, delay: 200 }}
				>
					<h2 class="text-neutral-700">{m.cuttingEdgeFeatures()}</h2>
					<p class="text-justify text-black">
						{#if locale === 'cs'}
							Naše učebnice využívají nejnovější technologie a
							metody, které zajišťují nejlepší výsledky ve
							vzdělávání.
						{:else if locale === 'pl'}
							Nasze podręczniki wykorzystują najnowsze technologie
							i metody, które zapewniają najlepsze wyniki w
							edukacji.
						{:else}
							Our textbooks utilize the latest technologies and
							methods to ensure the best educational outcomes.
						{/if}
					</p>
				</div>
				<div
					class=""
					in:fly={{ y: 20, duration: 500, delay: 400 }}
				>
					<h2 class="text-neutral-700">{m.mutlimediaSupport()}</h2>
					<p class="text-justify text-black">
						{#if locale === 'cs'}
							Naše učebnice poskytují výbornou podporu pro
							multimediální učení, což zlepšuje porozumění a
							zapojení studentů.
						{:else if locale === 'pl'}
							Nasze podręczniki oferują excelentną obsługę uczenia
							multimedialnego, co poprawia zrozumienie i
							zaangażowanie uczniów.
						{:else}
							Our textbooks provide excellent support for
							multimedia learning, enhancing student understanding
							and engagement.
						{/if}
					</p>
				</div>
			</div>
		{/key}
	{/if}
</div>
