<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex } from '$lib';
	import { onMount } from 'svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import { fade, fly } from 'svelte/transition';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();

	let locale = $derived(getLocale());

	let ready = $state(false);

	onMount(() => {
		ready = true;
	});
</script>

<div class="flex w-1/2 flex-col p-2 gap-2">
	<h1>{m.aboutUs()}</h1>
	<p class="text-justify">
		{#if locale === 'cs'}
			IDLGS je interaktivní digitální učebnice, která přináší revoluci ve vzdělávání. Naše platforma nabízí širokou škálu interaktivního obsahu, včetně 3D modelů, multimediálních prvků a inovativních funkcí, které zvyšují zapojení studentů a usnadňují učení.
		{:else if locale === 'pl'}
			IDLGS to interaktywny podręcznik cyfrowy, który rewolucjonizuje edukację. Nasza platforma oferuje szeroką gamę interaktywnych treści, w tym modele 3D, elementy multimedialne i innowacyjne funkcje, które zwiększają zaangażowanie uczniów i ułatwiają naukę.
		{:else}
			IDLGS is an interactive digital textbook that revolutionizes education. Our platform offers a wide range of interactive content, including 3D models, multimedia elements, and innovative features that enhance student engagement and facilitate learning.
		{/if}
	</p>
</div>
