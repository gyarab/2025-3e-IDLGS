<script lang="ts">
	//Different and separate from ItemList in creation modal

	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(root)/components/Button.svelte';
	import TextInput from '$src/routes/(root)/components/TextInput.svelte';
	import ItemB from './ItemB.svelte';

	let {
		name,
		placeholder,
		items = $bindable([]),
		selected = $bindable(-1),
		onAdd = (name: string) => {},
		onDelete = (index: number) => {},
	}: {
		name: string;
		placeholder: string;
		items: {
			name: string;
			uuid: string; //this UUID will be regenerated on the server side
		}[];
		selected: number; //uuid
		onAdd: (name: string) => void;
		onDelete: (index: number) => void;
	} = $props();

	let value = $state('');
	let editMode = $state(-1);
</script>

<div class="flex w-5/11 min-w-5/11 grow flex-col gap-2">
	<h3>{name}</h3>
	<div
		class="flex w-full grow flex-col gap-2 rounded-lg bg-neutral-700/40 p-2 shadow-xl"
	>
		{#key items}
			{#each items as item, i (i)}
				<ItemB
					{item}
					bind:selectedItem={selected}
					bind:items
					bind:editMode
					{i}
					bind:inputValue={value}
					{onDelete}
				/>
			{/each}
		{/key}
		<Button
			btn="button-transparent"
			cssClass="grow flex flex-col bg-transparent w-full text-white opacity-70 font-light"
			onclick={() => {
				selected = -1;
				editMode = -1;
			}}
		>
			{#if items.length === 0}
				{placeholder}
			{/if}
		</Button>
	</div>
	<div class="flex w-full flex-row gap-2">
		<TextInput
			placeholder={m.enterName()}
			cssClass="grow"
			bind:value
		/>
		<Button
			type="button"
			btn="button-white"
			emoji={editMode != -1 ? 'save-3' : 'add-circle'}
			onclick={() => {
				if (editMode != -1) {
					items[editMode].name = value;
				} else {
					onAdd(value);
				}
				items = [...items];
				editMode = -1;
				value = '';
			}}
			disabled={value.trim().length === 0}
		>
			{#if editMode != -1}
				{m.save()}
			{:else}
				{m.addNew()}
			{/if}
		</Button>
	</div>
</div>
