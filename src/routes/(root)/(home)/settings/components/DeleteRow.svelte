<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(root)/components/Button.svelte';
	import DeleteModal from '$src/routes/(root)/components/DeleteModal.svelte';
	import Form from '$src/routes/(root)/components/Form.svelte';

	let showModal = $state(false);
</script>

<Form 
	action="?/deleteAccount"
	cssClass="flex w-full flex-row items-center gap-2"
>
	<span class="text-lg">
		{m.deleteAccount()}
	</span>
	<span class="text-sm opacity-70">
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
		text={m.deletingYourAccountIsAnIrreversibleAction()+' '+m.areYouSure()}
	/>
</Form>