<script lang="ts">
	import { getImageBackgroundClass } from '$lib';
	import type { UserType } from '$lib/types';
	import WordBackground from '../components/WordBackground.svelte';

	let { children, data } = $props();
</script>

<div
	class="z-10 relative flex w-full grow flex-col items-center justify-center min-w-screen {getImageBackgroundClass(
		data.user as UserType,
	)} max-xl:hidden"
>
	{#if data.user?.background === 0}
		<WordBackground />
	{:else}
		<!-- cover -->
		<div class="absolute z-2! h-full w-full bg-violet-800/60"></div>
	{/if}

	{@render children?.()}
</div>
