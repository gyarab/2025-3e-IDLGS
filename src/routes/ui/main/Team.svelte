<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkenHex } from '$lib';
	import { onMount } from 'svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import TeamSvelte from './components/TeamSvelte.svelte';
	import { fly } from 'svelte/transition';

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

{#if ready}
	{#key ready}
		<div class="flex w-1/2 flex-col p-2">
			<h1>{m.theTeam()}</h1>
			<p class="text-justify">
				{#if locale === 'cs'}
					Náš tým je složen z nadšených vývojářů, designérů a
					pedagogů, kteří se snaží přinést inovace do vzdělávání.
					Společně pracujeme na tom, aby IDLGS bylo nejen funkční, ale
					také uživatelsky přívětivé a efektivní pro všechny
					uživatele.
				{:else if locale === 'pl'}
					Nasz zespół składa się z entuzjastycznych programistów,
					projektantów i pedagogów, którzy starają się wprowadzać
					innowacje w edukacji. Razem pracujemy nad tym, aby IDLGS
					było nie tylko funkcjonalne, ale także przyjazne dla
					użytkownika i efektywne dla wszystkich użytkowników.
				{:else}
					Our team consists of enthusiastic developers, designers, and
					educators who are passionate about bringing innovation to
					education. Together, we work to ensure that IDLGS is not
					only functional but also user-friendly and effective for all
					users.
				{/if}
			</p>
			<div class="flex w-full flex-col">
				<div
					class="flex w-full flex-row gap-2"
					in:fly|global={{ delay: 100, duration: 500, x: -100, y: 10, opacity: 0 }}
				>
					<TeamSvelte
						name={'Martin Bykov'}
						descriptionCS={'Zkušený softwarový inženýr, nadšenec do psychologie a hlavní projektový manažer.'}
						descriptionEN={'Avid software engineer, psychology entusiast and main project manager.'}
						descriptionPL={'Doświadczony inżynier oprogramowania, entuzjasta psychologii i główny menedżer projektu.'}
						{locale}
					/>
				</div>
				<div
					class="flex w-full flex-row gap-2"
					in:fly|global={{ delay: 600, duration: 500, x: -100, y: 10, opacity: 0 }}
				>
					<div class="grow"></div>
					<TeamSvelte
						name={'Ali Yunussov'}
						{locale}
						descriptionEN={'A skilled designer and front-end developer, responsible for the visual design and user experience of IDLGS.'}
						descriptionCS={'Zkušený designér a front-end vývojář, zodpovědný za vizuální design a uživatelskou zkušenost IDLGS.'}
						descriptionPL={'Doświadczony projektant i front-end developer, odpowiedzialny za wizualny design i doświadczenie użytkownika IDLGS.'}
					/>
				</div>
				<div
					class="flex w-full flex-row gap-2"
					in:fly|global={{ delay: 1100, duration: 500, x: -100, y: 10, opacity: 0 }}
				>
					<TeamSvelte
						name={'Kira Stepanova'}
						{locale}
						descriptionEN={'A passionate biologist and educator, dedicated to making science accessible and engaging for everyone.'}
						descriptionCS={'Nadšená bioložka a pedagožka, věnovaná tomu, aby věda byla přístupná a zajímavá pro všechny.'}
						descriptionPL={'Pasjonująca biolog i edukator, poświęcona temu, aby nauka była dostępna i angażująca dla wszystkich.'}
					/>
				</div>
			</div>
		</div>
	{/key}
{/if}
