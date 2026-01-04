<script lang="ts">
	import type { UserType } from '$lib/types';
	import type { Snippet } from 'svelte';
	import WordBackground from '../components/WordBackground.svelte';

	let {
		data,
		children,
	}: {
		data: {
			user: UserType;
		};
		children: Snippet;
	} = $props();
</script>

<div
	data-sveltekit-reload
	class="relative z-10 flex w-full min-w-screen grow flex-col items-center justify-center max-xl:hidden"
>
	<WordBackground />

	<div class="z-3 flex w-full grow flex-col">
		{@render children?.()}
	</div>
</div>
