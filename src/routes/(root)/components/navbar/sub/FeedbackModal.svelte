<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Modal from '../../Modal.svelte';

	let {
		showModal = $bindable(false),
	}: {
		showModal: boolean;
	} = $props();
</script>

<Modal bind:showModal>
	<div class="flex w-full grow flex-col gap-2">
		<h2>{m.sendFeedback()}</h2>
	</div>
</Modal>
