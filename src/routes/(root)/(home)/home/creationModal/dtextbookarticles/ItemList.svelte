<script lang="ts">
	import Button from '$component/Button.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { Snippet } from 'svelte';

	let {
		items = $bindable([]),
		selectedItem = $bindable(''),
		onclick,
		children,
	}: {
		items: string[];
		selectedItem: string;
		onclick: () => void;
		children: Snippet;
	} = $props();

	let inputValue: string = $state('');
</script>

<div class="flex min-w-0 grow flex-col">
	<div
		class="flex w-full grow flex-col gap-2 rounded-lg bg-neutral-700/40 p-2"
	>
		{#key items}
			{#if items.length > 0}
				{#each items as item, i (item)}
					<div
						class="
					flex w-full
					flex-row items-center gap-2 rounded-lg
					{item == selectedItem ? 'bg-white' : '*:not-hover:text-white *:hover:bg-white'}
				"
					>
						<Button
							cssClass="ps-2 text-lg grow justify-start"
							btn="button-transparent"
							onclick={() => {
								selectedItem = item;
							}}
						>
							{item}
						</Button>
						<Button
							btn="button-transparent"
							emoji="delete-bin"
							cssClass=""
							onclick={() => {
								items.splice(i, 1);
							}}
						>
							{m.delete()}
						</Button>
					</div>
				{/each}
				<div class="grow"></div>
			{:else}
				<div
					class="flex w-full grow flex-col items-center justify-center text-white! opacity-50"
				>
					{@render children()}
				</div>
			{/if}
		{/key}
		<div class="flex w-full flex-row gap-2 p-2">
			<input
				type="text"
				bind:value={inputValue}
				class="input-text"
				placeholder={m.enterName()}
			/>
			<Button
				emoji={'add-circle'}
				onclick={() => {
					items.push(inputValue);
					inputValue = '';
					onclick();
				}}
				btn="button-transparent"
				cssClass="flex flex-row gap-1 flex-nowrap min-w-fit bg-white"
				disabled={inputValue.length === 0}
			>
				{m.addNew()}
			</Button>
		</div>
	</div>
</div>
