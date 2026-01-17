<script lang="ts">
	/* ADMIN PAGE */

	import { getImageBackgroundClass } from '$lib';
	import type { UserType } from '$lib/types';
	import WordBackground from '../components/WordBackground.svelte';

	let { children, data } = $props();
</script>

<div
	class="relative z-10 flex w-full min-w-screen grow flex-col items-center justify-center {getImageBackgroundClass(
		data.user as UserType,
	)} max-xl:hidden"
>
	{#if data.user?.background === 0}
		<WordBackground />
	{:else}
		<!-- cover -->
		<div class="absolute z-2! h-full w-full bg-violet-900/60"></div>
	{/if}

	<div class="z-3 flex w-full grow flex-col">
		{@render children?.()}
	</div>
</div>
