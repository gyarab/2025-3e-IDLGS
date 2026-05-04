<script lang="ts">
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
	import GRP from '$src/routes/(base)/exerciseRendering/GRP.svelte';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import Dialog from '$src/routes/(base)/components/Dialog.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import SelectionButton from '$src/routes/(base)/components/SelectionButton.svelte';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';

	let {
		color,
		darkMode,
	}: {
		color: string;
		darkMode: boolean;
	} = $props();
</script>

<div>

</div>