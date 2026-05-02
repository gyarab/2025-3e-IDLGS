<script lang="ts">
	import Dialog from './Dialog.svelte';
	import { m } from '$lib/paraglide/messages';
	import Button from './Button.svelte';
	import ConfirmCancel from './ConfirmCancel.svelte';

	let {
		darkMode,
		open = $bindable(false),
		color,
		confirm,
		cancel,
	}: {
		darkMode: boolean;
		open: boolean;
		color: string;
		confirm: () => Promise<void>;
		cancel: () => Promise<void>;
	} = $props();
</script>

<Dialog
	bind:open
	{darkMode}
>
	<div class="flex flex-col w-full gap-2 grow">
		<h2 class="text-2xl font-bold">{m.areYouSure()}</h2>
		<p>{m.thisActionCannotBeUndone()}!</p>
		<ConfirmCancel 
			{darkMode}
			{color}
			bind:open	
			{confirm}
			{cancel}
		/>
	</div>
</Dialog>