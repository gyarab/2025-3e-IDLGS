<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
	import LoadingAnimationHandler from './LoadingAnimationHandler.svelte';

	let {
		children,
		cssClass,
		loading = $bindable(false),
		reset = false,
		invalidateAll = true,
		start = async () => {},
		success = async () => {},
		failure = async () => {},
		final = async () => {},
		action,
		smallLoadAnimation = false,
	}: {
		children: Snippet;
		cssClass?: string;
		loading?: boolean;
		reset?: boolean;
		invalidateAll?: boolean;
		start?: () => Promise<void>;
		success?: (data: unknown) => Promise<void>;
		failure?: (data: unknown) => Promise<void>;
		final?: () => Promise<void>;
		action: string;
		smallLoadAnimation?: boolean;
	} = $props();
</script>

<form
	method="POST"
	use:enhance={async () => {
		loading = true;
		await start();
		return async ({ update, result }) => {
			await update({ reset: reset, invalidateAll: invalidateAll });

			if (result.type == 'success') {
				await success(result.data);
			} else if (result.type == 'failure') {
				await failure(result.data);
			}

			await final();

			loading = false;
		};
	}}
	enctype="multipart/form-data"
	class={cssClass ? cssClass : 'flex w-full grow flex-col gap-2'}
	{action}
>
	{#if loading}
		<LoadingAnimationHandler
			text={!smallLoadAnimation}
			smallerBubbles={smallLoadAnimation}
		/>
	{:else}
		{@render children()}
	{/if}
</form>
