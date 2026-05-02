<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
	import LoadingAnimationHandler from './loading/LoadingAnimationHandler.svelte';

	let {
		target,
		children,
		css,
		darkMode,
		loading = $bindable(false),
		reset = false,
		invalidateAll = true,
		start = async () => {},
		success = async () => {},
		failure = async () => {},
		final = async () => {},
		element = $bindable(),
	}: {
		target: string;
		children: Snippet;
		css?: string;
		darkMode: boolean;
		start?: () => Promise<void>;
		success?: (data: unknown) => Promise<void>;
		failure?: (data: unknown) => Promise<void>;
		final?: () => Promise<void>;
		loading?: boolean;
		reset?: boolean;
		invalidateAll?: boolean;
		element?: HTMLFormElement;
	} = $props();
</script>

<form
	bind:this={element}
	method="POST"
	enctype="multipart/form-data"
	class="{css} flex w-full flex-col gap-2 rounded-xl p-4 shadow-lg {darkMode
		? 'bg-neutral-800 text-white'
		: 'bg-neutral-100 text-black'}"
	action={target}
	use:enhance={async () => {
		loading = true;
		await start();
		return async ({ update, result }) => {
			await update({ reset: reset, invalidateAll: invalidateAll });

			if (result.type == 'success') await success(result.data);
			else if (result.type == 'failure') await failure(result.data);

			await final();

			loading = false;
		};
	}}
>
	{#if loading}
		<LoadingAnimationHandler />
	{:else}
		{@render children()}
	{/if}
</form>
