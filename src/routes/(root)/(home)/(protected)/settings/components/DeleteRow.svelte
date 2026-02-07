<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$component/Button.svelte';
	import DeleteModal from '$component/DeleteModal.svelte';
	import Form from '$component/Form.svelte';

	let showModal = $state(false);

	let {
		formMessage = $bindable(''),
	}: {
		formMessage: string;
	} = $props();
</script>

<Form
	action="?/deleteAccount"
	cssClass="flex w-full flex-row items-center gap-2"
	success={async () => {
		formMessage = m.settingsUpdated();
	}}
>
	<span class="text-lg">
		{m.deleteAccount()}
	</span>
	<span class="text-sm opacity-80">
		{m.deletingYourAccountIsAnIrreversibleAction()}
	</span>
	<div class="grow"></div>
	<Button
		emoji="delete-bin"
		btn="button-red"
		onclick={() => {
			showModal = true;
		}}
	>
		{m.delete()}
	</Button>
	<DeleteModal
		bind:showModal
		text={m.deletingYourAccountIsAnIrreversibleAction() +
			' ' +
			m.areYouSure()}
	/>
</Form>
