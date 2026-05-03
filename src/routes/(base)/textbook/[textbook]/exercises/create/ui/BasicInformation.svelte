<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import ImageInput from '$src/routes/(base)/components/ImageInput.svelte';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { makeURLFromImage } from '$lib';

	let {
		stage = $bindable(1),
		darkMode,
		color,
		name = $bindable(''),
		description = $bindable(''),
		thumbnail = $bindable([]),
	}: {
		stage: number;
		darkMode: boolean;
		color: string;
		name: string;
		description: string;
		thumbnail: File[];
	} = $props();

	let imagePreview: string = $derived(makeURLFromImage(thumbnail[0]));

	onDestroy(() => {
		URL.revokeObjectURL(imagePreview);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.basicExerciseInformation()}</h2>
	</div>

	<span in:fly={{ x: 1000, y: 0, duration: 300, delay: 300, opacity: 0 }}>
		<TextInput
			bind:value={name}
			{darkMode}
			{color}
			css="w-1/2"
			placeholder={m.enterExerciseName()}
		/>
	</span>

	<span
		class="flex max-h-1/4 grow flex-col"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 500, opacity: 0 }}
	>
		<TextArea
			bind:value={description}
			css="grow"
			{color}
			{darkMode}
			placeholder={m.enterExerciseDescription()}
		/>
	</span>

	<span
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 700, opacity: 0 }}
		class="flex w-full flex-col gap-2"
	>
		<ImageInput
			bind:value={thumbnail}
			multiple={false}
			{darkMode}
			{color}
			css="w-1/2"
			placeholder={m.uploadThumbnail()}
		/>
		{#if thumbnail && thumbnail.length > 0}
			<h2>{m.thumbnailPreview()}</h2>
			<img
				src={imagePreview}
				alt={m.thumbnailPreview()}
				class="aspect-2/1 w-[50svh] rounded-lg object-cover"
			/>
		{/if}
	</span>

	<div class="grow max-lg:hidden"></div>
</div>
