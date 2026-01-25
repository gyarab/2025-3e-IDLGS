<script lang="ts">
	import Modal from '$component/Modal.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { MessageType } from '$lib/types';
	import Button from '$src/routes/(root)/components/Button.svelte';
	import Form from '$src/routes/(root)/components/Form.svelte';
	import Message from './Message.svelte';

	let {
		messages,
	}: {
		messages: MessageType[];
	} = $props();

	let showMessage: boolean = $derived(messages.length > 0);
	let selectedMessageIndex: number = $state(0);
</script>

<Modal
	bind:showModal={showMessage}
	cssClass="standardModal"
	cannotClickOutside={true}
>
	<Message message={messages[selectedMessageIndex]} />
	<div class="flex w-full flex-row items-center gap-2">
		<Button
			emoji="arrow-left-s"
			btn="button-primary"
			disabled={selectedMessageIndex == 0}
			onclick={() => {
				selectedMessageIndex -= 1;
			}}
		>
			{m.previousMessage()}
		</Button>
		<div class="flex grow flex-col items-center justify-center">
			{m.message()}
			{selectedMessageIndex + 1}
			{m.outOf()}
			{messages.length}
		</div>
		{#if selectedMessageIndex < messages.length - 1}
			<Button
				emoji="arrow-right-s"
				btn="button-primary"
				onclick={() => {
					selectedMessageIndex += 1;
				}}
			>
				{m.nextMessage()}
			</Button>
		{:else}
			<Form
				action="/components/?/markMessagesAsRead"
				cssClass="flex flex-col justify-center items-center"
				success={async () => {
					showMessage = false;
				}}
				failure={async () => {
					alert('ERROR');
				}}
			>
				<Button
					type="submit"
					emoji="check"
					btn="button-primary"
				>
					{m.markAsRead()}
				</Button>
			</Form>
		{/if}
	</div>
</Modal>
