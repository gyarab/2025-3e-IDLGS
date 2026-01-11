<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(root)/components/Button.svelte';
	import DeleteModal from '$src/routes/(root)/components/DeleteModal.svelte';
	import Form from '$src/routes/(root)/components/Form.svelte';

	let showModal = $state(false);
</script>

<Form 
	action="?/resetStreak"
	cssClass="flex w-full flex-row items-center gap-2"
>
	<span class="text-lg">
		{m.resetStreak()}
	</span>
	<span class="text-sm opacity-70">
		{m.resettingYourStreakIsAnIrreversibleAction()}
	</span>
	<div class="grow"></div>
	<Button
		emoji="device-recover"
		btn="button-red"
		onclick={() => {
			showModal = true;
		}}
	>
		{m.reset()}
	</Button>
	<DeleteModal 
		bind:showModal
		text={m.resettingYourStreakIsAnIrreversibleAction()+' '+m.areYouSure()}
	/>
</Form>