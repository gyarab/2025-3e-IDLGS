<script lang="ts">
	import { IFRAME_TIMEOUT } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import LoadingAnimationHandler from '$src/routes/(base)/components/loading/LoadingAnimationHandler.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { untrack } from 'svelte';
	import { fly } from 'svelte/transition';

	let {
		color,
		darkMode,
		extUrl = $bindable(''),
		name,
	}: {
		color: string;
		darkMode: boolean;
		extUrl: string;
		name: string;
	} = $props();

	let iframeElement: HTMLIFrameElement | undefined = $state();
	let error = $derived(extUrl.length <= 3);

	$effect(() => {
		if(extUrl.length <= 3) return;
		untrack(() => {
			window.setTimeout(() => {
				if(loading) error = true;
			}, IFRAME_TIMEOUT);
		})
	});
	let loading = $derived(extUrl.length > 3);
</script>

<div class="flex w-full grow flex-col overflow-x-hidden overflow-y-scroll">
	<div
		class="mb-2 flex w-full flex-row"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.externalEmbeddedExercise()}</h2>
	</div>
	<div class="flex w-full grow flex-col">
		<div class="flex flex-col gap-2">
			<TextInput
				placeholder={m.urlOfExercise()}
				bind:value={extUrl}
				{darkMode}
				{color}
			/>
		</div>
		{#if extUrl.length <= 3}
			<div
				class="flex grow flex-col items-center justify-center gap-2 italic opacity-50 {darkMode
					? 'text-white'
					: 'text-black'}"
			>
				<p>{m.enterUrlOfTheExerciseYouWishToEmbed()}</p>
			</div>
		{:else if error}
			<div
				class="flex grow flex-col items-center justify-center gap-2 italic opacity-50 {darkMode
					? 'text-white'
					: 'text-black'}"
			>
				<p>{m.embedNotFound()}</p>
			</div>
		{:else}
			<iframe
				bind:this={iframeElement}
				title={name}
				class="w-full rounded-lg {loading
					? 'h-0 opacity-0'
					: 'grow opacity-100'} transition-opacity duration-300"
				src="https://{extUrl}"
				onload={() => {
					loading = false;
				}}
			></iframe>
			{#if loading}
				<LoadingAnimationHandler {color} />
			{/if}
		{/if}
	</div>
</div>
