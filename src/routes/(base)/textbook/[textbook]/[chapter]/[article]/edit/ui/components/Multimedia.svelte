<script lang="ts">
	import ToolbarButton from './ToolbarButton.svelte';
	import { m } from '$lib/paraglide/messages';
	import Dialog from '$src/routes/(base)/components/Dialog.svelte';
	import ImageInput from '$src/routes/(base)/components/ImageInput.svelte';
	import VideoInput from '$src/routes/(base)/components/VideoInput.svelte';
	import Input3D from '$src/routes/(base)/components/Input3D.svelte';

	let {
		darkMode,
		color,
		articleText = $bindable(''),
		selectionStart = $bindable(0),
		selectionEnd = $bindable(0),
		advanced = $bindable(false),
	}: {
		darkMode: boolean;
		color: string;
		articleText: string;
		selectionStart: number;
		selectionEnd: number;
		advanced: boolean;
	} = $props();

	let showImageDialog = $state(false);
	let showLinkDialog = $state(false);
	let showVideoDialog = $state(false);
	let showModelDialog = $state(false);
	let showDocumentDialog = $state(false);

	let fileValue: File = $state(new File([], ''));
</script>

<div class="flex flex-row items-center gap-1">
	<ToolbarButton
		emoji="file-image-line"
		label={m.image()}
		onclick={() => { showImageDialog = true; }}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="link"
		label={m.embed()}
		onclick={() => { showLinkDialog = true; }}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="file-video-line"
		label={m.video()}
		onclick={() => { showVideoDialog = true; }}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="box-3-line"
		label={m.model3d()}
		onclick={() => { showModelDialog = true; }}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="file-line"
		label={m.document()}
		onclick={() => { showDocumentDialog = true; }}
		{darkMode}
		{color}
	/>
	<ToolbarButton
		emoji="formula"
		label={m.formula()}
		onclick={() => { }}
		{darkMode}
		{color}
	/>
</div>

<Dialog
	bind:open={showImageDialog}
	{darkMode}
>
	<div class="flex h-1/4 w-1/2 flex-col items-center justify-center gap-4">
		<h2 class="text-2xl">{m.image()}</h2>
		<ImageInput
			{darkMode}
			{color}
		/>
	</div>
</Dialog>

<Dialog
	bind:open={showVideoDialog}
	{darkMode}
>
	<div class="flex h-1/4 w-1/2 flex-col items-center justify-center gap-4">
		<h2 class="text-2xl">{m.video()}</h2>
		<VideoInput
			{darkMode}
			{color}
		/>
	</div>
</Dialog>

<Dialog
	bind:open={showModelDialog}
	{darkMode}
>
	<div class="flex h-1/4 w-1/2 flex-col items-center justify-center gap-4">
		<h2 class="text-2xl">{m.model3d()}</h2>
		<Input3D
			{darkMode}
			{color}
		bind:value={fileValue}
		/>

		<model-viewer alt="T3" src="/T3.glb" ar environment-image="" poster="T3.webp" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
	</div>
</Dialog>

<Dialog
	bind:open={showDocumentDialog}
	{darkMode}
>
	<div class="flex h-1/4 w-1/2 flex-col items-center justify-center gap-4">
		<h2 class="text-2xl">{m.document()}</h2>
	</div>
</Dialog>