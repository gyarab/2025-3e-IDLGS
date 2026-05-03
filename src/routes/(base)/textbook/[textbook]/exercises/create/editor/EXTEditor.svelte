<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
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

	let error = $derived(extUrl.length > 3);
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
		{#if extUrl.length === 0}
			<div
				class="flex grow flex-col items-center justify-center gap-2 italic opacity-50 {darkMode
					? 'text-white'
					: 'text-black'}"
			>
				<p>{m.enterUrlOfTheExerciseYouWishToEmbed()}</p>
			</div>
		{:else if error}
			<div
				class="* flex grow flex-col items-center justify-center gap-2 rounded-lg p-4 text-center italic opacity-50 {darkMode
					? 'text-white'
					: 'text-black'}"
			>
				<p>{m.embedNotFound()}</p>
			</div>
		{:else}
			<iframe
				title={name}
				src={extUrl}
				class="w-full grow rounded-lg"
				onerror={() => {
					error = true;
				}}
			></iframe>
		{/if}
	</div>
</div>
