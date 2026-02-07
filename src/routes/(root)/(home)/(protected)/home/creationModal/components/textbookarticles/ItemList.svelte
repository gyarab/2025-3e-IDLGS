<script lang="ts">
	import Button from '$component/Button.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { Snippet } from 'svelte';

	let {
		items = $bindable([]),
		selectedItem = $bindable(''),
		additionalPush = () => {},
		additionalDelete = () => {},
		children,
	}: {
		items: string[];
		selectedItem: string;
		children: Snippet;
		additionalPush?: () => void;
		additionalDelete?: () => void;
	} = $props();

	let inputValue: string = $state('');
	let editMode: number = $state(-1);
</script>

<div class="flex min-w-0 grow flex-col">
	<div
		class="flex w-full grow flex-col gap-2 rounded bg-neutral-700/40 p-2 shadow-xl"
	>
		<div class="flex w-full grow flex-col gap-2 overflow-scroll">
			{#key items}
				{#if items.length > 0}
					{#each items as item, i (item)}
						<div
							class="
					flex w-full
					flex-row items-center gap-0 rounded
					{item == selectedItem ? 'bg-white' : '*:not-hover:text-white *:hover:bg-white'}
				"
						>
							<Button
								cssClass="text-lg grow justify-start"
								btn="button-transparent"
								onclick={() => {
									selectedItem = item;
								}}
							>
								{item}
							</Button>
							<Button
								btn="button-transparent"
								emoji="edit"
								cssClass=""
								onclick={() => {
									editMode = i;
									inputValue = items[editMode];
								}}
							>
								{m.edit()}
							</Button>
							<Button
								btn="button-transparent"
								emoji="delete-bin"
								cssClass=""
								onclick={() => {
									items.splice(i, 1);
									if (selectedItem == item) {
										selectedItem = '';
									}
									editMode = -1;
									inputValue = '';
									additionalDelete();
								}}
							>
								{m.delete()}
							</Button>
						</div>
					{/each}
				{/if}
			{/key}
			<Button
				btn="button-transparent"
				cssClass="grow flex flex-col bg-transparent w-full text-white opacity-80 font-light"
				onclick={() => {
					selectedItem = '';
					editMode = -1;
				}}
			>
				{#if items.length === 0}
					{@render children()}
				{/if}
			</Button>
		</div>
		<div class="flex w-full flex-row gap-2 p-2">
			<input
				type="text"
				name="editvalue"
				bind:value={inputValue}
				class="input-text grow"
				placeholder={m.enterName()}
			/>
			<Button
				emoji={editMode != -1 ? 'save-3' : 'add-circle'}
				onclick={() => {
					if (editMode == -1) {
						items.push(inputValue);
						additionalPush();
					} else {
						items[editMode] = inputValue;
						editMode = -1;
					}
					inputValue = '';
				}}
				btn="button-transparent"
				cssClass="flex flex-row gap-1 flex-nowrap min-w-fit bg-white"
				disabled={(editMode == -1 && inputValue.length === 0) ||
					(editMode != -1 && items[editMode].length === 0)}
			>
				{#if editMode != -1}
					{m.save()}
				{:else}
					{m.addNew()}
				{/if}
			</Button>
		</div>
	</div>
</div>
