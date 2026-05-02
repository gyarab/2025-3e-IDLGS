<script lang="ts">
	import { darkenHex } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(base)/components/Button.svelte';
	import TextArea from '$src/routes/(base)/components/TextArea.svelte';
	import TextInput from '$src/routes/(base)/components/TextInput.svelte';
	import { fly } from 'svelte/transition';

	let {
		darkMode,
		color,
	}: {
		darkMode: boolean;
		color: string;
	} = $props();
</script>

<div class="flex w-full grow flex-col gap-2">
	<div
		class="mb-2 flex w-full flex-row items-center gap-2"
		in:fly={{ x: 1000, y: 0, duration: 300, delay: 100, opacity: 0 }}
	>
		<h2 class="text-2xl font-bold">{m.textbookResources()}</h2>
		<p>{m.textbookResourcesDescription()}</p>
	</div>
	<div class="flex flex-col grow w-full gap-2">

	</div>
	<div class="flex flex-row w-full gap-2">
		<Button 
			text={m.addResource()}
			emoji="file-add"
			type="button"
			onclick={() => {}}
			css="buttonPrimary grow"
			style="background-color: {color};"
		/>
		<Button 
			text={m.editResource()}
			emoji="file-edit"
			type="button"
			onclick={() => {}}
			css="buttonPrimary grow"
			style="background-color: {darkenHex(color, 50)};"
		/>
		<Button 
			text={m.removeResource()}
			emoji="file-reduce"
			type="button"
			onclick={() => {}}
			css="buttonPrimary grow"
			style="background-color: {darkenHex(color, 80)};"
		/>
	</div>	
</div>
