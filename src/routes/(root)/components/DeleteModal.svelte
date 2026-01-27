<script lang="ts">
	//add this INSIDE of form!

	import { m } from '$lib/paraglide/messages';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';

	let { text, showModal = $bindable(), cssClass = '' } = $props();
</script>

<Modal
	bind:showModal
	cssClass="{cssClass} standardModal"
	maxHeight={false}
	maxWidth={false}
>
	<div class="flex w-full grow flex-col gap-2">
		<h2>{m.areYouSure()}</h2>
		<p class="w-full">{text}</p>
		<div class="grid w-full grid-cols-2 gap-4">
			<Button
				emoji="check"
				btn="button-primary"
				type="submit"
				onclick={() => {
					showModal = false;
				}}
			>
				{m.delete()}
			</Button>
			<Button
				emoji="close-circle"
				btn="button-violet"
				type="button"
				onclick={() => {
					showModal = false;
				}}
			>
				{m.cancel()}
			</Button>
		</div>
	</div>
</Modal>
