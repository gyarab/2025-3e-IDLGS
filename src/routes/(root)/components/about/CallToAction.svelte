<script lang="ts">
	import { ABOUT_ANIMATION_FIRST, isInViewport, ABOUT_ANIMATION_SECOND } from '$lib';
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
		<div class="flex flex-row gap-2">
			<h2
				in:fly|global={ABOUT_ANIMATION_FIRST}
				class="flex-nowrap text-6xl font-medium text-nowrap text-violet-700"
			>
				{m.doesItSoundGood()}
			</h2>
			<h2
				in:fly|global={ABOUT_ANIMATION_SECOND}
				class="flex-nowrap text-6xl font-bold text-nowrap text-emerald-500"
			>
				{m.registerForADemo()}.
			</h2>
		</div>
	{/key}
</div>
