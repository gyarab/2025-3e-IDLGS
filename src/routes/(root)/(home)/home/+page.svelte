<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Card from '../../components/Card.svelte';
</script>

<svelte:head></svelte:head>

<div
	class="relative flex grow flex-col items-center justify-center bg-[url(/testimage.jpg)] bg-contain bg-fixed"
>
	<!-- cover -->
	<div class="absolute z-2! h-full w-full bg-violet-800/60"></div>

	<div class="z-3 flex w-3/4 grow flex-col gap-2">
		<div class="min-h-[15vh] grow"></div>
		<h2 class="w-full text-left">{m.welcomeBackMessageName({ name: 'NAME TODO' })}</h2>
		<div class="min-h-[5vh] grow"></div>
		<div class="grid grid-cols-4 gap-2">
			<!-- TEMP list of cards -->
			{#each { length: 15 } as a, i (i)}
				<!-- temp eslint workaround TODO remove -->
				<span class="hidden">{a}</span>
				<Card
					text={crypto.randomUUID()}
					r={Math.random() * 100 + 125}
					g={Math.random() * 100 + 125}
					b={Math.random() * 100 + 125}
				/>
			{/each}
		</div>
	</div>

	<div class="min-h-[10vh] grow"></div>
</div>
