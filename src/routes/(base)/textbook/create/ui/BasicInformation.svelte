<script lang="ts">
	import { alphaColor, makeURLFromImage, sanitizeColor } from '$lib';
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
		thumbnailUrl = undefined,
	}: {
		darkMode: boolean;
		name: string;
		description: string;
		color: string;
		education: string;
		thumbnail: File[];
		thumbnailUrl?: string | null;
	} = $props();

	const uiColor = $derived(sanitizeColor(color, 45));
	let imagePreview: string = $derived(
		thumbnail?.[0] ? makeURLFromImage(thumbnail[0]) : (thumbnailUrl ?? ''),
	);

	onDestroy(() => {
		if (imagePreview) URL.revokeObjectURL(imagePreview);
	});
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row items-center gap-2"
		in:fly|global={{ x: 300, y: 0, duration: 300, delay: 200, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.basicInformation()}</h2>
	</div>
	<div class="flex w-full grow flex-col gap-2">
		<span
			in:fly|global={{
				x: 300,
				y: 0,
				duration: 300,
				delay: 400,
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
				x: 300,
				y: 0,
				duration: 300,
				delay: 500,
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
				x: 300,
				y: 0,
				duration: 300,
				delay: 600,
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
				// style="background-color: {alphaColor(uiColor, 20)};"
				css="buttonPrimary text-sm rounded-xl"
				// selectedcss={darkMode ? 'text-black' : 'text-white'}
				selectedstyle="background-color: {alphaColor(
					uiColor,
					darkMode ? 70 : 60,
				)};"
			/>
		</span>

		<span class="flex flex-col gap-2 py-2 md:flex-row">
			<span
				class="w-full md:w-1/2 lg:w-1/3"
				in:fly|global={{
					x: 300,
					y: 0,
					duration: 300,
					delay: 700,
					opacity: 0,
				}}
			>
				<ColorInput bind:color />
			</span>

			<span
				in:fly|global={{
					x: 300,
					y: 0,
					duration: 300,
					delay: 800,
					opacity: 0,
				}}
				class="flex flex-col gap-2"
			>
				<div class="flex w-full flex-row items-center gap-2">
					<ImageInput
						bind:value={thumbnail}
						required={true}
						multiple={false}
						{darkMode}
						{color}
						placeholder={m.uploadThumbnail()}
					/>
					{#if imagePreview && thumbnailUrl}
						<a
							href={thumbnailUrl}
							target="_blank"
							class="group flex w-fit flex-col overflow-hidden! rounded-lg! hover:translate-0 hover:brightness-100"
							aria-label={m.download() + ' ' + m.thumbnail()}
						>
							<div
								class="flex flex-row items-center justify-center gap-2 border-0 border-b-2 {darkMode
									? 'bg-neutral-700 text-white!'
									: 'bg-neutral-100 text-black!'} px-1.5 py-1 sm:p-2"
								style="border-color: {color};"
							>
								<i
									class="ri-download-line text-4xl font-bold transition-all duration-300 group-hover:-translate-y-1"
								></i>
								<h2
									class="hidden text-left! text-base opacity-70"
								>
									{m.download()}
								</h2>
							</div>
						</a>
					{/if}
				</div>
				{#if imagePreview}
					<h2>{m.thumbnailPreview()}</h2>
					<img
						src={imagePreview}
						alt={m.thumbnailPreview()}
						class="aspect-2/1 w-[40svh] rounded-lg border border-neutral-400/40 object-cover"
					/>
				{/if}
			</span>
		</span>
	</div>
</div>
