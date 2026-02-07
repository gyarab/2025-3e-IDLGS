<script lang="ts">
	import { MAX_MESSAGE_LENGTH } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import Modal from './Modal.svelte';
	import Textarea from './Textarea.svelte';

	let {
		showModal = $bindable(false),
		errorMessage = $bindable(''),
		successMessage = $bindable(''),
	}: {
		showModal: boolean;
		errorMessage: string;
		successMessage: string;
	} = $props();
</script>

<Modal
	bind:showModal
	cssClass="bg-neutral-500/70 backdrop-blur-xl border-neutral-500 border-2 h-fit"
>
	<Form
		cssClass="flex w-full grow flex-col gap-2"
		action="/components/navbar/actions/feedback/?/sendFeedback"
		success={async () => {
			showModal = false;
			successMessage = m.feedbackSentSuccessfully();
		}}
		failure={async () => {
			showModal = false;
			errorMessage = m.failedToSendFeedback();
		}}
	>
		<h2>{m.sendFeedback()}</h2>

		<p class="flex w-full flex-row gap-1">
			{m.noticedAnIssueOrDoYouHaveASuggestion()}
			{m.weWouldLoveToHearYourFeedback()}
		</p>

		<Textarea
			name="message"
			placeholder={m.enterYourMessageHere()}
			maxLength={MAX_MESSAGE_LENGTH}
		/>

		<Button
			emoji="send-plane"
			btn="button-primary"
			type="submit"
		>
			{m.sendFeedback()}
		</Button>
	</Form>
</Modal>
