<script lang="ts">
	import type { Locale } from "$lib/paraglide/runtime";

	let {
		name,
		descriptionCS,
		descriptionPL,
		descriptionEN,
		locale,
	}: {
		name: string;
		descriptionCS: string;
		descriptionPL: string;
		descriptionEN: string;
		locale: Locale;
	} = $props();
</script>

<div class="w-1/2 rounded-lg flex flex-col border-2 border-neutral-500 bg-neutral-500/50 p-2">
	<h2>{name}</h2>
	<p>
		{#if locale === 'cs'}
			{descriptionCS}
		{:else if locale === 'pl'}
			{descriptionPL}
		{:else}
			{descriptionEN}
		{/if}
	</p>
</div>