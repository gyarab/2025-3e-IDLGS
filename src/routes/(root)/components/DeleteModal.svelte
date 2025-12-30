<script lang="ts">
	import Modal from "./Modal.svelte";

	let { children, showModal = $bindable(), cssClass = '' } = $props();
</script>

<!-- TODO -->
<Modal
	bind:showModal
	{cssClass}
>
	{@render children?.()}
</Modal>