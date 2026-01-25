<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Button from '$src/routes/(root)/components/Button.svelte';

	let {
		item,
		selectedItem = $bindable(-1),
		items = $bindable([]),
		editMode = $bindable(-1),
		i,
		inputValue = $bindable(''),
		onDelete = (index: number) => {},
	}: {
		item: {
			name: string;
			uuid?: string;
		};
		selectedItem: number;
		items: {
			name: string;
			uuid?: string;
		}[];
		editMode: number;
		i: number;
		inputValue: string;
		onDelete?: (index: number) => void;
	} = $props();
</script>

<div
	class="
	flex w-full flex-row items-center gap-2 rounded-lg text-base
	{selectedItem == i
		? 'bg-white text-violet-800'
		: '*:text-violet-800 *:not-hover:text-white *:hover:bg-white'}
	"
>
	<Button
		cssClass="text-lg grow justify-start"
		btn="button-transparent"
		onclick={() => {
			selectedItem = i;
		}}
	>
		{item.name}
	</Button>
	<Button
		btn="button-transparent"
		emoji="edit"
		cssClass=""
		onclick={() => {
			editMode = i;
			inputValue = item.name;
		}}
	>
		{m.edit()}
	</Button>
	<Button
		btn="button-transparent"
		emoji="delete-bin"
		cssClass=""
		onclick={() => {
			onDelete(i);
			if (selectedItem == i) {
				selectedItem = -1;
			}
			editMode = -1;
			inputValue = '';
			items = [...items];
		}}
	>
		{m.delete()}
	</Button>
</div>
