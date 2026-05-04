<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex, isInViewport } from '$lib';
	import { getLocale } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let {
		darkMode,
		color
	}: {
		darkMode: boolean;
		color: string;	
	} = $props();

	let locale = $derived(getLocale());
	let ready = $state(false);
	let mainElement: HTMLDivElement | undefined = $state(undefined);

	onMount(() => {
		if(!browser) return;
		isInViewport(mainElement!).then((inViewport) => {
				ready = true;
		});
	})
</script>

<div class="flex w-1/2 flex-col p-2" bind:this={mainElement}>
	<h2>{m.contact()}</h2>
	<p>
		{#if locale === 'cs'}
			Máte otázky? Kontaktujte nás na následujících emailových adresách:
		{:else if locale === 'pl'}
			Masz pytania? Skontaktuj się z nami pod następującymi adresami email:
		{:else}
			Have questions? Contact us at the following email addresses:		
		{/if}
	</p>
</div>
