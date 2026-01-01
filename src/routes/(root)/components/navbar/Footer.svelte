<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '../Button.svelte';
	import FeedbackModal from './sub/FeedbackModal.svelte';

	let showFeedbackModal = $state(false);
</script>

<div
	class="flex min-h-[20vh] flex-col items-center bg-black p-5 max-xl:hidden print:hidden"
>
	<div
		class="grid w-8/10 grid-cols-2 gap-10 *:flex *:h-full *:grow *:flex-col *:gap-2"
	>
		<div>
			<div class="flex w-full flex-row items-end gap-2">
				<h2>{m.textbookNameShort()}</h2>
				<p>
					{m.textbookNameLong()}
				</p>
			</div>
			<div>
				© Martin Bykov, Kira Stepanova, 2025-{new Date().getFullYear()}
			</div>
			<div>
				{m.allRightsReserved()}
			</div>
		</div>
		<div>
			<Button
				btn="button-transparent"
				emoji="feedback"
				onclick={() => {
					showFeedbackModal = true;
				}}
			>
				{m.sendFeedback()}
			</Button>
		</div>
	</div>
</div>

<FeedbackModal bind:showModal={showFeedbackModal} />
