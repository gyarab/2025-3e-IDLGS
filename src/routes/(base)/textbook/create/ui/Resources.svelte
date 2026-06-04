<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import ConfirmDeleteDialog from '$src/routes/(base)/components/ConfirmDeleteDialog.svelte';
	import Dialog from '$src/routes/(base)/components/Dialog.svelte';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { fly } from 'svelte/transition';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();

	let showAddResourceDialog = $state(false);
	let showEditResourceDialog = $state(false);
	let showRemoveResourceDialog = $state(false);
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-col items-center gap-2 sm:flex-row"
		in:fly={{ x: 300, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.textbookResources()}</h2>
		<p>{m.textbookResourcesDescription()}</p>
	</div>
	<div class="flex w-full grow flex-col gap-2"></div>
	<div
		class="flex w-full flex-row gap-1 sm:gap-2"
		in:fly={{ x: 300, y: 0, duration: 300, delay: 200, opacity: 0 }}
	>
		<Button
			text={m.addResource()}
			emoji="file-add"
			type="button"
			onclick={() => {}}
			css="buttonPrimary grow bg-green-400/70 hover:translate-0!"
			txtcss="hidden sm:inline"
		/>
		<Button
			text={m.editResource()}
			emoji="file-edit"
			type="button"
			onclick={() => {}}
			css="buttonPrimary grow bg-yellow-400/60 hover:translate-0!"
			txtcss="hidden sm:inline"
		/>
		<Button
			text={m.deleteResource()}
			emoji="file-reduce"
			type="button"
			onclick={() => {}}
			css="buttonPrimary grow bg-red-400/80 hover:translate-0!"
			txtcss="hidden sm:inline"
		/>
	</div>
</div>

<Dialog
	bind:open={showAddResourceDialog}
	{darkMode}
	css="min-h-0! min-w-1/4!"
>
	<div class="flex w-full grow flex-col"></div>
</Dialog>

<Dialog
	bind:open={showEditResourceDialog}
	{darkMode}
	css="min-h-0! min-w-1/4!"
>
	<div class="flex w-full grow flex-col"></div>
</Dialog>

<ConfirmDeleteDialog
	bind:open={showRemoveResourceDialog}
	{darkMode}
	{color}
	confirm={async () => {}}
	cancel={async () => {}}
/>
