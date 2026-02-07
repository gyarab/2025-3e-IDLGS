<script lang="ts">
	import WideCard from '$component/WideCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import Button from '$component/Button.svelte';
	import Form from '$component/Form.svelte';
	import Modal from '$component/Modal.svelte';
	import TextInput from '$component/TextInput.svelte';
	import SuccessBox from '$src/routes/(root)/components/SuccessBox.svelte';
	import AlertBox from '$src/routes/(root)/components/AlertBox.svelte';
	import Definition from './components/Definition.svelte';

	let { data } = $props();

	let showAddModal: boolean = $state(false);

	let successMessage: string = $state('');
	let alertMessage: string = $state('');
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
		{#each data.definitions as definition (definition.id)}
			<Definition
				{definition}
				bind:successMessage
				bind:alertMessage
			/>
		{:else}
			{#if data.isEditor || data.isOwner}
				<div
					class="flex flex-col grow w-full items-center justify-center"
				>
					<span class="text-lg font-medium">
						{m.noDefinitionsInTextbookYet()}
					</span>
					<span class="opacity-80">
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
				type="button"
			>
				{m.addDefinition()}
			</Button>
			<Form
				action="?/clearDefinitions"
				success={async () => {
					successMessage = m.allDefinitionsRemovedSuccessfully();
				}}
				failure={async () => {
					alertMessage = m.couldNotRemoveDefinitions();
				}}
			>
				<Button
					btn="button-red"
					emoji="delete-bin"
					type="submit"
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
	maxHeight={false}
	maxWidth={true}
>
	<Form
		cssClass="flex w-full flex-col gap-2"
		action="?/addDefinition"
		success={async () => {
			successMessage = m.definitionAddedSuccessfully();
		}}
		failure={async () => {
			alertMessage = m.couldNotAddDefinition();
		}}
		final={async () => {
			showAddModal = false;
		}}
	>
		<h2>{m.addDefinition()}</h2>

		<div
			class="flex w-full grow flex-col items-center justify-center gap-2"
		>
			<TextInput
				name="term"
				label={m.term()}
				placeholder={m.enterTerm()}
			/>
			<TextInput
				name="definition"
				label={m.definition()}
				placeholder={m.enterDefinition()}
			/>
		</div>

		<div class="grid w-full grid-cols-2 gap-2">
			<Button
				type="submit"
				btn="button-primary"
				emoji="add-circle"
			>
				{m.addDefinition()}
			</Button>
			<Button
				btn="button-red"
				emoji="close-circle"
				type="button"
				onclick={() => {
					showAddModal = false;
				}}
			>
				{m.cancel()}
			</Button>
		</div>
	</Form>
</Modal>

<SuccessBox bind:message={successMessage} />
<AlertBox bind:message={alertMessage} />
