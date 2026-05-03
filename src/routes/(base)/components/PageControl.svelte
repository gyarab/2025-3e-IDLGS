<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import SelectionButton from '$src/routes/(base)/components/SelectionButton.svelte';
	import { darkenHex } from '$lib';

	let {
		color,
		darkMode,
		stage = $bindable(),
		disableNext,
		disablePrev,
		nextButtonCreate,
		createText,
	}: {
		color: string;
		darkMode: boolean;
		stage: number;
		disableNext: boolean;
		disablePrev: boolean;
		nextButtonCreate: boolean;
		createText: string;
	} = $props();
</script>

<div class="flex w-full flex-row">
	<div class="grow"></div>

	<SelectionButton
		orientation="land"
		style="background-color: {darkenHex(color, 20)};"
		texts={[m.back(), nextButtonCreate ? createText : m.next()]}
		disabled={[stage == 0 || disablePrev, disableNext]}
		actions={[() => stage--, () => stage++]}
		emojis={[
			'arrow-left-double',
			nextButtonCreate ? 'check-double' : 'arrow-right-double',
		]}
		types={nextButtonCreate ? ['button', 'submit'] : ['button', 'button']}
	/>
</div>
