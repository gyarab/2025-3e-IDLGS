<script lang="ts">
	import Dialog from './Dialog.svelte';
	import { m } from '$lib/paraglide/messages';
	import ConfirmCancel from './ConfirmCancel.svelte';

	let {
		open = $bindable(false),
		title = m.areYouSure(),
		darkMode,
		color,
		confirm,
		cancel,
	}: {
		open: boolean;
		title?: string;
		color: string;
		darkMode: boolean;
		confirm: () => Promise<void>;
		cancel: () => Promise<void>;
	} = $props();
</script>

<Dialog
	bind:open
	darkMode={darkMode}
	css="min-h-0! min-w-1/4!"
>
	<div class="flex w-full grow flex-col gap-2">
		<h2 class="text-2xl font-bold">{title}</h2>
		<p>{m.thisActionCannotBeUndone()}!</p>
		<div class="h-1"></div>
		<ConfirmCancel
			dangerous={true}
			color={color}
			bind:open
			confirm={async () => {
				await confirm();
				open = false;
			}}
			cancel={async () => {
				await cancel();
				open = false;
			}}
		/>
	</div>
</Dialog>
