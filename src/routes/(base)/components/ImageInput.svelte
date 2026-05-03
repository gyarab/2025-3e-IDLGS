<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { files } from '$lib/plural';

	let {
		darkMode,
		color,
		css,
		placeholder,
		value = $bindable(),
		required = true,
		multiple = false,
		loading = $bindable(false),
	}: {
		darkMode: boolean;
		color: string;
		css?: string;
		placeholder: string;
		value: File[];
		resizable?: boolean;
		required?: boolean;
		multiple?: boolean;
		loading?: boolean;
	} = $props();

	let buttonElement: HTMLButtonElement | undefined = $state(undefined);
	let inputElement: HTMLInputElement | undefined = $state(undefined);
</script>

<button
	bind:this={buttonElement}
	class="group overflow-hidden! rounded-lg! {css} flex w-fit flex-col hover:translate-0 hover:brightness-100"
	onclick={() => inputElement!.click()}
>
	<div
		class="flex flex-row items-center justify-center gap-2 border-0 border-b-2 {darkMode
			? 'bg-neutral-700 text-white! placeholder:text-white!'
			: 'bg-neutral-100 text-black! placeholder:text-black!'} p-2"
		style="border-color: {color};"
	>
		<i
			class="ri-upload-line text-5xl font-bold transition-all duration-300 group-hover:-translate-y-1"
		></i>
		<div
			class="flex h-full grow flex-col gap-2 justify-center"
		>
			<h2 class="text-base opacity-70 text-left!">
				{#if value.length == 0}
					{#if placeholder.length == 0}
						{m.uploadFile()}
					{:else}
						{placeholder}
					{/if}
				{:else}
					{value.length} {files(value.length)} {m.uploaded()}
				{/if}
			</h2>
		</div>
	</div>
	<input
		bind:this={inputElement}
		type="file"
		{required}
		{multiple}
		class="hidden"
		tabindex="-1"
		accept="image/*"
		onchange={async () => {
			if (inputElement!.files && inputElement!.files.length > 0) {
				let arr = [];
				for (const file of inputElement!.files) {
					arr.push(
						new File([await file.arrayBuffer()], file.name, {
							type: file.type,
						}),
					);
				}
				value = arr;
			}
		}}
	/>
</button>
