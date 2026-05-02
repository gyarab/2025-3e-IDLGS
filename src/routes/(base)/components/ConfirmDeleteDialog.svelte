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
	css="min-h-0! min-w-1/4!"
>
	<div class="flex w-full grow flex-col gap-2">
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
