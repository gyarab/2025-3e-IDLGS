<script lang="ts">
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import ColorInput from '$src/routes/(base)/components/ColorInput.svelte';
	import SelectionBtnList from '$src/routes/(base)/components/SelectionBtnList.svelte';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { fly } from 'svelte/transition';
	import ImageInput from '$src/routes/(base)/components/ImageInput.svelte';
	import { onDestroy } from 'svelte';

	let {
		darkMode,
		name = $bindable(''),
		description = $bindable(''),
		color = $bindable(''),
		education = $bindable(''),
		thumbnail = $bindable([]),
	}: {
		darkMode: boolean;
		name: string;
		description: string;
		color: string;
		education: string;
		thumbnail: Uint8Array[];
	} = $props();

	let imagePreview: string = $derived.by(() => {
		return URL.createObjectURL(new Blob([thumbnail[0].buffer as BlobPart], { type: 'image/*' }));
	});

	onDestroy(() => {
		URL.revokeObjectURL(imagePreview);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row items-center gap-2"
		in:fly|global={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.basicTextbookInformation()}</h2>
	</div>
	<div class="flex w-full grow flex-col gap-2">
		<span
			in:fly|global={{
				x: 1000,
				y: 0,
				duration: 300,
				delay: 300,
				opacity: 0,
			}}
		>
			<TextInput
				{darkMode}
				{color}
				type="text"
				placeholder={m.textbookName()}
				bind:value={name}
			/>
		</span>

		<span
			class="flex w-full grow flex-col"
			in:fly|global={{
				x: 1000,
				y: 0,
				duration: 300,
				delay: 700,
				opacity: 0,
			}}
		>
			<TextArea
				{darkMode}
				{color}
				placeholder={m.textbookDescription()}
				bind:value={description}
				css="grow"
			/>
		</span>

		<span
			in:fly|global={{
				x: 1000,
				y: 0,
				duration: 300,
				delay: 500,
				opacity: 0,
			}}
		>
			<h4 class="py-1 font-medium">{m.educationLevel()}</h4>
			<SelectionBtnList
				texts={[
					m.isced0(),
					m.isced1(),
					m.isced2(),
					m.isced3(),
					m.isced4(),
					m.isced5(),
					m.isced6(),
					m.isced7(),
					m.isced8(),
				]}
				values={['0', '1', '2', '3', '4', '5', '6', '7', '8']}
				bind:value={education}
				style="background-color: {color};"
				css="buttonPrimary text-sm rounded-xl"
				selectedstyle="background-color: {darkenHex(color, 50)};"
			/>
		</span>

		<span
			in:fly|global={{
				x: 1000,
				y: 0,
				duration: 300,
				delay: 900,
				opacity: 0,
			}}
		>
			<ColorInput bind:color />
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
					class="h-32 w-32 rounded-lg object-cover"
				/>
			{/if}
		</span>
	</div>
</div>
