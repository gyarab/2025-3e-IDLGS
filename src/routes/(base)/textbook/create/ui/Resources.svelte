<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import ConfirmCancel from '$src/routes/(base)/components/ConfirmCancel.svelte';
	import ConfirmDeleteDialog from '$src/routes/(base)/components/ConfirmDeleteDialog.svelte';
	import Dialog from '$src/routes/(base)/components/Dialog.svelte';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { fly } from 'svelte/transition';
	import ResourceItem from './components/ResourceItem.svelte';
	import ImageInput from '$src/routes/(base)/components/ImageInput.svelte';

	let {
		darkMode,
		color,
		resources = $bindable([]),
	}: {
		darkMode: boolean;
		color: string;
		resources: {
			title: string;
			url?: string;
			description?: string;
			id?: string;
			order?: number;
		}[];
	} = $props();

	let showAddResourceDialog = $state(false);
	let showEditResourceDialog = $state(false);
	let showRemoveResourceDialog = $state(false);

	let selectedResourceIndex: number | undefined = $state(undefined);
	let tempResource = $state({
		title: '',
		url: '',
		description: '',
		imageData: '',
	});

	let addImageFiles: File[] = $state([]);
	let editImageFiles: File[] = $state([]);

	const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(:\d+)?(\/\S*)?$/i;

	const isValidUrl = (u: string) => {
		if (!u) return false;
		return urlRegex.test(u.trim());
	};

	const readFileAsDataUrl = (file: File) =>
		new Promise<string>((resolve, reject) => {
			const fr = new FileReader();
			fr.onload = () => resolve(String(fr.result));
			fr.onerror = reject;
			fr.readAsDataURL(file);
		});

	const openExternal = (url?: string) => {
		if (!url) return;
		const norm = url.match(/^https?:\/\//i) ? url : `https://${url}`;
		window.open(norm, '_blank', 'noopener');
	};

	const openAdd = () => {
		tempResource = { title: '', url: '', description: '', imageData: '' };
		addImageFiles = [];
		showAddResourceDialog = true;
	};

	const openEdit = (i: number) => {
		selectedResourceIndex = i;
		tempResource = { ...resources[i] };
		editImageFiles = [];
		showEditResourceDialog = true;
	};

	const openRemove = (i: number) => {
		selectedResourceIndex = i;
		showRemoveResourceDialog = true;
	};
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-col items-center gap-2 sm:flex-row"
		in:fly={{ x: 300, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.textbookResources()}</h2>
		<p>{m.textbookResourcesDescription()}</p>
	</div>
	<!-- <div class="flex w-full grow flex-col gap-2"></div> -->
	<div
		class="flex w-full flex-row gap-1 sm:gap-2"
		in:fly={{ x: 300, y: 0, duration: 300, delay: 200, opacity: 0 }}
	>
		<Button
			text={m.addResource()}
			emoji="add"
			type="button"
			onclick={() => openAdd()}
			css="buttonPrimary grow bg-green-400/70 hover:translate-0!"
			txtcss="hidden md:inline"
		/>
		<Button
			text={m.deleteResource()}
			emoji="close"
			type="button"
			onclick={() =>
				selectedResourceIndex != undefined
					? openRemove(selectedResourceIndex)
					: null}
			css="buttonPrimary grow bg-red-400/80 hover:translate-0!"
			txtcss="hidden md:inline"
		/>
	</div>

	<div class="mt-2">
		{#if resources.length > 0}
			<ul class="flex flex-col gap-2">
				{#each resources as r, i (r.id ?? i)}
					<li>
						<ResourceItem
							resource={r}
							{darkMode}
							{i}
							amount={resources.length}
							{color}
							selected={selectedResourceIndex === i}
							onclick={() => {
								selectedResourceIndex = i;
							}}
							onedit={() => openEdit(i)}
							onremove={() => openRemove(i)}
						/>
						<div class="mt-1 flex gap-1">
							{#if r.url}
								<button
									type="button"
									class="text-sm text-blue-500 underline"
									onclick={() => openExternal(r.url)}
								>
									{m.open()}
								</button>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="italic opacity-70">
				{m.noResourcesSoFar()}
			</div>
		{/if}
	</div>
</div>

<Dialog
	bind:open={showAddResourceDialog}
	{darkMode}
	css="min-h-0! min-w-1/4!"
>
	<div class="flex w-full grow flex-col gap-2">
		<h1>{m.addResource()}</h1>
		<TextInput
			placeholder={m.title()}
			bind:value={tempResource.title}
			{darkMode}
			{color}
		/>
		<TextInput
			placeholder="URL"
			bind:value={tempResource.url}
			{darkMode}
			{color}
		/>
		<TextArea
			placeholder={m.description()}
			bind:value={tempResource.description}
			{darkMode}
			{color}
		/>
		<div class="flex flex-row items-center gap-2">
			<ImageInput
				{darkMode}
				{color}
				placeholder={m.uploadFile ? m.uploadFile() : 'Upload image'}
				bind:value={addImageFiles}
			/>
			{#if tempResource.imageData}
				<img
					src={tempResource.imageData}
					class="h-12 w-12 rounded object-cover"
				/>
			{/if}
		</div>
		<ConfirmCancel
			{color}
			bind:open={showAddResourceDialog}
			confirm={async () => {
				const entry = {
					...tempResource,
					id: Date.now().toString(),
					order: resources.at(-1)?.order
						? resources.at(-1).order + 1
						: resources.length,
				};
				if (entry.url && !isValidUrl(entry.url)) {
					if (/^[\w-]+(\.[\w-]+)+/.test(entry.url))
						entry.url = 'https://' + entry.url;
					else {
						alert('Invalid URL');
						return;
					}
				}
				resources.push(entry);
			}}
			cancel={async () => {}}
			disabled={tempResource.title.trim() === ''}
		/>
	</div>
</Dialog>

<Dialog
	bind:open={showEditResourceDialog}
	{darkMode}
	css="min-h-0! min-w-1/2!"
>
	<div class="flex w-full grow flex-col gap-2">
		<h1>{m.editResource ? m.editResource() : 'Edit resource'}</h1>
		<TextInput
			placeholder={m.resourceTitle()}
			bind:value={tempResource.title}
			{darkMode}
			{color}
		/>
		<TextInput
			placeholder={m.resource() + ' URL'}
			bind:value={tempResource.url}
			{darkMode}
			{color}
		/>
		<TextArea
			placeholder={m.resource() + ' ' + m.description()}
			bind:value={tempResource.description}
			{darkMode}
			{color}
		/>
		<div class="flex flex-row items-center gap-2">
			<ImageInput
				{darkMode}
				{color}
				placeholder={m.uploadFile()}
				bind:value={editImageFiles}
			/>
			{#if tempResource.imageData}
				<img
					src={tempResource.imageData}
					alt="preview"
					class="h-12 w-12 rounded object-cover"
				/>
			{/if}
		</div>
		<ConfirmCancel
			{color}
			bind:open={showEditResourceDialog}
			confirm={async () => {
				if (selectedResourceIndex != undefined) {
					const entry = {
						...resources[selectedResourceIndex],
						...tempResource,
					};
					if (entry.url && !isValidUrl(entry.url)) {
						if (/^[\w-]+(\.[\w-]+)+/.test(entry.url))
							entry.url = 'https://' + entry.url;
						else alert('Invalid URL');
					}
					resources[selectedResourceIndex] = entry;
				}
			}}
			cancel={async () => {}}
			disabled={tempResource.title.trim() === ''}
		/>
	</div>
</Dialog>

<ConfirmDeleteDialog
	bind:open={showRemoveResourceDialog}
	{darkMode}
	{color}
	confirm={async () => {
		if (selectedResourceIndex != undefined) {
			resources.splice(selectedResourceIndex, 1);
			selectedResourceIndex = undefined;
		}
	}}
	cancel={async () => {
		selectedResourceIndex = undefined;
	}}
/>
