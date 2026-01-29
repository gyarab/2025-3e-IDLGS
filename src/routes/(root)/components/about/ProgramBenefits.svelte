<script lang="ts">
	import {
		ABOUT_ANIMATION_FIRST,
		isInViewport,
		ABOUT_ANIMATION_SECOND,
	} from '$lib';
	import { m } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let element: HTMLDivElement | undefined = $state(undefined);
	let loaded = $state(false);

	onMount(() => {
		isInViewport(element as HTMLElement).then(() => (loaded = true));
	});
</script>

<div
	bind:this={element}
	class="flex min-h-[30svh] w-full flex-col gap-2 max-xl:w-9/10 xl:w-4/6"
>
	{#key loaded}
		<div class="flex max-xl:flex-col xl:flex-row gap-2">
			<h2
				in:fly|global={ABOUT_ANIMATION_FIRST}
				class="flex-nowrap text-6xl font-medium text-nowrap text-violet-800"
			>
				{m.onePlatform()}.
			</h2>
			<h2
				class="flex-nowrap text-6xl font-bold text-nowrap text-emerald-600"
				in:fly|global={ABOUT_ANIMATION_SECOND}
			>
				{m.millionPossibilities()}.
			</h2>
		</div>
		<div class="text-black">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus odio
			repellendus eius delectus maiores sequi, nulla obcaecati libero
			veritatis vero, distinctio pariatur aut nemo ab accusamus dolore
			esse ratione unde.
		</div>
	{/key}
</div>
