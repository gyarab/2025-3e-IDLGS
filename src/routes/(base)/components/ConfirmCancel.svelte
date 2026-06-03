<script lang="ts">
	import Button from './Button.svelte';
	import { m } from '$lib/paraglide/messages';
	import { alphaColor, darkenHex, sanitizeColor } from '$lib';

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

	let bgYes = $derived(dangerous ? 'bg-red-500/70' : alphaColor(color, 60));
	let bgNo = $derived(dangerous ? 'bg-green-700/70' : alphaColor(color, 50));
</script>

<div class="flex w-full flex-row gap-4">
	<Button
		emoji="check"
		onclick={async () => {
			open = false;
			await confirm();
		}}
		text={m.confirm()}
		type="button"
		css="buttonPrimary grow {bgYes}"
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
		css="buttonPrimary grow {bgNo}"
	/>
</div>
