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
	action="/settings?/resetStreak"
	cssClass="flex w-full flex-row items-center gap-2"
	success={async () => {
		formMessage = m.streakHasBeenReset();
	}}
>
	<span class="text-lg">
		{m.resetStreak()}
	</span>
	<span class="text-sm opacity-80">
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
		text={m.resettingYourStreakIsAnIrreversibleAction() +
			' ' +
			m.areYouSure()}
	/>
</Form>
