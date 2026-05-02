<script lang="ts">
	import Button from "./Button.svelte";
	import { m } from "$lib/paraglide/messages";

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

<div class="flex flex-row w-full gap-1">
			<Button
				emoji='check'
				style="background-color: {color};"
				onclick={async () => {
					open = false;
					await confirm();
				}}
				text={m.confirm()}
				type="button"
			/>
			<Button
				emoji='close'
				style="background-color: {color};"
				onclick={async () => {
					open = false;
					await cancel();
				}}
				text={m.cancel()}
				type="button"
			 />
		</div>