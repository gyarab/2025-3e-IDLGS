<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { UserType } from '$lib/types';
	import AlertBox from '../AlertBox.svelte';
	import Button from '../Button.svelte';
	import FeedbackModal from '../FeedbackModal.svelte';
	import SuccessBox from '../SuccessBox.svelte';

	let showFeedbackModal = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	let {
		user,
	}: {
		user: UserType | undefined;
	} = $props();
</script>

<div
	class="flex min-h-[20vh] flex-col items-center bg-black p-5 max-xl:hidden print:hidden"
>
	<div
		class="grid w-8/10 grid-cols-2 gap-10 *:flex *:h-full *:grow *:flex-col *:gap-0"
	>
		<div>
			<div class="flex w-full flex-row items-end gap-2">
				<h2>{m.textbookNameShort()}</h2>
				<p>
					{m.textbookNameLong()}
				</p>
			</div>
			<div>
				©
				<a href="mailto:martin.bykov.s@gyarab.cz">Martin Bykov</a>,
				2025-{new Date().getFullYear()}
			</div>
			<div>
				{m.allRightsReserved()}
			</div>
		</div>
		<div>
			<a href="/privacy">
				<i class="ri-file-list-line"></i>
				{m.privacyPolicy()}
			</a>

			<a href="/tos">
				<i class="ri-file-list-fill"></i>
				{m.termsOfService()}
			</a>

			<a href="/help">
				<i class="ri-questionnaire-line"></i>
				{m.helpAndDocumentation()}
			</a>

			{#if user}
				<Button
					btn="button-transparent justify-start! p-0!"
					emoji="feedback"
					onclick={() => {
						showFeedbackModal = true;
					}}
				>
					{m.sendFeedback()}
				</Button>
			{/if}
		</div>
	</div>
</div>

<SuccessBox bind:message={successMessage} />
<AlertBox bind:message={errorMessage} />

{#if user}
	<FeedbackModal
		bind:showModal={showFeedbackModal}
		bind:errorMessage
		bind:successMessage
	/>
{/if}
