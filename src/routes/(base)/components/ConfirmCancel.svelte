<script lang="ts">
	import Button from './Button.svelte';
	import { m } from '$lib/paraglide/messages';
	import { darkenHex } from '$lib';

	let {
		dangerous,
		color,
		open = $bindable(false),
		confirm,
		cancel,
		disabled,
	}: {
		dangerous?: boolean;
		color: string;
		open: boolean;
		confirm: () => Promise<void>;
		cancel: () => Promise<void>;
		disabled?: boolean;
	} = $props();

	let bgOk = $derived(dangerous ? "bg-red-500/80" : darkenHex(color, 20));
	let bgCancel = $derived(dangerous ? "bg-green-600/80" : darkenHex(color, 50));
</script>

<div class="flex w-full flex-row gap-1">
	<Button
		emoji="check"
		onclick={async () => {
			open = false;
			await confirm();
		}}
		text={m.confirm()}
		type="button"
		css="buttonPrimary grow {bgOk}"
		{disabled}
	/>
	<Button
		emoji="close"
		onclick={async () => {
			open = false;
			await cancel();
		}}
		text={m.cancel()}
		type="button"
		css="buttonPrimary grow {bgCancel}"
	/>
</div>
