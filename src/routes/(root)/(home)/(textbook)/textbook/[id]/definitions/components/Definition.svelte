<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import type { TextbookDefinitionType } from '$lib/types';
	import Button from '$component/Button.svelte';
	import Form from '$component/Form.svelte';
	import Modal from '$component/Modal.svelte';
	import WideCard from '$component/WideCard.svelte';
	import TextInput from '$component/TextInput.svelte';
	import HiddenInput from '$component/HiddenInput.svelte';

	let {
		definition,
		successMessage = $bindable(''),
		alertMessage = $bindable(''),
		highlighted = false,
	}: {
		definition: TextbookDefinitionType;
		successMessage: string;
		alertMessage: string;
		highlighted?: boolean;
	} = $props();

	let edit = $state(false);
</script>

<WideCard
	cssOverride="
		flex flex-row w-full items-center gap-0 p-0! rounded-lg
		{highlighted ? 'bg-yellow-500/70 border-yellow-500 ' : ''}
	"
	cssParentOverride="border-0!"
>
	<Form
		action={`/textbook/${page.params.id}/definitions/?/deleteDefinition`}
		cssClass="flex w-full flex-row gap-0 p-0!"
		smallLoadAnimation={true}
	>
		<div class="flex grow flex-row items-center gap-2 p-4 pe-0">
			<input
				type="hidden"
				name="uuid"
				value={definition.uuid}
			/>
			<span class="text-lg font-medium">
				{definition.word}
			</span>

			<span class="">
				{definition.description}
			</span>

			<div class="grow"></div>
		</div>
		<Button
			btn=""
			type="button"
			cssClass="bg-green-600/70 hover:bg-green-800/70 text-white p-4 rounded-none"
			label={m.editDefinition()}
			onclick={() => {
				edit = true;
			}}
		>
			<i class="ri-pencil-line"></i>
		</Button>
		<Button
			cssClass="bg-red-900/70 hover:bg-red-600/70 text-white p-4 rounded-s-none"
			btn=""
			type="submit"
			label={m.deleteDefinition()}
		>
			<i class="ri-delete-bin-line"></i>
		</Button>
	</Form>
</WideCard>

<Modal
	bind:showModal={edit}
	cssClass="standardModal"
	maxHeight={false}
	maxWidth={true}
>
	<Form
		cssClass="flex flex-col gap-2 w-full"
		action={`/textbook/${page.params.id}/definitions/?/editDefinition`}
		success={async () => {
			successMessage = m.definitionUpdatedSuccessfully();
			edit = false;
		}}
		failure={async () => {
			alertMessage = m.couldNotUpdateDefinition();
		}}
	>
		<HiddenInput
			name="uuid"
			value={definition.uuid}
		/>

		<h2>{m.editDefinition()}</h2>

		<div
			class="flex w-full grow flex-col items-center justify-center gap-2"
		>
			<TextInput
				name="term"
				label={m.term()}
				placeholder={m.enterTerm()}
				value={definition.word}
			/>
			<TextInput
				name="definition"
				label={m.definition()}
				placeholder={m.enterDefinition()}
				value={definition.description}
			/>
		</div>

		<div class="grid w-full grid-cols-2 gap-2">
			<Button
				type="submit"
				btn="button-blue"
				emoji="edit-circle"
			>
				{m.updateDefinition()}
			</Button>
			<Button
				btn="button-red"
				emoji="close-circle"
				type="button"
				onclick={() => {
					edit = false;
				}}
			>
				{m.cancel()}
			</Button>
		</div>
	</Form>
</Modal>
