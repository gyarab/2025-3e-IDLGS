<script lang="ts">
	import Button from './Button.svelte';
	import { m } from '$lib/paraglide/messages';
	import { darkenHex } from '$lib';

	let {
		darkMode,
		color,
		open = $bindable(false),
		confirm,
		cancel,
	}: {
		darkMode: boolean;
		color: string;
		open: boolean;
		confirm: () => Promise<void>;
		cancel: () => Promise<void>;
	} = $props();
</script>

<div class="flex w-full flex-row gap-1">
	<Button
		emoji="check"
		style="background-color: {color};"
		onclick={async () => {
			open = false;
			await confirm();
		}}
		text={m.confirm()}
		type="button"
		css="buttonPrimary grow"
	/>
	<Button
		emoji="close"
		style="background-color: {darkenHex(color, 50)};"
		onclick={async () => {
			open = false;
			await cancel();
		}}
		text={m.cancel()}
		type="button"
		css="buttonPrimary grow"
	/>
</div>
