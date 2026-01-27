<script lang="ts">
	import WideCard from '$component/WideCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import Button from '$component/Button.svelte';
	import Form from '$component/Form.svelte';
	import Modal from '$component/Modal.svelte';

	let { data } = $props();

	let showAddModal: boolean = $state(false);
</script>

<svelte:head>
	<title>
		{m.definitionsOfTerms()} - {data.textbook.name} - {m.textbookNameShort()}
	</title>
</svelte:head>

<WideCard
	cssAddition="grow"
	r={data.textbook.red}
	g={data.textbook.green}
	b={data.textbook.blue}
>
	<div class="flex flex-row items-end gap-2">
		<h1>{data.textbook.name}</h1>
		<h2>{m.definitionsOfTerms()}</h2>
	</div>

	<div class="flex w-full grow flex-col gap-2">
		{#each data.definitions as definition}
			<p>{definition.word}: {definition.description}</p>
		{:else}
			{#if data.isEditor || data.isOwner}
				<div
					class="flex flex-col grow w-full items-center justify-center"
				>
					<span class="text-lg font-medium">
						{m.noDefinitionsInTextbookYet()}
					</span>
					<span class="opacity-70">
						{m.addADefinitionByClickingTheButtonBelow()}
					</span>
				</div>
			{:else}
				<div
					class="flex flex-col grow w-full items-center justify-center"
				>
					<span class="text-lg font-medium">
						{m.noDefinitionsAvailable()}
					</span>
				</div>
			{/if}
		{/each}
	</div>

	{#if data.isEditor || data.isOwner}
		<div class="grid grid-cols-2 gap-2">
			<Button
				btn="button-primary"
				emoji="add-circle"
				onclick={() => {
					showAddModal = true;
				}}
			>
				{m.addDefinition()}
			</Button>
			<Form action="?/clearDefinitions">
				<Button
					btn="button-red"
					emoji="delete-bin"
				>
					{m.clearDefinitions()}
				</Button>
			</Form>
		</div>
	{/if}
</WideCard>

<Modal
	bind:showModal={showAddModal}
	cssClass="standardModal"
>
	<h2>{m.addDefinition()}</h2>
</Modal>
