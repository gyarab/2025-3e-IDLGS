<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import SelectionButton from '$src/routes/(base)/components/SelectionButton.svelte';

	let {
		color,
		darkMode,
		stage = $bindable(),
		disableNext,
		disablePrev,
	}: {
		color: string;
		darkMode: boolean;
		stage: number;
		disableNext: boolean;
		disablePrev: boolean;
	} = $props();
</script>

<div class="flex w-full flex-row gap-2">
	<div class="grow"></div>

	<SelectionButton
		style="background-color: {color};"
		texts={[m.goBack(), m.goForward()]}
		disabled={[stage == 0 || disablePrev, disableNext]}
		actions={[() => stage--, () => stage++]}
		emojis={['arrow-left-double', 'arrow-right-double']}
	/>
</div>
