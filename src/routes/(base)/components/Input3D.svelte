<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	let {
		darkMode,
		color,
		css,
		value = $bindable(),
		required = true,
		loading = $bindable(false),
	}: {
		darkMode: boolean;
		color: string;
		css?: string;
		placeholder?: string;
		value: File;
		required?: boolean;
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
		<div class="flex h-full grow flex-col justify-center gap-2">
			<h2 class="text-left! text-base opacity-70">
				{#if value.size == 0}
					{m.select3DModel()}
				{:else}
					{m.modelSelected()}
				{/if}
			</h2>
		</div>
	</div>
	<input
		bind:this={inputElement}
		type="file"
		{required}
		class="hidden"
		tabindex="-1"
		accept=".model,.gltf,.glb,.fbx,.obj"
		onchange={async () => {
			if (inputElement!.files && inputElement!.files.length > 0) {
				value = new File(
					[await inputElement!.files[0].arrayBuffer()],
					inputElement!.files[0].name,
					{
						type: inputElement!.files[0].type,
					},
				);
			}
		}}
	/>
</button>
