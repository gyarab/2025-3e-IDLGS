<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import SelectionButton from '$src/routes/(base)/components/SelectionButton.svelte';

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

<div class="flex w-full flex-row gap-2">
	<div class="grow"></div>

	<SelectionButton
		style="background-color: {color};"
		texts={[m.goBack(), nextButtonCreate ? createText : m.goForward()]}
		disabled={[stage == 0 || disablePrev, disableNext]}
		actions={[() => stage--, () => stage++]}
		emojis={[
			'arrow-left-double',
			nextButtonCreate ? 'check-double' : 'arrow-right-double',
		]}
		types={nextButtonCreate ? ['submit', 'button'] : ['button', 'button']}
	/>
</div>
